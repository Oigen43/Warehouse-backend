'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const logger = require('./utils/logger');

const app = express();
app.use(bodyParser.json());

app.get('/', function(req, res) {
  res.send('Hello World');
});

app.listen(3000, () => {
  logger.info('Server is listening on port 3000');
});

process.on('unhandledRejection', function(err, promise) {
  logger.error('Unhandled rejection (promise: ', promise, ', reason: ', err, ').');
});
