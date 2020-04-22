export async function configureViewer(viewer) {
  const token = await fetchToken();

  if (viewer != null) {
    setCredentials(viewer, token);
  } else {
    console.error(
      'Cannot configure viewer. HTML is probably missing a <vertex-viewer> component.'
    );
  }
}

export async function loadDefaultModel(viewer) {
  const urn = await fetchDefaultModel()
  const newScene = await viewer.newScene();
  await newScene.from(urn).execute().then(scene => viewer.load(scene))
}

async function fetchToken() {
  const resp = await fetch('http://localhost:3000/token');
  return await resp.json();
}

async function fetchDefaultModel() {
  const resp = await fetch('http://localhost:3000/model');
  const json = await resp.json();
  return json.urn;
}

function setCredentials(viewer, { clientId, token }) {
  viewer.credentialsClientId = clientId;
  viewer.credentialsToken = token;
}