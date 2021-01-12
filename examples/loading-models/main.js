import { readDefaultStreamKey } from '../helpers.js';

document.addEventListener('DOMContentLoaded', () => {
  main();
});

async function main() {
  await window.customElements.whenDefined('vertex-viewer');
  const viewer = document.querySelector('vertex-viewer');
  const streamKey = readDefaultStreamKey();

  loadModelByStreamKey(viewer, streamKey);
}

/**
 * Loads a scene by a Vertex stream key. For more information
 * on generating a stream key, see https://developer.vertexvis.com/docs/guides/authentication#in-the-viewer-sdk
 */
async function loadModelByStreamKey(viewer, streamKey) {
  await viewer.load(`urn:vertexvis:stream-key:${streamKey}`);
}
