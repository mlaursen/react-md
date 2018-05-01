import http from "http";
import path from "path";
import express from "express";
import helmet from "helmet";
import hpp from "hpp";
import morgan from "morgan";
import winston from "winston";

import renderHtml from "./renderHtml";

const isDev = process.env.NODE_ENV !== "production";

function log(name: string, defaultValue: string, required = true) {
  const message = `The \`${name}\` environment variable has not been set. This can be done by copying `
    + `the \`.env.example\` to \`.env\` in the docs root directory and updating the \`${name}\` or set an `
    + "environment variable on your machine.";

  if (isDev || !required) {
    winston.info(`Defaulting \`${name}\` to \`${defaultValue}\` for dev mode.`);
    winston.info(`It is recommended to copy the \`.env.example\` file to \`.env\` and set the \`${name}\` there.`);
  } else {
    throw new Error(message);
  }
}

let serverPort: number = parseInt(process.env.NODE_PORT || "", 10);
if (!serverPort) {
  log("NODE_PORT", "8080");
  serverPort = 8080;
}

const CACHE_DURATION = 7 * 24 * 60 * 60 * 1000; // days * hours * minutes * seconds * milliseconds
const app = express();

app.use(helmet());
app.use(hpp());
app.use(morgan("combined"));

app.use(express.static(path.resolve(process.cwd(), "public"), {
  maxAge: CACHE_DURATION,
}));

if (isDev) {
  const args = [{ hotServer: true, onServer: true }, { mode: "development" }];
  const webpack = require("webpack");
  const webpackDevMiddleware = require("webpack-dev-middleware");
  const webpackHotMiddleware = require("webpack-hot-middleware");
  const config = require("../../configs/webpack/config").default(...args);
  const compiler = webpack(config);
  app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
    logLevel: "warn",
    serverSideRender: true,
  }));
  app.use(webpackHotMiddleware(compiler));
}

app.use(renderHtml);

const server = http.createServer(app);
server.listen(serverPort, "localhost", null, (e) => {
  if (e) {
    throw e;
  }

  const { address, port } = server.address();
  const url = `http://${address}:${port}`;
  winston.info(`Started documentation server at : \`${url}\``);
});
