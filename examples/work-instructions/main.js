import { loadDefaultStreamKey } from '../helpers.js';
import steps from './steps.js';
import {
  applyWorkInstruction,
  initializeWorkInstructions,
} from './instructions.js';

document.addEventListener('DOMContentLoaded', () => {
  main();
});

async function main() {
  const viewer = document.querySelector('vertex-viewer');
  await loadDefaultStreamKey(viewer);
  await initializeWorkInstructions(viewer);

  let currentStep = 0;
  const previousButton = document.querySelector('#previous-step');
  const nextButton = document.querySelector('#next-step');

  previousButton.addEventListener('click', async () => {
    if (currentStep - 1 >= 0) {
      await applyInstruction(viewer, --currentStep);
    }
  });
  nextButton.addEventListener('click', async () => {
    if (currentStep + 1 < steps.length) {
      await applyInstruction(viewer, ++currentStep);
    }
  });
}

async function applyInstruction(viewer, step) {
  const currentLabel = document.querySelector('#current-step');

  await applyWorkInstruction(await viewer.scene(), step);

  currentLabel.innerHTML = `Viewing Step ${step}`;
}
