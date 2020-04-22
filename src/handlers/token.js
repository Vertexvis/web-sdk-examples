const fetch = require('node-fetch');

class TokenError extends Error {
  constructor(json) {
    super();
    this.json = json;
  }
}

// Window duration before clearing the cached token. Set to 5 minutes.
const expiresWindowInMs = 5 * 1000 * 60;

let cachedToken = null;

function cacheToken(token, expiresAt) {
  console.log(`Caching token, expires at ${expiresAt}`);
  cachedToken = { token, expiresAt };
}

async function getCachedOrRetrieveToken(
  tokenEndpoint,
  clientId,
  clientSecret,
  expiresIn
) {
  if (cachedToken != null) {
    if (new Date() >= cachedToken.expiresAt) {
      console.log(`Clearing cached token, expired at ${cachedToken.expiresAt}`);
      cachedToken = null;
      const token = getCachedOrRetrieveToken(
        tokenEndpoint,
        clientId,
        clientSecret,
        expiresIn
      );
      return token;
    } else {
      console.log(
        `Using cached taken, will expire at ${cachedToken.expiresAt}`
      );
      return cachedToken.token;
    }
  } else {
    const resp = await fetchToken(
      tokenEndpoint,
      clientId,
      clientSecret,
      expiresIn
    );
    const json = await resp.json();

    if (resp.ok) {
      const expiresInMs = expiresIn * 1000;
      const token = json.access_token;
      const expiresAt = new Date(
        new Date().getTime() + expiresInMs - expiresWindowInMs
      );
      cacheToken(token, expiresAt);
      return token;
    } else {
      throw new TokenError(json);
    }
  }
}

async function fetchToken(tokenEndpoint, clientId, clientSecret, expiresIn) {
  const body = new URLSearchParams();
  body.append('grant_type', 'client_credentials');
  body.append('scope', 'filestore.* scenestates.* bom.*');
  body.append('client_id', clientId);
  body.append('client_secret', clientSecret);
  body.append('expires_in', expiresIn);

  const resp = await fetch(tokenEndpoint, {
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body,
  });

  return resp;
}

function tokenHandler(tokenEndpoint, clientId, clientSecret, expiresIn) {
  return async (_, res) => {
    try {
      const token = await getCachedOrRetrieveToken(
        tokenEndpoint,
        clientId,
        clientSecret,
        expiresIn
      );
      res.json({ clientId, token });
    } catch (e) {
      const details = e instanceof TokenError ? e.json : e;
      console.error('Error retrieving token:', details);
      res.sendStatus(500);
    }
  };
}

module.exports = tokenHandler;
