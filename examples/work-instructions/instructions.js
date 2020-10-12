import { ColorMaterial } from 'https://unpkg.com/@vertexvis/viewer@latest/dist/viewer/index.esm.js';
import steps from './steps.js';
import * as ViewerHelpers from './viewer-helpers.js';
import * as UIHelpers from './ui-helpers.js';
import { streamKeyForScene } from './scene-data.js';

let currentStepIndex;
let currentSceneId;
let currentSceneId2;

export const nextStep = async () => {
  await setStep(Math.min(currentStepIndex + 1, steps.length - 1));
};

export const prevStep = async () => {
  await setStep(Math.max(0, currentStepIndex - 1));
};

export async function setStep(stepIndex) {
  // UIHelpers.setInstructions('...');

  const viewer1 = document.querySelector('#viewer');
  //const viewer2 = document.querySelector('#viewer2');
  // tear down previous step
  if (currentStepIndex !== undefined) {
    const prevStep = steps[currentStepIndex];
    if (prevStep.tapHandler !== undefined) {
      viewer1.removeEventListener('tap', prevStep.tapHandler);
    }
    // if (prevStep.tapHandler2 !== undefined) {
    //   viewer2.removeEventListener('tap', prevStep.tapHandler2);
    // }
  }
  const stepData = steps[stepIndex];
  if (currentStepIndex === stepIndex) {
    // reset camera
    ViewerHelpers.updateCamera(stepData.scene.camera);
  }
  currentStepIndex = stepIndex;

  // load step scenes
  const stepSceneId = stepData.scene.sceneId;
  let scene;
  if (stepSceneId !== undefined && currentSceneId !== stepSceneId) {
    const streamKey = stepData.scene.streamKey;
    await ViewerHelpers.loadScene(streamKey, viewer1);
    scene = await viewer1.scene();
    currentSceneId = stepSceneId;
  } else {
    // reset camera
    ViewerHelpers.updateCamera(stepData.scene.camera);
    scene = await viewer1.scene();
    // show all and clear overrides
    scene
      .items((op) => op.where((q) => q.all()).clearMaterialOverrides())
      .execute();
  }

  // apply step operations
  if (stepData.operationSets && stepData.operationSets.length) {
    try {
      await scene
        .items((op) =>
          stepData.operationSets.map((set) =>
            applyOps(
              op.where((q) => applyQuery(q, set.query)),
              set.operations
            )
          )
        )
        .execute();
    } catch (e) {
      return await setStep(stepIndex);
    }
  }

  // add tap handlers
  if (stepData.tapHandler) {
    viewer1.addEventListener('tap', stepData.tapHandler);
  }

  // set instructions
  UIHelpers.setInstructions(stepData.title, stepData.instructions);

  if (stepData.duration !== undefined && stepData.duration >= 0) {
    setTimeout(() => nextStep(), stepData.duration);
  }
}

function applyQuery(builder, query) {
  switch (query.type) {
    case 'all':
      return builder.all();
    case 'itemId':
      return query.values.reduce(
        (result, v) => result.withItemId(v).or(),
        builder
      );
    case 'suppliedId':
      return query.values.reduce(
        (result, v) => result.withSuppliedId(v).or(),
        builder
      );
    default:
      return builder;
  }
}

function applyOps(builder, operations) {
  return operations.reduce((result, op) => {
    switch (op.type) {
      case 'show':
        return result.show();
      case 'hide':
        return result.hide();
      case 'clearMaterialOverrides':
        return result.clearMaterialOverrides();
      case 'materialOverride':
        return result.materialOverride(ColorMaterial.fromHex(op.value));
      default:
        return result;
    }
  }, builder);
}
