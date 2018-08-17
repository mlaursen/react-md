/* tslint:disable max-line-length */
import * as React from "react";

import { MarkdownPage } from "components/Markdown";

const markdown = `# Installing @react-md/app-bar

## Table of Contents
- [Installing](#installing)
- [Including Styles](#including-styles)
  * [Updating Sass to include \`node_modules\`](#updating-sass-to-include-node_modules)
  * [webpack](#webpack)
  * [create-react-app and node-sass-chokidar](#create-react-app-and-node-sass-chokidar)
  * [Scss File Names and Importing](#scss-file-names-and-importing)
- [Including Styles Quick](#including-styles-quick)

## Installing
\`\`\`sh
$ npm install --save @react-md/app-bar \\
    @react-md/button \\
    @react-md/icon \\
    @react-md/theme \\
    @react-md/typography
\`\`\`

or with \`yarn\`

\`\`\`sh
$ yarn add @react-md/app-bar \\
    @react-md/button \\
    @react-md/icon \\
    @react-md/theme \\
    @react-md/typography
\`\`\`

> NOTE: The packages listed after the first line are required for additional styles. They only need to be added once to your project.



## Including Styles
The following sections will be helpers to update your Sass compiler to include the \`node_modules\` in the \`include-paths\` either for an
app using \`create-react-app\` or a custom webpack config as well as adding \`autoprefixer\`. If you have already completed these steps,
you can skip down to [Installing Styles Quick](#including-styles-quick).

### Updating Sass to include \`node_modules\`
If you want to include the SCSS styles for \`@react-md/app-bar\`, you will need to update your Sass compiler to include the \`node_modules\` in the paths as well as add [autoprefixer](https://github.com/postcss/autoprefixer) to handle multiple browser compatibility.

> If you are using [create-react-app](https://github.com/facebook/create-react-app), the autoprefixer is already included.

### webpack
\`\`\`diff
 {
   test: /.scss$/,
   use: [{
     loader: 'style-loader',
     options: { sourceMap: true },
   }, {
     loader: 'css-loader',
     options: { sourceMap: true, importLoaders: 2 },
   }, {
     loader: 'postcss',
     options: { sourceMap: true },
   }, {
     loader: 'sass-loader',
     options: {
       sourceMap: true,
+      includePaths: [
+        './node_modules', // or whatever relative path it is to node_modules
+      ],
     },
   }],
 }
\`\`\`

### create-react-app and node-sass-chokidar
\`\`\`diff
   "scripts": {
+    "build-css": "node-sass-chokidar --include-path ./node_modules src/ -o src/",
+    "watch-css": "npm run build-csss && npm run build-css -- --watch --recursive"
   }
\`\`\`


### Scss File Names and Importing
This package exports the following files:
- _app-bar.scss
- _mixins.scss
- _variables.scss
- styles.scss

which are mostly self describing about what they export.
 The \`styles.scss\` is the only file that will generate styles by default
when imported into your project as well as including all variables, functions, and mixins for this package. The \`app-bar.scss\` is a file that is used to just automatically import all files within
this package for convenience. So for example:
\`\`\`scss
@import '@react-md/app-bar/dist/variables';
@import '@react-md/app-bar/dist/mixins';
\`\`\`

would be the same as
\`\`\`scss
@import '@react-md/app-bar/dist/app-bar';
\`\`\`


This package also requires the styles from the following packages:
- \`@react-md/button\`
- \`@react-md/icon\`
- \`@react-md/theme\`
- \`@react-md/typography\`

so you will need to follow the above steps to include the styles for them as well.

## Including Styles Quick
\`\`\`scss
@import '@react-md/app-bar/dist/app-bar';
@import '@react-md/button/dist/button';
@import '@react-md/icon/dist/icon';
@import '@react-md/theme/dist/theme';
@import '@react-md/typography/dist/typography';

@include react-md-app-bar;
@include react-md-button;
@include react-md-icon;
@include react-md-theme;
@include react-md-typography;
\`\`\`
`;

const Installation = () => <MarkdownPage markdown={markdown} />;

export default Installation;
