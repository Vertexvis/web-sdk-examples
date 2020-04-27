import { configureViewer, loadDefaultModel } from '../helpers.js';

class CustomInteractionHandler {
  dispose() {
    this.element.removeEventListener('dblclick', this.handleDoubleClick);
    this.element.removeEventListener('touchstart', this.handleTouchStart);
  }

  initialize(element, api) {
    this.api = api;
    this.element = element;
    this.element.addEventListener('dblclick', this.handleDoubleClick);
    this.element.addEventListener('touchstart', this.handleTouchStart);
  }

  handleTouchStart = async (event) => {
    if (event.touches.length === 1) {
      this.tapTimer =
        this.tapTimer == null
          ? setTimeout(() => {
              this.tapTimer = null;
            }, 500)
          : null;

      if (this.tapTimer == null) {
        const viewer = document.querySelector('vertex-viewer');
        const scene = await viewer.scene();

        scene.camera().viewAll().execute();
      }
    }
  };

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
