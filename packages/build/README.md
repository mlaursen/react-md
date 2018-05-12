# @react-md/build
This is a private helper that will compile the typescript files down to commonjs, ES6 modules, and create the typescript definition files.

## Setup
### Install the build into the correct package
```sh
lerna add @react-md/build --dev --scope PACKAGE_NAME
```

### Create the build script
```js
require('@react-md/build')();
```

### Create tsconfig files

Create a base `tsconfig.json`:
```json
{
  "extends": "../../tsconfig.json"
}
```

and a `tsconfig.definitions.json`
```json
{
  "extends": "../../tsconfig.definitions.json",
  "compilerOptions": {
    "declarationDir": "./types"
  }
}
```

### Create build script in package.json
```json
{
  "name": "@react-md/PACKAGE_NAME",
  "scripts": {
    "build": "node build.js"
  }
}
```

### Running build or watch mode
```sh
$ npm run build
```

```sh
$ npm run build -- --watch
```
