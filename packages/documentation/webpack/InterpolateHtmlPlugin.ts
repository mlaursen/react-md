import * as webpack from "webpack";
import * as HtmlWebpackPlugin from "html-webpack-plugin";
import * as escapeStringRegexp from "escape-string-regexp";

export default class InterpolateHtmlPlugin {
  private replacements: {};
  constructor(replacements: {}) {
    this.replacements = replacements;
  }

  public apply(compiler: webpack.Compiler) {
    compiler.hooks.compilation.tap("InterpolateHtmlPlugin", (compilation) => {
      const hooks = compilation.hooks as HtmlWebpackPlugin.Hooks;

      hooks.htmlWebpackPluginBeforeHtmlProcessing.tap("InterpolateHtmlPlugin", data => {
        Object.keys(this.replacements).forEach(key => {
          const value = this.replacements[key];
          data.html = data.html.replace(new RegExp(`%${escapeStringRegexp(key)}%`, "g"), value);
        });

        return data;
      });
    })

  }
}
