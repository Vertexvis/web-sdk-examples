const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const tokenHandler = require('./handlers/token');

dotenv.config();

const port = process.env.PORT;
const oauth2Endpoint = process.env.VERTEX_OAUTH2_ENDPOINT;
const clientId = process.env.VERTEX_CLIENT_ID;
const clientSecret = process.env.VERTEX_CLIENT_SECRET;
const expiresInSeconds = 2 * 60 * 60; // Duration for how long a token is valid for. Set to 2 hours.

const app = express();
app.use(cors());

app.get(
  '/token',
  tokenHandler(oauth2Endpoint, clientId, clientSecret, expiresInSeconds)
);

app.listen(port, () => {
  console.log(`Example server listening at http://localhost:${port}`);
});
