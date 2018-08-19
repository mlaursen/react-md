/* tslint:disable max-line-length */
import * as React from "react";
import { TreeViewDataList } from "@react-md/tree-view";

import { MarkdownPage } from "components/Markdown";
import routes from "components/App/routes";

interface IPackageLink {
  name: string;
  path: string;
}

type ChildItems = TreeViewDataList<{ children: string }>;

const packages: IPackageLink[] = [];
for (const route of routes) {
  const { itemId, childItems } = route;
  if (itemId === "/packages") {
    [].push.apply(packages, (childItems as ChildItems).map(({ children, itemId: path }) => ({ name: children, path })));
    break;
  }
}

const markdown = `## Table of Contents
- [Installing Packages](#installing-packages)
  - [Installing with npm](#installing-with-npm)
  - [Using UMD Bundles](#using-umd-bundles)
- [Updating Sass Include Paths](#updating-sass-include-paths)
  - [Upating webpack config](#updating-webpack-config)
- [Including Styles](#including-styles)
  - [SCSS Naming Paradim](#scss-naming-paradim)
  - [Exported SCSS Files](#exported-scss-files)
  - [Including Styles Example](#including-styles-example)

## Installing Packages
\`react-md\` has been split up into separate scoped packages to hopefully make it easy to pick and choose
what functionality you want to bring into your app without requiring the entire framework. However,
you can still install the base \`react-md\` package that will include every scoped package for convenience.

Even though the packages are scoped, most packages will require the styles from:
- \`@react-md/icon\`
- \`@react-md/theme\`
- \`@react-md/typography\`

so it is recommended to at least start with these packages. The packages are available by installing from [npm](https://npmjs.com)
or using the UMD bundle hosted on [unpkg](https://unpkg.com). You will have a lot more flexibility by installing with npm as the
UMD bundle will include every component and styles within react-md.

> NOTE: \`@react-md/material-icons\` will be the only package that is **not** included in the UMD bundle since
it includes 500+ icons and components.

For convenience, here is a list of all packages within react-md and links to their documentation:
${packages.map(({ name, path }) => `- [${name}](${path})`).join("\n")}

### Installing with npm
This method will allow the most control and will most likely be the easiest within a normal React workflow.
You can install any of the packages listed above as follows:

\`\`\`sh
$ npm install --save @react-md/icon @react-md/theme @react-md/typography
\`\`\`

Or you can just install the entire \`react-md\` library with:
\`\`\`sh
$ npm install --save react-md
\`\`\`

### Using UMD Bundles
The main \`react-md\` package also exports a UMD bundle as well as 255 precompiled themes for quick setup. You
can use these bundles by updating your \`index.html\` file as follows:
\`\`\`diff
 <!DOCTYPE html>
 <html>
   <head>
+    <link rel="stylesheet" href="https://unpkg.com/react-md@2.0.0-alpha-1/dist/react-md.indigo-pink.min.css">
   </head>
   <body>
     <div id="root"></div>
     <script src="https://unpkg.com/react/dist/react.min.js"></script>
     <script src="https://unpkg.com/react-dom/dist/react-dom.min.js"></script>
+    <script src="https://unpkg.com/react-md@2.0.0-alpha-1/dist/react-md.min.js"></script>
+    <script src="https://unpkg.com/@react-md/material-icons@2.0.0-alpha-1/dist/react-md.min.js"></script>
   </body>
 </html>
\`\`\`

Once \`react-md\` has been included, you can use the globally created \`ReactMD\` variable to extract the components
you want:
\`\`\`jsx
const { AppBar, AppBarNav, AppBarTitle, List, ListItem } = ReactMD;
const { HomeSVGIcon } = ReactMDMaterialIcons;

const App = () => (
  <div>
    <AppBar>
      <AppBarNav><HomeSVGIcon /></AppBarNav>
      <AppTitle>Example App!</AppTitle>
    </AppBar>
    <main className={AppBar.offsetClassName}>
      <List>
        <ListItem>Item 1</List>
        <ListItem>Item 2</List>
        <ListItem>Item 3</List>
      </List>
    </main>
  </div>
);

ReactDOM.render(<App />, document.getElementById('root'));
\`\`\`

## Updating Sass Include Paths
Every package within \`react-md\` that has styles will require you to update your Sass compiler to include
\`node_modules\` for the \`includePaths\` to work. If you are using [create-react-app](https://github.com/facebookincubator/create-react-app), you
can skip this and read the [updating create-react-app](/getting-started/updating-create-react-app) guide instead.

### Updating webpack config
To make things simple, I will assume that you have an existing webpack config file and have a decent understanding
of how to use different rules and loaders.

Update the webpack config file to add a new rule for loading SCSS (or update your existing rule):
\`\`\`diff
 {
   test: /\.scss$/,
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

The important part to note is the "added" section in the diff above. This will update \`node-sass\` to also
resolve SCSS files that are found within the \`node_modules\` directory. Without this change, you will be unable
to import any SCSS file correctly from react-md.

## Including Styles
### SCSS Naming Paradim
To make these styles easier to plug-and-play with other libraries, every variable, function, and mixin will be prefixed with \`rmd\` or \`react-md\`
where \`rmd\` is preserved for general variables, functions, and mixins while \`react-md\` is reserved for a package's mixin that will generate
all the styles required.

If you are unfamiliar with the existing SCSS file naming paradims, here is a quick summary. If a file is prefixed with an underscore (\`_\`), the file
**should not** generate any styles when imported while a file without an underscore *should*. Even though some files will have underscores and others will
not, there will be no difference when importing the files in your SCSS file. So lets say that we have the following files:
- \`styles.scss\`
- \`_variables.scss\`
- \`_mixins.scss\`

If you were to import these into a SCSS file, it should look like:
\`\`\`scss
@import 'variables';
@import 'mixins';
@import 'styles';
\`\`\`

### Exported SCSS Files
Every package within react-md will follow the same SCSS file export structure:
- \`dist/styles.scss\` - A file that will generate all the styles when imported into your project for that package. If the react-md package does
not have any styles, this file and the follow files will not be available.
- \`dist/_<<PACKAGE_NAME>>.scss\` - A file that can be used to import every variable, function, and mixin for the package **without** generating any
styles.
- \`dist/_variables.scss\` - A file that can be imported into your project that will only include the variables (if they exist) for this package.
- \`dist/_functions.scss\` - A file that can be imported into your project that will only include the functions (if they exist) for this package.
- \`dist/_mixins.scss\` - A file that can be imported into your project that will only include the mixins (if they exist) for this package.

If a package has any styles that need to be created, the \`_mixins.scss\` file will exist and have a \`react-md-<<PACKAGE_NAME>>\` mixin
that will generate all the styles for this package. So for example, the \`@react-md/typography\` package will have a mixin \`react-md-typography\`
and the \`@react-md/button\` package will have a mixin \`react-md-button\`.

### Including Styles Example
Now that all of that is out of the way, here is a quick example for how you can include the styles for the recommended "base" packages for react-md.

\`\`\`scss
@import '@react-md/icon/dist/icon';
@import '@react-md/theme/dist/theme';
@import '@react-md/typography/dist/typography';

@include react-md-icon;
@include react-md-theme;
@include react-md-typography;

// or if you don't need to use any of the provided variables, mixins, or functions, only include the following lines
@import '@react-md/icon/dist/styles';
@import '@react-md/theme/dist/styles';
@import '@react-md/typography/dist/styles';
\`\`\`

If you installed the base \`react-md\` package instead, these steps can be simplified to:
\`\`\`scss
@import 'react-md/dist/react-md';

@include react-md-everything;

// or if you don't need to use any of the provided variables, mixins, or functions, only include the following line
@import 'react-md/dist/styles';
\`\`\`
`;

export default () => <MarkdownPage markdown={markdown} />;
