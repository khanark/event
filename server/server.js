const express = require('express');
const CORS = require('cors');

const APP = express();
const PORT = process.env.PORT || 3030;

const DB = require('./config/database');

initServer();

async function initServer() {
  APP.use(CORS());
  APP.use(express.json({ limit: '50mb' }));
  APP.use(require('cookie-parser')());

  await DB();
  require('./config/router')(APP);

  APP.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
}
