import * as path from "path";
import * as webpack from "webpack";
import * as autoprefixer from "autoprefixer";
import * as HtmlWebpackPlugin from "html-webpack-plugin";
import * as MiniCSSExtractPlugin from "mini-css-extract-plugin";
import * as OptimizeCSSAssetsPlugin from "optimize-css-assets-webpack-plugin";
import * as UglifyJSPlugin from "uglifyjs-webpack-plugin";
import * as CaseSensitivePathsPlugin from "case-sensitive-paths-webpack-plugin";
import * as ManifestPlugin from "webpack-manifest-plugin";
import TSConfigPathsPlugin from "tsconfig-paths-webpack-plugin";

import WatchMissingNodeModulesPlugin from "./WatchMissingNodeModulesPlugin";
import InterpolateHtmlPlugin from "./InterpolateHtmlPlugin";

const ForkTSCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

interface IArgv {
  mode: "development" | "production";
}

const root = process.cwd();
const src = path.join(root, "src");
const tsconfig = path.join(root, "tsconfig.app.json");
const tslint = path.join(root, "tslint.json");
const nodeModules = path.join(root, "node_modules");
const publicDir = path.join(root, "public");

const PostCSSOptions = {
  ident: "postcss",
  plugins: () => [
    require("postcss-flexbugs-fixes"),
    autoprefixer({
      browsers: [">1%", "last 2 versions", "not ie < 11"],
      flexbox: "no-2009",
    }),
  ],
};

module.exports = (env: any, { mode }: IArgv) => {
  const isDev = mode === "development";
  const min = isDev ? "" : ".min";
  const hash = ".[hash:8]";
  const chunkhash = isDev ? "" : ".[chunkhash:8]";
  const publicUrl = isDev ? "" : "https://mlaursen.github.io/react-md";
  const publicPath = isDev ? "/" : "/react-md/";
  const dist = isDev ? publicDir : path.join(root, "dist");

  return {
    bail: !isDev,
    mode,
    context: root,
    entry: "./src/index.tsx",
    devtool: isDev ? "cheap-module-source-map" : "source-map",
    devServer: {
      contentBase: publicDir,
      hot: true,
      host: "0.0.0.0",
      stats: "minimal",
      historyApiFallback: true,
      compress: true,
      watchContentBase: true,
      publicPath,
    },
    resolve: {
      extensions: [".ts", ".tsx", ".jsx", ".js"],
      modules: ["src", "node_modules"],
      mainFields: ["esnext:main", "module", "main"],
      plugins: [new TSConfigPathsPlugin({ configFile: tsconfig })],
    },
    output: {
      filename: `js/[name]${chunkhash}${min}.js`,
      chunkFilename: `js/[name]${chunkhash}.chunk${min}.js`,
      path: dist,
      publicPath,
      // Point sourcemap entries to original disk location (format as URL on Windows)
      devtoolModuleFilenameTemplate: info =>
        path.relative(src, info.absoluteResourcePath).replace(/\\/g, "/"),
    },
    module: {
      rules: [
        {
          test: /\.t|jsx?$/,
          loader: require.resolve("source-map-loader"),
          enforce: "pre",
          include: src,
        },
        {
          oneOf: [
            {
              test: /\.svg$/,
              include: /NotFound/,
              use: require.resolve("raw-loader"),
            },
            {
              test: /\.(png|jpe?g|gif|svg)$/,
              use: {
                loader: require.resolve("url-loader"),
                options: {
                  limit: 10000,
                  name: `static/[name]${hash}.[ext]`,
                },
              },
            },
            {
              test: /\.tsx?$/,
              use: [
                {
                  loader: require.resolve("babel-loader"),
                  options: {
                    babelrc: false,
                    plugins: ["react-hot-loader/babel", "syntax-dynamic-import"],
                  },
                },
                {
                  loader: require.resolve("ts-loader"),
                  options: {
                    transpileOnly: true,
                    configFile: tsconfig,
                  },
                },
              ],
              include: src,
            },
            {
              test: /\.css$/,
              use: [
                isDev ? require.resolve("style-loader") : MiniCSSExtractPlugin.loader,
                {
                  loader: require.resolve("css-loader"),
                  options: {
                    importLoaders: 1,
                  },
                },
                {
                  loader: require.resolve("postcss-loader"),
                  options: PostCSSOptions,
                },
              ],
            },
            {
              test: /\.scss$/,
              use: [
                isDev ? require.resolve("style-loader") : MiniCSSExtractPlugin.loader,
                {
                  loader: require.resolve("css-loader"),
                  options: {
                    importLoaders: 2,
                  },
                },
                {
                  loader: require.resolve("postcss-loader"),
                  options: PostCSSOptions,
                },
                {
                  loader: require.resolve("sass-loader"),
                  options: {
                    includePaths: [nodeModules, src],
                  },
                },
              ],
            },
            {
              exclude: /\.(html|json|(j|t)sx?)$/,
              loader: require.resolve("file-loader"),
              options: {
                name: `static/[name]${hash}.[ext]`,
              },
            },
          ],
        },
      ],
    },
    plugins: [
      isDev && new webpack.HotModuleReplacementPlugin(),
      isDev && new WatchMissingNodeModulesPlugin(nodeModules),
      !isDev &&
        new MiniCSSExtractPlugin({
          filename: `css/[name]${hash}${min}.css`,
        }),
      !isDev &&
        new ManifestPlugin({
          fileName: "asset-manifest.json",
        }),
      new HtmlWebpackPlugin({
        inject: true,
        template: path.join(publicDir, "index.html"),
        minify: isDev
          ? undefined
          : {
              removeComments: true,
              collapseWhitespace: true,
              removeRedundantAttributes: true,
              useShortDoctype: true,
              removeEmptyAttributes: true,
              removeStyleLinkTypeAttributes: true,
              keepClosingSlash: true,
              minifyJS: true,
              minifyCSS: true,
              minifyURLs: true,
            },
      }),
      new InterpolateHtmlPlugin({
        PUBLIC_URL: publicUrl,
      }),
      new webpack.DefinePlugin({
        "process.env": {
          NODE_ENV: JSON.stringify(process.env.NODE_ENV || mode),
          PUBLIC_URL: JSON.stringify(publicPath.replace(/\/$/, "")),
        },
      }),
      new webpack.NamedModulesPlugin(),
      new CaseSensitivePathsPlugin(),
      new ForkTSCheckerWebpackPlugin({
        async: false,
        watch: src,
        tsconfig,
        tslint,
      }),
      !isDev && new CopyPlugin(["public/robots.txt", "public/favicon.ico", "public/404.html"]),
    ].filter(Boolean),
    optimization: {
      splitChunks: {
        chunks: "all",
        cacheGroups: {
          styles: {
            name: "styles",
            test: /\.s?css$/,
            chunks: "all",
            enforce: true,
          },
        },
      },
      runtimeChunk: "single",
      minimizer: isDev
        ? undefined
        : [
            new UglifyJSPlugin({
              cache: true,
              sourceMap: true,
              parallel: true,
              uglifyOptions: {
                compress: {
                  ecma: 5,
                  warnings: false,
                  comparisons: false,
                },
                mangle: {
                  safari10: true,
                },
                output: {
                  ecma: 5,
                  comments: false,
                  ascii_only: true,
                },
              },
            }),
            new OptimizeCSSAssetsPlugin({}),
          ],
    },
    performance: {
      hints: isDev ? false : "warning",
    },
  } as webpack.Configuration;
};
