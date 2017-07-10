/* eslint-disable global-require */
require('babel-core/register');
require('babel-polyfill');
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const hacker = require('require-hacker');
const winston = require('winston');

const RAW_LOADER = '!!raw-loader!./';
const RAW_COMPONENT_LOADER = '!!raw-loader!components';
const COMPONENTS = path.resolve(process.cwd(), 'src', 'components');

/**
 * Need access to the manual code-sourcing with the raw-loader when doing ssr. I don't
 * feel like having to compile and generate all the pure text files each time it starts,
 * so just use the require-hacker like webpack-isomorphic-tools does with the static file
 * assets.
 *
 * When using the raw-loader, you **must** specify the file extension as well to get it to work.
 */
hacker.global_hook('raw-loader', (path, module) => {
  if (path.indexOf(RAW_LOADER) === -1 && path.indexOf(RAW_COMPONENT_LOADER) === -1) {
    return undefined;
  }

  let filePath = '';
  if (path.match(RAW_COMPONENT_LOADER)) {
    filePath = path.replace(RAW_COMPONENT_LOADER, COMPONENTS);
  } else {
    const folder = module.filename.substring(0, module.filename.lastIndexOf('/'));
    filePath = `${folder}/${path.replace(RAW_LOADER, '')}`;
  }

  return {
    source: `module.exports = ${JSON.stringify(fs.readFileSync(filePath, 'UTF-8'))};`,
    path,
  };
});

const WebpackIsomorphicTools = require('webpack-isomorphic-tools');

global.__DEV__ = process.env.NODE_ENV === 'development';
global.__CLIENT__ = false;
global.__SSR__ = !global.__DEV__;
global.__SERVER_ONLY = false; // for debuggin/implementing api routes

const ROOT_DIR = require('path').resolve(process.cwd());

let timeout = setTimeout(() => {
  if (__DEV__) {
    winston.error('It looks like the `webpack-assets.json` file has not been created.');
    winston.info('Creating a dummy file to get the compliation started...');
    timeout = null;
    const dummyFile = {
      javascript: { main: '/assets/main.js' },
      styles: {},
      assets: {},
    };
    fs.writeFileSync(path.resolve(process.cwd(), 'webpack-assets.json'), JSON.stringify(dummyFile), 'UTF-8');
    winston.info('Created a dummy `webpack-assets.json`. Server should start normally now.');
    winston.info('You can ignore any "[webpack-isomorphic-tools]" errors that happen until the first real webpack build.');
  } else {
    winston.error('It looks like the `webpack-assets.json` file has not yet been created.');
    winston.error(
      'Either run `yarn build` to create the production bundle and start the server again or start the server in dev mode with `yarn dev`.'
    );
    process.exit(1);
  }
}, 5000);
global.webpackIsomorphicTools = new WebpackIsomorphicTools(require('./WIT.config'))
  .server(ROOT_DIR, () => {
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }
    require('./src/server');
  });
