import * as webpack from "webpack";
import MiniCSSPlugin from "mini-css-extract-plugin";
import OptimizeCSSAssetsPlugin from "optimize-css-assets-webpack-plugin";

import { IBaseConfig, IPluginOptions, CustomConfig } from "./types";

/**
 * I needed to supply source maps to each one, so I wanted to copy less characters
 * for each loader.
 */
function createLoader(name: string, options?: {}): webpack.Loader {
  return {
    loader: `${name}-loader`,
    options: {
      sourceMap: true,
      ...options,
    },
  };
}

/**
 * Updates the webpack config to handle loading styles for both server and client code.
 *
 * Client updates:
 * In dev mode, the styles will be loaded with the style-loader for hot reloading while in production they will
 * be compiled and extracted into stylesheets.
 *
 * Server updates:
 * All styles will be removed from the bundle since it isn't needed on the server.
 */
export default function withStyles(config: CustomConfig, options: IPluginOptions): CustomConfig {
  const { isServer, isDev } = options;

  const styleLoader = isDev ? createLoader("style") : MiniCSSPlugin.loader;
  const plugins = [
    !isDev && !isServer && new MiniCSSPlugin({
      filename: "[name]-[hash].min.css",
      chunkFilename: "[id]-[hash].min.css",
    }),
    isServer && new webpack.NormalModuleReplacementPlugin(/\.s?css$/, "node-noop"),
  ].filter(Boolean);
  config.plugins.push(...plugins);

  config.module.rules.push({
    test: /\.css$/,
    include: [
      "node_modules/prismjs/themes",
    ],
    use: [
      styleLoader,
      createLoader("css", { importLoaders: 1 }),
      createLoader("postcss"),
    ],
  }, {
    test: /\.scss$/,
    include: [
      "src",
    ],
    use: [
      styleLoader,
      createLoader("css", { importLoaders: 2 }),
      createLoader("postcss"),
      createLoader("sass"),
    ],
  });

  return config;
}
