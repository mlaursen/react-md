// tslint:disable-next-line:max-line-length
// basically a copy of https://github.com/facebook/create-react-app/blob/92d9c5ada40c815dde8948acb96ccbd5636a4e7f/packages/react-dev-utils/WatchMissingNodeModulesPlugin.js
import * as path from "path";
import * as webpack from "webpack";

interface ICompilation extends webpack.compilation.Compilation {
  missingDependencies: Set<string>;
  contextDependencies: {
    add: (path: string) => void;
  };
}

export default class WatchMissingNodeModulesPlugin {
  private nodeModulesPath: string;
  constructor(nodeModulesPath: string) {
    this.nodeModulesPath = nodeModulesPath;
  }

  public apply(compiler: webpack.Compiler) {
    compiler.hooks.emit.tap("WatchMissingNodeModulesPlugin", (compilation: ICompilation) => {
      // if any of the missing depenencies are from node_modules, update webpack to watch node_modules
      // until they appear.
      if (Array.from(compilation.missingDependencies).some(file => file.includes(this.nodeModulesPath))) {
        compilation.contextDependencies.add(this.nodeModulesPath);
      }
    });
  }
}
