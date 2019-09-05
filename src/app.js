'use strict';

require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const logger = require('./utils/logger');
const cors = require('cors');
const helmet = require('helmet');
const router = require('./routing');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
app.use('/', router);
app.disable('x-powered-by');

const DEFAULT_PORT = 3000;
const port = parseInt(process.env.PORT, 10) || DEFAULT_PORT;

app.listen(port, () => {
  logger.info(`Server is listening on port ${port}`);
});

process.on('unhandledRejection', (err, promise) => {
  logger.error('Unhandled rejection (promise: ', promise, ', reason: ', err, ').');
});
