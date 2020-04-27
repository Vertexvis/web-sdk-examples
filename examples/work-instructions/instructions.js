import { fetchDefaultModel } from '../helpers.js';
import steps from './steps.js';

export async function applyWorkInstruction(scene, stepNumber) {
  if (stepNumber >= 0 && stepNumber < steps.length) {
    const newScene = scene.hideAll().clearAllHighlights();
    const currentStep = steps[stepNumber];
    
    steps.slice(0, stepNumber).forEach((step) =>
      applyOperations(
        newScene,
        step.operations.filter((op) => op.type !== 'highlight'),
        step.queries
      )
    );
    applyOperations(newScene, currentStep.operations, currentStep.queries);

    return await newScene.execute();
  }
}

export async function applyCamera(scene, stepNumber) {
  if (stepNumber >= 0 && stepNumber < steps.length) {
    const newScene = scene.camera();
    const currentStep = steps[stepNumber];
    
    if (currentStep.camera != null) {
      newScene.set(currentStep.camera);
    }
    if (currentStep.viewAll) {
      newScene.viewAll();
    }

    return await newScene.execute();
  }
}

export async function initializeWorkInstructions(viewer) {
  const urn = await fetchDefaultModel();
  const scene = await viewer.newScene();
  const newScene = await applyWorkInstruction(scene.from(urn), 0);
  viewer.load(newScene);
}

export async function applyInitialCamera(viewer) {
  const scene = await viewer.scene();

  applyCamera(scene, 0);
}

function applyOperations(scene, operations, queries) {
  return operations.reduce((newScene, operation) => {
    switch (operation.type) {
      case 'show':
        return newScene.show((selector) => applyQueries(selector, queries));
      case 'highlight':
        return newScene.highlight(operation.value, (selector) =>
          applyQueries(selector, queries)
        );
      default:
        return newScene;
    }
  }, scene);
}

function applyQueries(baseSelector, queries) {
  return queries.reduce(
    (selector, query) =>
      query.type === 'metadata'
        ? selector.withMetadata(query.key, query.value).or()
        : selector.withItemId(query.value).or(),
    baseSelector
  );
}
