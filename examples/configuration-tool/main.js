import { configureViewer, loadDefaultModel } from '../helpers.js';
import { createCheckConfigurationOption } from './check.js';
import { createSelectConfigurationOption } from './select.js';

document.addEventListener('DOMContentLoaded', () => {
  main();
});

async function main() {
  const viewer = document.querySelector('vertex-viewer');
  await configureViewer(viewer);
  await loadDefaultModel(viewer, (scene) => scene.hideAll());

  document.querySelector('#toggle').addEventListener(
    'click',
    createCheckConfigurationOption(viewer, {
      type: 'metadata',
      key: 'MetadataKey',
      value: 'MetadataValue',
    })
  );

  document
    .querySelector('#stuff-select')
    .addEventListener(
      'change',
      createSelectConfigurationOption(viewer, 'MetadataKey')
    );

  document
    .querySelector('#other-stuff-select')
    .addEventListener(
      'change',
      createSelectConfigurationOption(viewer, 'MetadataKey')
    );
}
