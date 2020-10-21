import { prevStep, nextStep, setStep } from './instructions.js';
import { hideOverlay } from '../viewer-helpers.js';

document.addEventListener('DOMContentLoaded', () => {
  main();
});

async function main() {
  const previousButton = document.querySelector('#previous-step');
  const nextButton = document.querySelector('#next-step');

  // initialize application state
  await setStep(0);

  previousButton.addEventListener('click', async () => {
    await prevStep();
  });
  nextButton.addEventListener('click', async () => {
    await nextStep();
  });

  const overlayContainer = document.getElementById('overlay-container');
  overlayContainer.addEventListener('click', () => {
    hideOverlay();
  });
}
