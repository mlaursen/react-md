#!/bin/sh
set -e

# ==========================================================================
# Read and validate user input

# Get the package name from the first argument
PACKAGE_NAME="$1"

# "Validate" and fix the package name a bit, if it does not exist, allow the user to input something
# and then continue
if [[ "$PACKAGE_NAME" == @react-md\/* ]]; then
  echo "The package name should not start with \"@react-md/\". It should just be hyphenated case of the component or functionality."
  PACKAGE_NAME="${PACKAGE_NAME/@react-md\//}"
  echo "Updated package name to remove the \"@react-md/\" prefix."
elif [[ "$PACKAGE_NAME" == react-md-* ]]; then
  echo "The package name should not start with \"react-md-\". It should just be hyphenated case of the component or functionality."
  PACKAGE_NAME="${PACKAGE_NAME/react-md-/}"
  echo "Updated package name to remove the \"react-md-\" prefix."
elif [[ -z "$PACKAGE_NAME" ]]; then
  echo "Enter a package name. It should just be hyphenated case of the component or functionality."
  read PACKAGE_NAME
fi

# If there is still no package name at this point... error out
if [[ -z "$PACKAGE_NAME" ]]; then
  echo "A package name is required but none were provided."
  exit 1
fi

echo "Enter a description for the package. Leave empty if there is none right now."
read DESCRIPTION

echo "Private (y or n)?"
read PRIVATE

if [[ "$PRIVATE" =~ ^Y|y(es)?$ ]]; then
  PRIVATE=true
else
  PRIVATE=false
fi

echo "Include styles? (y or n)"
read INCLUDE_STYLES
if [[ "$INCLUDE_STYLES" =~ ^Y|y(es)?$ ]]; then
  INCLUDE_STYLES=true
else
  INCLUDE_STYLES=false
fi


# ==========================================================================
# Create file templates

# The base tsconfig.json file that should be created in each package to compile typescript.
TSCONFIG_TEMPLATE=$(cat <<-END
{
  "extends": "../../tsconfig.definitions.json"
}
END
)

# The tsconfig.definitions.json file that should be created in each package to create
# typescript definition files.
TSCONFIG_DEFINITIONS_TEMPLATE=$(cat <<-END
{
  "extends": "../../tsconfig.definitions.json",
  "compilerOptions": {
    "declarationDir": "./types"
  }
}
END
)


# The package will sometimes include styles. When it does, we want to append some examples
# and usage into the README. All packages _should_ follow the same naming scheme, so it can
# be applied in this manor.
README_STYLE_TEMPLATE=""
if [[ $INCLUDE_STYLES = true ]]; then
  README_STYLE_TEMPLATE=$(cat <<-END
#### Updating Sass to include `node_modules`
If you want to include the SCSS styles for `@react-md/tooltip`, you will need to update your Sass compiler to include the `node_modules` in the paths as well as add [autoprefixer](https://github.com/postcss/autoprefixer) to handle multiple browser compatibility.

> If you are using [create-react-app](https://github.com/facebook/create-react-app), the autoprefixer is already included.

#### webpack
```diff
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
```

#### create-react-app and node-sass-chokidar
```diff
   "scripts": {
+    "build-css": "node-sass-chokidar --include-path ./node_modules src/ -o src/",
+    "watch-css": "npm run build-csss && npm run build-css -- --watch --recursive"
   }
```

### Styles
Including all the base styles can be done by either importing the styles file from the \`dist\` folder or importing the helpers file and using the mixin \`react-md-$PACKAGE_NAME\`:

\`\`\`scss
// This import will generate styles by default.
@import '@react-md/$PACKAGE_NAME/dist/styles';
\`\`\`

or

\`\`\`scss
// This import only includes all the utility variables, mixins, and functions.
@import '@react-md/$PACKAGE_NAME/dist/$PACKAGE_NAME';

// Once everything has been imported, you can generate the styles with the following mixin
@include react-md-$PACKAGE_NAME;
\`\`\`

If you would like to just import all the utility variables, mixins, and functions:
\`\`\`scss
@import '@react-md/$PACKAGE_NAME/dist/$PACKAGE_NAME';

// Any custom styles that use the utilities
\`\`\`
END
)
fi

# The full README.md file
README_TEMPLATE=$(cat <<-END
# @react-md/$PACKAGE_NAME
$DESCRIPTION

This source code of this package can be found at: https://github.com/mlaursen/react-md/tree/release/2.0.x/packages/$PACKAGE_NAME

## Installation
\`\`\`sh
$ npm install --save @react-md/$PACKAGE_NAME
\`\`\`

## Usage
$README_STYLE_TEMPLATE

END
)

# The package.json file template that should get created.
PACKAGE_TEMPLATE=$(cat <<-END
{
  "name": "@react-md/$PACKAGE_NAME",
  "version": "2.0.0-alpha-1",
  "description": "$DESCRIPTION",
  "scripts": {
    "build": "node build.js",
    "prepublishOnly": "npm run build",
    "test": "cross-env BABEL_ENV=test jest src"
  },
  "main": "./lib/index.js",
  "esnext:main": "./es/index.js",
  "module": "./es/index.js",
  "types": "./types/index.d.ts",
  "files": [
    "es/*",
    "lib/*",
    "dist/*",
    "types/*"
  ],
  "license": "MIT",
  "author": "Mikkel Laursen <mlaursen03@gmail.com>",
  "repository": "https://github.com/mlaursen/react-md",
  "private": $PRIVATE,
  "dependencies": {
    "classnames": "^2.2.5"
  },
  "devDependencies": {
    "@babel/cli": "^7.0.0-beta.46",
    "@babel/core": "^7.0.0-beta.46",
    "@react-md/build": "^2.0.0-alpha-1",
    "@react-md/internal-testing": "^2.0.0-alpha-1",
    "@react-md/internal-types": "^2.0.0-alpha-1",
    "@types/classnames": "^2.2.3",
    "@types/prop-types": "^15.5.2",
    "@types/react": "^16.3.14",
    "cross-env": "^5.1.4",
    "jest": "^22.4.3",
    "react": "^16.3.2",
    "react-test-renderer": "^16.3.2",
    "ts-jest": "^22.4.5",
    "tslint": "^5.10.0",
    "typescript": "^2.8.3"
  }
}
END
)

# This is the full build.js file that will run builds for the package.
BUILD_SCRIPT_TEMPLATE=$(cat <<-END
module.exports = require('@react-md/build')($INCLUDE_STYLES);
END
)

# The simple babelrc file that extends the base babelrc from the build.
BABELRC_TEMPLATE=$(cat <<-END
{
  "extends": "@react-md/build/.babelrc.js"
}
END
)

# The simple jest config to use when running tests.
JEST_CONFIG_TEMPLATE=$(cat <<-END
module.exports = {
  testRegex: '(/__tests__/.*|(\.|/)(test|spec))\.(jsx?|tsx?)$',
  moduleFileExtensions: [
    'ts',
    'tsx',
    'js',
    'jsx',
  ],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  testPathIgnorePatterns: [
    '/node_modules/',
  ],
};

END
)

# A simple file creator for scss files that will group them based on the package name.
# This is really just helpful when I start doing SassDoc again
SCSS_FILE_TEMPLATE=$(cat <<-END
////
/// @group $PACKAGE_NAME
////

END
)

# This is the "main" file template for a package that will include all the utilites
# (mixins, functions, and variables) within the package.
SCSS_PACKAGE_FILE_TEMPLATE=$(cat <<-END
$SCSS_FILE_TEMPLATE

@import 'functions';
@import 'mixins';
@import 'variables';

END
)

# This is the file template for the scss file that will generate styles when included
# in another scss file.
STYLES_FILE_TEMPLATE=$(cat <<-END
@import '$PACKAGE_NAME';

@include react-md-$PACKAGE_NAME;

END
)

echo "Creating basic folder structure..."
mkdir -p packages/$PACKAGE_NAME
cd packages/$PACKAGE_NAME

echo "$README_TEMPLATE" > README.md
echo "$TSCONFIG_TEMPLATE" > tsconfig.json
echo "$TSCONFIG_DEFINITIONS_TEMPLATE" > tsconfig.definitions.json
echo "$PACKAGE_TEMPLATE" > package.json
echo "$BUILD_SCRIPT_TEMPLATE" > build.js
echo "$BABELRC_TEMPLATE" > .babelrc
echo "$JEST_CONFIG_TEMPLATE" > jest.config.js


echo "Creating source files..."
mkdir src
touch src/index.ts
if [[ $INCLUDE_STYLES = true ]]; then
  echo "$SCSS_FILE_TEMPLATE" > src/_functions.scss
  echo "$SCSS_FILE_TEMPLATE" > src/_variables.scss
  echo "$SCSS_FILE_TEMPLATE" > src/_mixins.scss
  echo "$SCSS_PACKAGE_FILE_TEMPLATE" > src/_$PACKAGE_NAME.scss
  echo "$STYLES_FILE_TEMPLATE" > src/styles.scss
fi

echo "Installing base dependencies..."
cd ../..
lerna bootstrap

echo "Done! You can now cd into \"packages/$PACKAGE_NAME\" and start creating the module."
