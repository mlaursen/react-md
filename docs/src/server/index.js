import 'babel-polyfill';
import http from 'http';
import winston from 'winston';
import server from './server';

let port = process.env.NODE_PORT;
if (!port) {
  const message = 'The `NODE_PORT` environment variable has not been set. This can be done by copying '
    + 'the `.env.example` to `.env` in the docs root directory and updating the `NODE_PORT` or set an '
    + 'environment variable on your machine.';

  if (__DEV__) {
    winston.info('Defaulting `NODE_PORT` to `8080` for dev mode.');
    winston.info('It is recommended to copy the `.env.example` file to `.env` and set the `NODE_PORT` there.');
    port = 8080;
  } else {
    throw new Error(message);
  }
}

const httpServer = http.createServer(server);

let currentServer = server;
httpServer.listen(process.env.NODE_PORT, (e) => {
  if (e) {
    throw e;
  }

  const { port, address } = httpServer.address();
  let url = address;
  if (address === '::') {
    url = `http://localhost:${port}`;
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
