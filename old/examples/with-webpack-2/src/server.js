/* eslint-env node */
const path = require('path');
const express = require('express');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');

const app = express();

const CACHE_DURATION = 7 * 24 * 60 * 60 * 1000; // days * hours * minutes * seconds * milliseconds

const clientRoot = path.resolve(process.cwd(), 'public');
const client = express.static(clientRoot, {
  maxAge: CACHE_DURATION,
});

app.use(helmet({
  noCache: false,
}));
app.use(compression());
app.use(morgan('dev'));
app.use(client);

const port = process.env.PORT || 3000;

app.listen(port, (error) => {
  if (error) {
    throw error;
  }

  console.log(`Server successfully started on port '${port}'`);
});
