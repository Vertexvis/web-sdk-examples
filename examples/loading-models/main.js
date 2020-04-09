import { configureViewer } from '../helpers.js';

document.addEventListener('DOMContentLoaded', () => {
  main();
});

async function main() {
  const viewer = document.querySelector('vertex-viewer');
  await configureViewer(viewer);

  // Different approaches for loading a model
  loadModelByFileId(viewer, 'vertex-file-id');
  loadModelByExternalFileId(viewer, 'external-file-id');
  loadModelBySceneStateId(viewer, 'scene-state-uuid');
}

/**
 * Loads a scene by a Vertex file ID. You can retrieve the file ID
 * from the Vertex app, by opening a file and copy/pasting the ID
 * from the URL, e.g. https://app.vertexvis.com/file/2c2410ee-6ab9-45ee-a80b-255f2e20160e
 */
async function loadModelByFileId(viewer, fileId) {
  const newScene = await viewer.newScene();
  newScene
    .from(`urn:vertexvis:eedc:file:${fileId}`)
    .execute()
    .then((scene) => viewer.load(scene));
}

/**
 * Loads a scene by an external ID. An external ID can be assigned by
 * you when uploading a file through our API. This is useful if you
 * prefer your app to manage the IDs of files to load in the viewer.
 */
async function loadModelByExternalFileId(viewer, externalId) {
  const newScene = await viewer.newScene();
  newScene
    .from(`urn:vertexvis:eedc:file?externalId=${externalId}`)
    .execute()
    .then((scene) => viewer.load(scene));
}

/**
 * Loads a model by scene state. This approach can be used to load
 * a snapshot. The easiest way at the moment to get a snapshot's
 * scene state ID is by using the browser's dev tools to inspect the
 * network response for the  `GET /model_snapshot_versions` API call.
 */
async function loadModelBySceneStateId(viewer, sceneStateId) {
  const newScene = await viewer.newScene();
  newScene
    .from(`urn:vertexvis:eedc:scenestate:${sceneStateId}`)
    .execute()
    .then((scene) => viewer.load(scene));
}
