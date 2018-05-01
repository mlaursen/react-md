import env from "@babel/preset-env";
import react from "@babel/preset-react";
import typescript from "@babel/preset-typescript";
import transformClassProperties from "babel-plugin-transform-class-properties";

import { IBaseConfig, IPluginOptions, CustomConfig } from "./types";

const SERVER_ENV_CONFIG = {
  targets: {
    node: "6",
  },
};

const CLIENT_ENV_CONFIG = {
  targets: {
    browsers: [
      "last 2 versions",
    ],
  },
};

export default function withTypescript(config: CustomConfig, options: IPluginOptions): CustomConfig {
  const { isServer, rootPath } = options;

  const envConfig = isServer ? SERVER_ENV_CONFIG : CLIENT_ENV_CONFIG;
  config.module.rules.push({
    test: /\.tsx?$/,
    include: [
      rootPath,
    ],
    use: [{
      loader: "babel-loader",
      options: {
        babelrc: false,
        presets: [
          typescript,
          [env, envConfig],
          react,
        ],
        plugins: [
          transformClassProperties,
        ],
      },
    }],
  });

  return config;
}
