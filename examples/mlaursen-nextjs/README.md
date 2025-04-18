# mlaursen-nextjs

This is a minimal boilerplate for `mlaursen` to spin up React Next.js apps.
This project requires [volta](https://volta.sh/) to manage the `node` and
`pnpm` versions.

## How to Use

Download the example:

```bash
curl https://codeload.github.com/mlaursen/react-md/tar.gz/next | tar -xz --strip=2 react-md-next/examples/mlaursen-nextjs
cd mlaursen-nextjs
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

[![Edit on CodeSandbox](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/p/sandbox/github/mlaursen/react-md/tree/next/examples/mlaursen-nextjs)

[![Edit on StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/mlaursen/react-md/tree/next/examples/mlaursen-nextjs)

## What's Included

This example will setup an example Create React App + ReactMD app that has the following features:

- [\_everything.scss](./_everything.scss) to override the default `react-md` theme and feature toggles
- [RootLayout](./src/components/RootLayout.tsx) that initializes a base layout for the app
  - [MainNavigation](./src/components/MainNavigation.tsx) as an example navigation panel
- [rmdConfig](./src/rmdConfig.tsx) to configure icons and other global settings in `react-md`
- [prettier](https://prettier.io/) code formatting and automatically sort imports using [@trivago/prettier-plugin-sort-imports](https://github.com/trivago/prettier-plugin-sort-imports)
- a strict [@mlaursen/eslint-config](https://github.com/mlaursen/eslint-config)
- `@/` absolute imports using [vite-tsconfig-paths](https://www.npmjs.com/package/vite-tsconfig-paths)

## Commands

- `format` - format all files with [prettier]
- `lint` - run [eslint] on all typescript and javascript files using
  [@mlaursen/eslint-config]
  - Note: strict eslint rules
- `typecheck` - run `tsc --noEmit` on the project
  - Note: strict rules enforced
- `dev` - start the development server with [next]
- `build` - build the app for production
- `start` - run the production build
- `start-static` - run the production build using [serve]

## Installation

```sh
pnpm i
# optional
pnpm exec playwright install --with-deps
```

## Github Actions

- [main](./.github/workflows/main.yml) - The main workflow that handles
  continuous integration and deployment.
  - Pull Requests
    - Prevent errors by running `pnpm lint` and `pnpm typecheck`
    - Build the website
    - Run [Playwright] end-to-end tests against a local build with Chrome and
      Firefox
  - New commits/merges into `main`
    - Prevent errors by running `pnpm lint` and `pnpm typecheck`
    - Build and deploy the website to <https://mlaursen.com>
    - Run [Playwright] end-to-end tests against the newly deployed code with Chrome
      and Firefox
- [codeql_analysis.yml](./.github/workflows/codeql_analysis.yml) - check for
  security issues in code

[eslint]: https://github.com/eslint/eslint
[next]: https://nextjs.org/
[playwright]: https://playwright.dev/
[prettier]: https://prettier.io
[serve]: https://www.npmjs.com/package/serve
[@mlaursen/eslint-config]: https://github.com/mlaursen/eslint-config
