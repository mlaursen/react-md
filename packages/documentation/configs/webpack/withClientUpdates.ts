import path from "path";
import CleanWebpackPlugin from "clean-webpack-plugin";
import ManifestPlugin from "webpack-manifest-plugin";
import UglifyJSPlugin from "uglifyjs-webpack-plugin";
import cssnano from "cssnano";
import OptimizeCSSAssetsPlugin from "optimize-css-assets-webpack-plugin";
import { IPluginOptions, CustomConfig } from "./types";

export default function withClientUpdates(config: CustomConfig, options: IPluginOptions): CustomConfig {
  const { isServer, isDev, rootPath, srcPath } = options;
  if (isServer) {
    return config;
  }

  const entry = path.join(srcPath, "client");

  config.name = "client";
  config.target = "web";
  config.entry = isDev ? ["webpack-hot-middleware/client?name=client", entry] : entry;
  config.output = {
    path: path.join(rootPath, "public"),
    publicPath: "/",
    filename: `client${isDev ? "" : "-[hash:8].min"}.js`,
  };

  if (!isDev) {
    config.optimization = {
      minimizer: [
        new UglifyJSPlugin({
          sourceMap: true,
        }),
      ],
    };
  }

  const plugins = [
    new CleanWebpackPlugin(["public"], {
      root: rootPath,
      exclude: [
        "favicon.ico",
        "react-md.png",
        "robots.txt",
      ],
    }),
    !isDev && new ManifestPlugin(),
    !isDev && new OptimizeCSSAssetsPlugin({
      cssProcessor: cssnano,
      cssProcessorOptions: {
        discardComments: {
          removeAll: true,
        },
        safe: true,
      },
    }),
  ].filter(Boolean);

  config.plugins.push(...plugins);
  return config;
}
