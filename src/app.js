'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const logger = require('./utils/logger');

require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.disable('x-powered-by');

const DEFAULT_PORT = 3000;
const port = parseInt(process.env.PORT, 10) || DEFAULT_PORT;

app.get('/', (req, res) => {
  res.send({message: 'Hello world!'});
});

app.listen(port, () => {
  logger.info(`Server is listening on port ${port}`);
});

process.on('unhandledRejection', (err, promise) => {
  logger.error('Unhandled rejection (promise: ', promise, ', reason: ', err, ').');
});
