# mlaursen-nextjs

This is a minimal boilerplate for `mlaursen` to spin up React Next.js apps.
This project requires [volta] to manage the `node` and
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

## What's Included

This example will setup an example Create React App + ReactMD app that has the following features:

- [\_everything.scss](./_everything.scss) to override the default `react-md` theme and feature toggles
- [RootLayout](./src/components/RootLayout.tsx) that initializes a base layout for the app
  - [MainNavigation](./src/components/MainNavigation.tsx) as an example navigation panel
- [rmdConfig](./src/rmdConfig.tsx) to configure icons and other global settings in `react-md`
- [test-utils](./src/test-utils.tsx) to render tests with all providers
- [prettier] code formatting and automatically sort imports using [@trivago/prettier-plugin-sort-imports]
- a strict [@mlaursen/eslint-config]
- `@/` absolute imports using [tsconfig paths](./tsconfig.json#L27-L29)

## Commands

- `format` - format all files with [prettier]
- `lint` - run [eslint] on all typescript and javascript files using
  [@mlaursen/eslint-config]
  - Note: strict eslint rules
- `typecheck` - run `tsc --noEmit` on the project
  - Note: strict rules enforced
- `dev` - start the development server with [next]
- `test` - run tests with [jest]
- `build` - build the app for production
- `start` - run the production build
- `start-static` - run the production build using [serve]

[volta]: https://volta.sh/
[eslint]: https://github.com/eslint/eslint
[next]: https://nextjs.org/
[prettier]: https://prettier.io
[serve]: https://www.npmjs.com/package/serve
[jest]: https://jestjs.io
[@mlaursen/eslint-config]: https://github.com/mlaursen/eslint-config
[@trivago/prettier-plugin-sort-imports]: https://github.com/trivago/prettier-plugin-sort-imports
