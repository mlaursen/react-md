import * as webpack from "webpack";
import path from "path";
import CleanWebpackPlugin from "clean-webpack-plugin";
import StartServerPlugin from "start-server-webpack-plugin";
import webpackNodeExternals from "webpack-node-externals";

import { IPluginOptions, CustomConfig } from "./types";

export default function withServerUpdates(config: CustomConfig, options: IPluginOptions): CustomConfig {
  const { isServer, isDev, rootPath, srcPath } = options;
  if (!isServer) {
    return config;
  }

  config.name = "server";
  config.entry = "./src/server/index.ts";
  config.target = "node";
  config.externals = [webpackNodeExternals()];
  config.output = {
    path: path.join(rootPath,  "dist"),
    publicPath: "/",
    filename: "server.js",
  };

  if (isDev) {
    config.stats = "minimal";
  }

  const plugins = [
    new CleanWebpackPlugin(["dist"], {
      root: rootPath,
    }),
    isDev && new StartServerPlugin({
      name: "server.js",
      nodeArgs: [
        // load the .env config before running to load in additional config
        "-r", "dotenv/config",
      ],
    }),
  ].filter(Boolean);

  config.plugins.push(...plugins);
  return config;
}
