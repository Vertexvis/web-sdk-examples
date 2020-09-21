export async function loadDefaultModel(viewer) {
  const key = await fetchDefaultStreamKey();
  await viewer.load(`urn:vertexvis:stream-key:${key}`);
}

export async function fetchDefaultStreamKey() {
  const resp = await fetch('http://localhost:3000/stream-key');
  const json = await resp.json();
  return json.key;
}
