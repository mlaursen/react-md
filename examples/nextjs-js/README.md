# ReactMD + Next.js

This template provides a minimal setup to get ReactMD working in
[Next.js](https://nextjs.org) and some ESLint rules bootstrapped with
[`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## How to Use

Download the example:

```bash
curl https://codeload.github.com/mlaursen/react-md/tar.gz/next | tar -xz --strip=2 react-md-next/examples/nextjs-js
cd nextjs-js
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

[![Edit on CodeSandbox](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/p/sandbox/github/mlaursen/react-md/tree/next/examples/nextjs-js)

[![Edit on StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/mlaursen/react-md/tree/next/examples/nextjs-js)

## What's Included

This example will setup an example Create React App + ReactMD app that has the following features:

- [\_everything.scss](./_everything.scss) to override the default `react-md` theme and feature toggles
- [RootLayout](./src/components/RootLayout.js) that initializes a base layout for the app
  - [MainNavigation](./src/components/MainNavigation.js) as an example navigation panel
- [rmdConfig](./src/rmdConfig.js) to configure icons and other global settings in `react-md`

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load Roboto.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!
