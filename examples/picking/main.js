import { loadDefaultStreamKey } from '../helpers.js';
import { ColorMaterial } from 'https://unpkg.com/@vertexvis/viewer@latest/dist/viewer/index.esm.js';

document.addEventListener('DOMContentLoaded', () => {
  main();
});

async function main() {
  const viewer = document.querySelector('vertex-viewer');
  await loadDefaultStreamKey(viewer);

  viewer.addEventListener('tap', async (event) => {
    const { position } = event.detail;
    const scene = await viewer.scene();
    const raycaster = await scene.raycaster();

    const result = await raycaster.hitItems(position);

    if (result.hits && result.hits.length == 0) {
      await scene
        .items((op) => op.where((q) => q.all()).clearMaterialOverrides())
        .execute();
    } else {
      await scene
        .items((op) => [
          op.where((q) => q.all()).clearMaterialOverrides(),
          op
            .where((q) => q.withItemId(result.hits[0].itemId.hex))
            .materialOverride(ColorMaterial.fromHex('#ff0000')),
        ])
        .execute();
    }
  });
}
