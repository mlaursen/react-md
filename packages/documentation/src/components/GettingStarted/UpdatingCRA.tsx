/* tslint:disable max-line-length */
import * as React from "react";

import { MarkdownPage } from "components/Markdown";

const markdown = `# Updating create-react-app
To start using \`react-md\` within a project bootstrapped with [create-react-app](https://github.com/facebookincubator/create-react-app),
you can follow the steps outlined in this document.

## Table of Contents
- [Adding a CSS-Preprocessor](#adding-a-css-preprocessor)
- [Adding Fonts](#adding-fonts)
  - [directly in index.html](#directly-in-index-html)
  - [with webfontloader](#with-webfontloader)
- [Include react-md styles](#including-react-md-styles)

## Adding a CSS-Preprocessor
The following steps have been taken directly from the [adding a css-preprocessor](https://github.com/facebook/create-react-app/blob/ca5998326deebf79845ca00f616b8dad11d90509/packages/react-scripts/template/README.md#adding-a-css-preprocessor-sass-less-etc)
but have been modified to add \`--include-path ./node_modules\` to work with react-md. You can read more about the include paths
[here](/getting-started/sass-include-paths).

First, let's install the command-line interface for Sass:
\`\`\`sh
$ npm install --save-dev node-sass-chokidar
\`\`\`

Then in \`package.json\`, add the following lines to \`scripts\`:
\`\`\`diff
   "scripts": {
+    "build-css": "node-sass-chokidar --include-path ./node_modules src/ -o src/",
+    "watch-css": "npm run build-css && npm run build-css -- --watch --recursive",
     "start": "react-scripts start",
     "build": "react-scripts build",
     "test": "react-scripts test --env=jsdom",
\`\`\`

Next, let's rename \`src/index.css\` and \`src/App.css\` to \`src/index.scss\` and \`src/App.scss\` and run \`npm run watch-css\`:
\`\`\`sh
$ mv src/index.css src/index.scss
$ mv src/App.css src/App.scss
$ npm run watch-css
\`\`\`

The watcher will find every Sass file in \`src\` subdirectories, and create a corresponding CSS file next to it, in our case
overwriting \`src/App.css\`. Since \`src/App.js\` still imports \`src/App.css\`, the styles become a part of your application.
You can now edit \`src/App.scss\`, and \`src/App.css\` will be regenerated.

At this point you might want to remove all CSS files from the source control, and add \`src/**/*.css\` to your \`.gitignore\` file.
It is generally a good practice to keep the build products outside of the source control. Edit \`.gitignore\`:
\`\`\`diff
 npm-debug.log*
 yarn-debug.log*
 yarn-error.log*
+
+# build artifacts
+src/**/*.css
\`\`\`

As a final step, you may find it convenient to run \`watch-css\` automatically with \`npm start\`, and run \`build-css\` as a part of
\`npm run build\`. You can use the \`&&\` operator to execute two scripts sequentially. However, there is no cross-platform way to
run two scripts in parallel, so we will install a package for this:
\`\`\`sh
$ npm install --save-dev npm-run-all
\`\`\`

Then we can change \`start\` and \`build\` scripts to include the CSS preprocessor commands:
\`\`\`diff
   "scripts": {
     "build-css": "node-sass-chokidar --include-path ./node_modules src/ -o src/",
     "watch-css": "npm run build-css && npm run build-css --watch --recursive",
-    "start": "react-scripts start",
-    "build": "react-scripts build",
+    "start-js": "react-scripts start",
+    "start": "npm-run-all -p watch-css start-js",
+    "build": "npm run build-css && react-scripts build",
     "test": "react-scripts test --env=jsdom",
     "eject": "react-scripts eject"
   }
\`\`\`

Now running \`npm start\` and \`npm run build\` also builds Sass files.

You can continue reading the \`create-react-app\`'s documentation about [adding a css-preprocessor](https://github.com/facebook/create-react-app/blob/ca5998326deebf79845ca00f616b8dad11d90509/packages/react-scripts/template/README.md#adding-a-css-preprocessor-sass-less-etc)
for more information.

### Adding Fonts
Since there are multiple ways of including web fonts into your project, this section will only cover the two most used and easiest ways. If you would
like to read about additional methods, you can read the [Including Web Fonts](/getting-started/including-web-fonts) guide.

#### Directly in index.html
This will be the easiest method of adding the fonts and basic typography styles of react-md. The two steps are:
- add the \`"rmd-typography"\` class to the base \`<html>\` element to get basic typography enabled
- add a \`<link>\` that has a link to the fonts you want to use.

This example will include the fonts for [Roboto](https://fonts.google.com/specimen/Roboto?selection.family=Roboto:400,500,700) with the regular, medium, and bold font weights
as well as the [Material Icons icon font](https://google.github.io/material-design-icons/#setup-method-1-using-via-google-web-fonts). Edit \`public/index.html\`:

\`\`\`diff
 <!DOCTYPE html>
-<html lang="en">
+<html lang="en" class="rmd-typography">
   <head>
     <meta charset="utf-8">
     <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
     <meta name="theme-color" content="#000000">
     <!--
       manifest.json provides metadata used when your web app is added to the
       homescreen on Android. See https://developers.google.com/web/fundamentals/engage-and-retain/web-app-manifest/
     -->
     <link rel="manifest" href="%PUBLIC_URL%/manifest.json">
     <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico">
+    <link href="https://fonts.googleapis.com/icon?family=Material+Icons&Roboto:300,400,500,700" rel="stylesheet">
     <!--
       Notice the use of %PUBLIC_URL% in the tags above.
       It will be replaced with the URL of the \`public\` folder during the build.
       Only files inside the \`public\` folder can be referenced from the HTML.

       Unlike "/favicon.ico" or "favicon.ico", "%PUBLIC_URL%/favicon.ico" will
       work correctly both with client-side routing and a non-root public URL.
       Learn how to configure a non-root public URL by running \`npm run build\`.
     -->
     <title>React App</title>
\`\`\`

If you are running your server, the fonts should now be correctly included so you can continue reading on
to [include react-md styles](#include-react-md-styles) or start reading component documentation and examples.

#### With webfontloader
Another alternative is to use the [webfontloader](https://github.com/typekit/webfontloader) to dynamically load your fonts.

First, lets install the \`webfontloader\`:

\`\`\`sh
$ npm install --save webfontloader

# If you are using typescript, you should also run
$ npm install --save-dev @types/webfontloader
\`\`\`

Next, update \`src/index.js\` to include the \`webfontloader\`:
\`\`\`diff
 import React from 'react';
 import ReactDOM from 'react-dom';
 import './index.css';
 import App from './App';
 import registerServiceWorker from './registerServiceWorker';
+import WebFontLoader from 'webfontloader';
+
+WebFontLoader.load({
+  google: {
+    families: ['Roboto:300,400,500,700', 'Material Icons'],
+  },
+});

 ReactDOM.render(<App />, document.getElementById('root'));
 registerServiceWorker();
\`\`\`

If you are running your server, the fonts should now be correctly included so you can continue reading on
to [include react-md styles](#include-react-md-styles) or start reading component documentation and examples.

### Including react-md styles
This section requires prior knowledge of [including styles](/getting-started/installation#including-styles) and
[SCSS naming paradim](/getting-started/installation#scss-naming-paradim) on the main installation page before continuing.

My general reccomendation is to create a \`_globals.scss\` file within your project to be able to quickly import
any shared variables, functions, and mixins to any SCSS file in your app. For this example, I will keep it simple and
only create this file for including the icon, theme, and typography packages from react-md.

First, let's create the \`_globals.scss\` file.
\`\`\`sh
$ touch src/_globals.scss
\`\`\`

Next, let's update \`_globals.scss\` to include the packages from react-md that are being used. Edit \`src/_globals.scss\`:
\`\`\`diff
+ @import '@react-md/icon/dist/icon';
+ @import '@react-md/icon/dist/theme';
+ @import '@react-md/icon/dist/typography';
\`\`\`

Now you can easily import your \`_globals.scss\` file easily into any SCSS file in your project to have access to all
the variables, functions, and mixins defined by react-md!

To see this in use, let's update \`index.scss\` to import our \`_globals.scss\` file and generate the styles for the three packages. Edit: \`src/index.scss\`:
\`\`\`diff
+@import 'globals';
+
+@include react-md-icon;
+@include react-md-theme;
+@include react-md-typography;

 body {
   margin: 0;
 }
\`\`\`

Now the styles for icons, the base theme, and typography have been included.
`;

export default () => <MarkdownPage markdown={markdown} />;
