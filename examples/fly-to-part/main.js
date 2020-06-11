import { configureViewer, loadDefaultModel } from '../helpers.js';

document.addEventListener('DOMContentLoaded', () => {
  main();
});

async function main() {
  const viewer = document.querySelector('vertex-viewer');

  viewer.config = {
    network: {
      renderingHost: 'wss://rendering.dev.vertexvis.io',
      apiHost: 'https://api.dev.vertexvis.io',
    },
  };

  await configureViewer(viewer);
  await loadDefaultModel(viewer);

  viewer.addEventListener('tap', async (event) => {
    const { position } = event.detail;
    const scene = await viewer.scene();
    const raycaster = await scene.raycaster();
    const boundingBoxFetcher = await scene.boundingBoxFetcher();

    const { bomItems } = await raycaster.intersectItems(position).execute();

    console.log(position);
    if (bomItems.length == 0) {
      scene.clearAllHighlights().execute();
    } else {
      const [item] = bomItems;

      const bb = await boundingBoxFetcher.getBoundingBoxForPart(item.pathId);

      await scene.camera().fitTo(bb).execute();
    }
  });
}
