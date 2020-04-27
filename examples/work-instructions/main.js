import { configureViewer } from '../helpers.js';
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
  await configureViewer(viewer);
  await initializeWorkInstructions(viewer);

  let currentStep = 0;
  const previousButton = document.querySelector('#previous-step');
  const currentLabel = document.querySelector('#current-step');
  const nextButton = document.querySelector('#next-step');

  previousButton.addEventListener('click', async () => {
    if (currentStep - 1 >= 0) {
      const scene = await viewer.scene();
      await applyWorkInstruction(scene, --currentStep);
      currentLabel.innerHTML = `Viewing Step ${currentStep}`;
    }
  });
  nextButton.addEventListener('click', async () => {
    if (currentStep + 1 < steps.length) {
      const scene = await viewer.scene();
      await applyWorkInstruction(scene, ++currentStep);
      currentLabel.innerHTML = `Viewing Step ${currentStep}`;
    }
  });
}
