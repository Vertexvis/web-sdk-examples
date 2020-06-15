import { configureViewer, loadDefaultModel } from '../helpers.js';

document.addEventListener('DOMContentLoaded', () => {
  main();
});

async function main() {
  const viewer = document.querySelector('vertex-viewer');

  await configureViewer(viewer);
  await loadDefaultModel(viewer);

  viewer.addEventListener('tap', async (event) => {
    const { position } = event.detail;
    const scene = await viewer.scene();
    const raycaster = await scene.raycaster();
    const boundingBoxFetcher = await scene.boundingBoxFetcher();

    const { bomItems } = await raycaster.intersectItems(position).execute();

    if (bomItems.length == 0) {
      scene.clearAllHighlights().execute();
    } else {
      const [item] = bomItems;
      const bb = await boundingBoxFetcher.getBoundingBoxForPart(item.pathId);
      await scene.camera().fitTo(bb);

      await scene
        .camera()
        .flyToPart((selector) => selector.withItemId(item.id));
    }
  });
}
