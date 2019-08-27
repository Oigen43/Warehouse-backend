'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

app.get('/ ', function(req, res) {
  res.send('Hello World');
});

app.listen(3000, () => {
  console.info('Server is listening on port 3000');
});
