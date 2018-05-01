import path from "path";
import * as webpack from "webpack";
import _ from "lodash";

import { IBaseConfig, CustomConfig, IEnv, IArgv, IPluginOptions } from "./types";

import withStyles from "./withStyles";
import withTypescript from "./withTypescript";
import withServerUpdates from "./withServerUpdates";
import withClientUpdates from "./withClientUpdates";

type WebpackConfigPlugin = (config: webpack.Configuration, options: IPluginOptions) => webpack.Configuration;

/**
 * "Plugin" might not be the best terminology, but these functions will update the config with additional
 * rules/configuration needed. After reading the docs for webpack v4, this _might_ be kind of how the webpack-merge
 * library works and I should probably change to it at some point or something, but meh.
 */
const plugins: WebpackConfigPlugin[] = [
  withTypescript,
  withStyles,
  withServerUpdates,
  withClientUpdates,
];

const ROOT = process.cwd();
const SOURCE = path.join(ROOT, "src");

/**
 * This will create the required webpack config for production, dev server, or dev client.
 *
 * When building for dev, this will return a single config file for the deployment type. In addition, you will
 * need to set some command line arguments to target the correct deployment. Examples:
 * ```sh
 * # Start dev mode with a hot reloading server
 * webpack --mode development --env.hotServer
 *
 * # Start dev mode with hot reloading client (requires server to be running)
 * webpack --mode development --env.hotServer --env.onServer
 * ```
 *
 * When building for production, this will return an array of both the client and server configs for build performance
 * and speed. All command line arguments will be ignored. Building for prodction example:
 * ```sh
 * webpack --mode production
 * ```
 *
 * All of this is already taken care of in the "scripts" in the package.json, so this is really just for reference for
 * later.
 *
 * @param env any environment variables that were set when calling the webpack cli. For example: "--env.hotServer"
 * @param argv any additional arguments that were set when calling the webpack cli. For example "--mode development"
 */
export default function createConfig(env: IEnv = { hotServer: false, onServer: false }, argv: IArgv) {
  const { hotServer: isHotServer, onServer: isOnServer } = env;
  const { mode } = argv;
  const isDev = mode === "development";
  const options = {
    isDev,
    rootPath: ROOT,
    srcPath: SOURCE,
  };

  const baseConfig: CustomConfig = {
    mode,
    context: ROOT,
    devtool: isDev ? "eval" : "source-map",
    plugins: [
      isDev && new webpack.HotModuleReplacementPlugin(),
      isDev && new webpack.NamedChunksPlugin(),
      new webpack.DefinePlugin({
        "process.env.NODE_ENV": JSON.stringify(mode),
      }),
    ].filter(Boolean),
    module: {
      rules: [],
    },
    resolve: {
      modules: [
        "node_modules",
        "src",
      ],
      extensions: [".tsx", ".ts", ".jsx", ".js"],
      mainFields: [
        "esnext:main",
        "module",
        "main",
      ],
    },
  };

  const clientOpts: IPluginOptions = { ...options, isServer: false };
  const serverOpts: IPluginOptions = { ...options, isServer: true };

  const { client: clientConfig, server: serverConfig } = plugins.reduce((config, plugin) => ({
    client: plugin(config.client, clientOpts),
    server: plugin(config.server, serverOpts),
  }), { client: _.cloneDeep(baseConfig), server: _.cloneDeep(baseConfig) });

  if (isDev && isHotServer) {
    return isOnServer ? clientConfig : serverConfig;
  }

  return [clientConfig, serverConfig];
}
