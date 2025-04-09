# React + TypeScript + Vite

This is a minimal boilerplate for `mlaursen` to spin up React apps. This project
requires [volta](https://volta.sh/) to manage the `node` and `pnpm` versions.

## How to Use

Download the example:

```bash
curl https://codeload.github.com/mlaursen/react-md/tar.gz/next | tar -xz --strip=2 react-md-next/examples/mlaursen-vite
cd mlaursen-vite
```

Install it and run:

```sh
pnpm install
pnpm dev
```

Finally, initialize the git repo and create your first commit:

```sh
git init
git add .
git commit -m "Initial commit"
```

or:

[![Edit on CodeSandbox](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/p/sandbox/github/mlaursen/react-md/tree/next/examples/mlaursen-vite)

[![Edit on StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/mlaursen/react-md/tree/next/examples/mlaursen-vite)

## What's Included

This example will setup an example Create React App + ReactMD app that has the following features:

- [\_everything.scss](./src/_everything.scss) to override the default `react-md` theme and feature toggles
- [RootLayout](./src/components/RootLayout.tsx) that initializes a base layout for the app
  - [MainNavigation](./src/components/MainNavigation.tsx) as an example navigation panel
- [rmdConfig](./src/rmdConfig.tsx) to configure icons and other global settings in `react-md`
- [prettier](https://prettier.io/) code formatting and automatically sort imports using [@trivago/prettier-plugin-sort-imports](https://github.com/trivago/prettier-plugin-sort-imports)
- a strict [@mlaursen/eslint-config](https://github.com/mlaursen/eslint-config)
- `@/` absolute imports using [vite-tsconfig-paths](https://www.npmjs.com/package/vite-tsconfig-paths)

## Scripts

- `test` - run tests with `vitest`
- `lint` - run `eslint` on all files
- `typecheck` - run `tsc -b --noEmit` to check for type errors
- `format` - format all files with prettier
  - `check-format` - check the format for all files (mostly for CI)
- `dev` - run the vite dev server
- `build` - build for production
- `preview` - run the production website in preview mode with `vite`
