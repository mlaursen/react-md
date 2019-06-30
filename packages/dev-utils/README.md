# dev-utils

This is a private package within react-md to do common development scripts. The
main use case for this package is so that I don't need to remember to keep
re-installing dev dependencies in each project and all the tsconfig files. All
of it will be handled automatically behind the scenes.

## Commands

If you would like logging for what the dev-utils are doing, you can add the
`--verbose` flag to all commands below.

### `dev-utils clean`

Cleans the project by removing the `es`, `lib`, `types`, and `dist` folders from
current project.

### `dev-utils build`

Builds the project by

- copying over any/all scss files in the `src` directory to the `dist` directory
- compiling the `src/styles.scss` file for development with a sourcemap and a
  minified production build as `dist/{{PACKAGENAME}}.css`
- creating a `dist/scssVariables.js` file that contains a list of all the scss
  variables in the package with their default value
- compiling all the typescript files for ES Modules, Common JS, and UMD
- generating the typescript definition files and copying any custom definition
  files into the `types` directory

### `dev-utils test`

This runs `jest` in the current project. This is really just so I don't need to
keep remembering to install `jest` and create the `ts-jest` config in each
project.
