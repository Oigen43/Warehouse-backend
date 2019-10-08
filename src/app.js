'use strict';

require('module-alias/register');
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const passport = require('passport');
require('./config/passport.js');
const logger = require('@utils/logger');

const router = require('@routing');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(helmet());
app.use(passport.initialize());

app.use('/', router);

const DEFAULT_PORT = 3000;
const port = parseInt(process.env.PORT, 10) || DEFAULT_PORT;

app.listen(port, () => {
  logger.info(`Server is listening on port ${port}`);
});

process.on('unhandledRejection', (err, promise) => {
  logger.error('Unhandled rejection (promise: ', promise, ', reason: ', err, ').');
});
