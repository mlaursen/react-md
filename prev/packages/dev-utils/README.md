# dev-utils

This is a private package within react-md to do common development scripts. The
main use case for this package is so that I don't need to remember to keep
re-installing dev dependencies in each project and all the tsconfig files. All
of it will be handled automatically behind the scenes.

For more info, run `yarn dev-utils --help`.

```sh
Usage: dev-utils [options] [command]

Options:
  -h, --help             display help for command

Commands:
  clean [options]        Cleans all the distributables for all publishable packages.
  styles [options]       Copies all the SCSS files into the dist folder as well as creating non-webpack specific versions.
  sassdoc [options]      Creates the sassdoc for the documentation site in all scoped packages.
  variables [options]    Creates the `src/scssVariables` file in all scoped packages.
  changelogs [options]   Updates the changelogs to be a bit prettier.
  configs [options]      Re-generates all the `tsconfig.*` files for the Typescript project references.
  copy-shared [options]  Copies all the shared markdown files and utils throughout the repo into the documentation folder.
  doc-index [options]    Indexes (terribly) metadata throughout react-md for the documentation site.
  release [options]      Goes through the steps of releasing a new version of react-md.
  sandbox [options]      Creates the `*-Sandbox.json` files in the documentation site.
  libsize [options]      Prints the gzpped size for the entire library based on the UMD bundles and the pre-compiled themes.
  themes [options]       Creates all the pre-compiled css themes in the root `/themes` folder. This really shouldn't be run other than during the release script since`the
                         `/themes` folder is ignored by git until a release is tagged.
  umd [options]          Compiles the UMD bundles for `react-md`. This really shouldn't be used as it's handled by the `release` script automatically.
  watch [options]        A custom watch script that handles copying all changed scss files as well as starting tsc watchers.
  help [command]         display help for command
```
