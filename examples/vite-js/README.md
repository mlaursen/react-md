# ReactMD + Vite

This template provides a minimal setup to get ReactMD working in Vite with HMR and some ESLint rules.

## How to Use

Download the example:

```bash
curl https://codeload.github.com/mlaursen/react-md/tar.gz/next | tar -xz --strip=2 react-md-next/examples/vite-js
cd vite-js
```

Install it and run:

```sh
npm install
npm run dev
```

Finally, initialize the git repo and create your first commit:

```sh
git init
git add .
git commit -m "Initial commit"
```

or:

[![Edit on CodeSandbox](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/p/sandbox/github/mlaursen/react-md/tree/next/examples/vite-js)

[![Edit on StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/mlaursen/react-md/tree/next/examples/vite-js)

## What's Included

This example will setup an example Create React App + ReactMD app that has the following features:

- [\_everything.scss](./src/_everything.scss) to override the default `react-md` theme and feature toggles
- [RootLayout](./src/components/RootLayout.jsx) that initializes a base layout for the app
  - [MainNavigation](./src/components/MainNavigation.jsx) as an example navigation panel
- [rmdConfig](./src/rmdConfig.jsx) to configure icons and other global settings in `react-md`

## Vite

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript and enable type-aware lint rules. Check out the [TS template](https://github.com/mlaursen/react-md/next/examples/vite-ts) to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
