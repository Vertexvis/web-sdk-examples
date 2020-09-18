document.addEventListener('DOMContentLoaded', () => {
  main();
});

async function main() {
  const viewer = document.querySelector('vertex-viewer');

  loadModelByStreamKey(viewer, '8z8SIkjYGrWOUUlizmUVT7x4s-hqMcegAXIK');
}

/**
 * Loads a scene by a Vertex stream key. For more information
 * on generating a stream key, see https://developer.vertexvis.com/docs/guides/authentication#in-the-viewer-sdk
 */
async function loadModelByStreamKey(viewer, streamKey) {
  await viewer.load(`urn:vertexvis:stream-key:${streamKey}`);
}
