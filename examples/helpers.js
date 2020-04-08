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

async function fetchToken() {
  const resp = await fetch('http://localhost:3000/token');
  return await resp.json();
}

function setCredentials(viewer, { clientId, token }) {
  viewer.credentialsClientId = clientId;
  viewer.credentialsToken = token;
}
