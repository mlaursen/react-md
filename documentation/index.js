/* eslint-disable global-require */
require('babel-core/register');
require('babel-polyfill');
require('dotenv').config();

const WebpackIsomorphicTools = require('webpack-isomorphic-tools');

global.__DEV__ = process.env.NODE_ENV === 'development';
global.__CLIENT__ = false;
global.__SSR__ = !global.__DEV__;

const ROOT_DIR = require('path').resolve(process.cwd());

global.webpackIsomorphicTools = new WebpackIsomorphicTools(require('./WIT.config'))
  .server(ROOT_DIR, () => {
    require('./src/server');
  });
