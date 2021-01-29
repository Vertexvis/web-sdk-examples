# Vertex Web SDK Examples

This repository contains examples for interacting with the [Vertex Web SDK](https://www.npmjs.com/package/@vertexvis/viewer).

---

**_NOTE_**

For examples using the [@vertexvis/poc-viewer](https://www.npmjs.com/package/@vertexvis/poc-viewer) package, see the [poc-examples](https://github.com/Vertexvis/web-sdk-examples/tree/poc-examples) branch.

---

## Setup

Make sure you have [Yarn installed](https://classic.yarnpkg.com/en/docs/install).

- Run `yarn install` to install dependencies.
- Obtain a `clientid` and `streamkey` following [this guide](https://developer.vertexvis.com/docs/guides/authentication)

## Running

Run `yarn start` to spin up a local development environment. The development environment includes a server to host static assets from the `examples` directory, and a simple backend that demonstrates how the client retrieves a token from the Vertex platform.

After you run `yarn start`, open navigate your browser to <http://localhost:8080?clientid=YOUR_CLIENT_ID&streamkey=YOUR_STREAM_KEY> to browser the examples. The `stream-key` provided here will be the default used for examples making use of the `loadViewerWithQueryParams` helper function. The development environment supports live refresh. Any changes you make the examples will automatically refresh your browser.

**Note:** These examples make use of more modern EcmaScript features. You'll need a browser that supports ES modules. Most modern browsers (Chrome, Edge, Firefox, Safari) support these features.

## Contributions

We provide a script that you can run to create a new example. Run `yarn scaffold [name]` to create a new example.
