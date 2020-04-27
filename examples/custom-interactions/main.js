import { configureViewer, loadDefaultModel } from '../helpers.js';

class CustomInteractionHandler {
  dispose() {
    this.element.removeEventListener('dblclick', this.handleDoubleClick);
  }

  initialize(element, api) {
    this.api = api;
    this.element = element;
    this.element.addEventListener('dblclick', this.handleDoubleClick);
  }

  handleDoubleClick = async () => {
    const viewer = document.querySelector('vertex-viewer');
    const scene = await viewer.scene();

    scene.camera().viewAll().execute();
  };
}

document.addEventListener('DOMContentLoaded', () => {
  main();
});

async function main() {
  const viewer = document.querySelector('vertex-viewer');
  await configureViewer(viewer);
  await loadDefaultModel(viewer);

  viewer.registerInteractionHandler(new CustomInteractionHandler());
}

