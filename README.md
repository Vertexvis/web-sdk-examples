# Vertex Web SDK Examples

This repository contains examples for interacting with the Vertex Web SDK.

## Setup

Make sure you have [Yarn installed](https://classic.yarnpkg.com/en/docs/install).

- Run `yarn install` to install dependencies.
- Run `cp .env.template .env` to create an environment file.
- In `.env`, Update the `VERTEX_CLIENT_ID` and `VERTEX_CLIENT_SECRET`
  environment variables with your application credentials.

## Running

Run `yarn start` to spin up a local development environment. The development
environment includes a server to host static assets from the `examples`
directory, and a simple backend that demonstrates how the client retrieves a
token from the Vertex platform.

After you run `yarn start`, open navigate your browser to http://localhost:8080
to browser the examples. The development environment supports live refresh. Any
changes you make the examples will automatically refresh your browser.

**Note:** These examples make use of more modern EcmaScript features. You'll
need a browser that supports ES modules. Most modern browsers (Chrome, Edge,
Firefox, Safari) support these features.

## Contributions

We provide a script that you can run to create a new example. Run `yarn scaffold [name]` to create a new example.
