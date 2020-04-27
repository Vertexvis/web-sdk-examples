import { fetchDefaultModel } from '../helpers.js';
import steps from './steps.js';

export async function applyWorkInstruction(scene, stepNumber) {
  if (stepNumber >= 0 && stepNumber < steps.length) {
    const baseScene = scene.hideAll().clearAllHighlights();

    steps
      .slice(0, stepNumber + 1)
      .forEach((step, index) =>
        step.operations
          .filter(
            (operation) =>
              operation.type !== 'highlight' || index === stepNumber
          )
          .forEach((operation) =>
            applyOperation(baseScene, operation, step.queries)
          )
      );

    return await baseScene.execute();
  }
}

export async function initializeWorkInstructions(viewer) {
  const urn = await fetchDefaultModel();
  const scene = await viewer.newScene();
  const newScene = await applyWorkInstruction(scene.from(urn), 0);
  viewer.load(newScene);
}

function applyOperation(scene, operation, queries) {
  switch (operation.type) {
    case 'show':
      return scene.show((selector) => applyQueries(selector, queries));
    case 'highlight':
      return scene.highlight(operation.value, (selector) =>
        applyQueries(selector, queries)
      );
    default:
      return scene;
  }
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
