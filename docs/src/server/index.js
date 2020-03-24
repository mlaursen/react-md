import 'babel-polyfill';
import http from 'http';
import winston from 'winston';

import server from './server';

function log(name, defaultValue, required = true) {
  const message = `The \`${name}\` environment variable has not been set. This can be done by copying `
    + `the \`.env.example\` to \`.env\` in the docs root directory and updating the \`${name}\` or set an `
    + 'environment variable on your machine.';

  if (__DEV__ || !required) {
    winston.info(`Defaulting \`${name}\` to \`${defaultValue}\` for dev mode.`);
    winston.info(`It is recommended to copy the \`.env.example\` file to \`.env\` and set the \`${name}\` there.`);
  } else {
    throw new Error(message);
  }
}

let port = process.env.NODE_PORT;
if (!port) {
  log('NODE_PORT', '8080');
  port = 8080;
}

let rootPath = process.env.ROOT_PATH;
if (!rootPath) {
  log('ROOT_PATH', '/');
  rootPath = '/';
}

const httpServer = http.createServer(server);

let currentServer = server;
httpServer.listen(port, (e) => {
  if (e) {
    throw e;
  }

  const { port, address } = httpServer.address();
  let url = address;
  if (address === '::') {
    url = PUBLIC_URL;
    if (port !== 80 && !url.match(/:\d+/)) {
      url = `${url.replace(rootPath, '')}:${port}${rootPath}`;
    }
  }

  winston.info(`Started documentation server at: '${url}'`);
});

if (module.hot) {
  module.hot.accept('./server', () => {
    httpServer.removeListener('request', currentServer);
    httpServer.on('request', server);
    currentServer = server;
  });
}
