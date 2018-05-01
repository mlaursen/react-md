import * as webpack from "webpack";

export interface IArgv {
  mode: "production" | "development";
}

export interface IEnv {
  hotServer?: boolean;
  server?: boolean;
}

export interface IBaseConfig {
  mode: string;
  plugins: webpack.Plugin[];
  module: {
    rules: webpack.Rule[],
  },
}

export interface IPluginOptions {
  isDev: boolean;
  isServer: boolean;
  rootPath: string;
  srcPath: string;
}

export type CustomConfig = IBaseConfig & webpack.Configuration;
