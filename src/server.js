const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const port = process.env.PORT;
const streamKey = process.env.DEFAULT_STREAM_KEY;

const app = express();
app.use(cors());

app.get('/stream-key', (_, res) => res.json({ key: streamKey }));

app.listen(port, () => {
  console.log(`Example server listening at http://localhost:${port}`);
});
