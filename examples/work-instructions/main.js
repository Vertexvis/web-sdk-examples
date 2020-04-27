import { configureViewer } from '../helpers.js';
import steps from './steps.js';
import {
  applyWorkInstruction,
  applyCamera,
  applyInitialCamera,
  initializeWorkInstructions,
} from './instructions.js';

document.addEventListener('DOMContentLoaded', () => {
  main();
});

async function main() {
  const viewer = document.querySelector('vertex-viewer');
  await configureViewer(viewer);
  await initializeWorkInstructions(viewer);

  let currentStep = 0;
  const previousButton = document.querySelector('#previous-step');
  const nextButton = document.querySelector('#next-step');

  previousButton.addEventListener('click', async () => {
    if (currentStep - 1 >= 0) {
      await applyInstructionAndCamera(--currentStep);
    }
  });
  nextButton.addEventListener('click', async () => {
    if (currentStep + 1 < steps.length) {
      await applyInstructionAndCamera(++currentStep);
    }
  });

  viewer.addEventListener('frameDrawn', applyCameraOnLoad);
}

async function applyCameraOnLoad() {
  const viewer = document.querySelector('vertex-viewer');

  await applyInitialCamera(viewer);

  viewer.removeEventListener('frameDrawn', applyCameraOnLoad);
}

async function applyInstructionAndCamera(step) {
  const currentLabel = document.querySelector('#current-step');

  await applyWorkInstruction((await viewer.scene()), step);
  await applyCamera((await viewer.scene()), step);

  currentLabel.innerHTML = `Viewing Step ${step}`;
}
