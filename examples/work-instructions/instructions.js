import { fetchDefaultModel } from '../helpers.js';
import steps from './steps.js';

/**
 * Applies the operations provided for a specific step number to the result
 * of the queries provided for that step number, as well as the previous steps
 * before it, filtering out any highlight operations to indicate the parts
 * specific to this step.
 *
 * @param {*} scene the scene created through the viewer (await viewer.scene()).
 * @param {*} stepNumber the step number for which the operations should be applied.
 */
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

/**
 * Applies the camera defined, as well as a fit all if either is present
 * in the provided step number.
 *
 * @param {*} scene the scene created through the viewer (await viewer.scene()).
 * @param {*} stepNumber the step number for which the camera should be applied.
 */
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

/**
 * Creates the initial scene from the first provided work instruction step.
 *
 * @param {*} viewer the viewer element to use to create the initial scene.
 */
export async function initializeWorkInstructions(viewer) {
  const urn = await fetchDefaultModel();
  const scene = await viewer.newScene();
  const newScene = await applyWorkInstruction(scene.from(urn), 0);
  viewer.load(newScene);
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
