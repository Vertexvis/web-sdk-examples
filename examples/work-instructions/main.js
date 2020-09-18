import { loadDefaultModel } from '../helpers.js';
import steps from './steps.js';
import {
  applyWorkInstruction,
  applyCamera,
  initializeWorkInstructions,
} from './instructions.js';

document.addEventListener('DOMContentLoaded', () => {
  main();
});

async function main() {
  const viewer = document.querySelector('vertex-viewer');
  await loadDefaultModel(viewer);
  await initializeWorkInstructions(viewer);

  let currentStep = 0;
  const previousButton = document.querySelector('#previous-step');
  const nextButton = document.querySelector('#next-step');

  previousButton.addEventListener('click', async () => {
    if (currentStep - 1 >= 0) {
      await applyInstructionAndCamera(viewer, --currentStep);
    }
  });
  nextButton.addEventListener('click', async () => {
    if (currentStep + 1 < steps.length) {
      await applyInstructionAndCamera(viewer, ++currentStep);
    }
  });
}

async function applyInstructionAndCamera(viewer, step) {
  const currentLabel = document.querySelector('#current-step');

  await applyWorkInstruction(await viewer.scene(), step);
 
  currentLabel.innerHTML = `Viewing Step ${step}`;
}
