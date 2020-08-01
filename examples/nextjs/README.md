# ReactMD and Next.js Example

This is a [Next.js](https://nextjs.org/) project bootstrapped with
[`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app)
using [react-md](https://react-md.dev) as the component library.

## What's Included

This example will setup an example Next.js + ReactMD app that has the following
features:

- [jsconfig.json](./jsconfig.json) to allow absolute imports instead of relative
  imports from the `"src"` directory
  - `import MyComponent from "components/MyComponent"` instead of
    `import MyComponent from "../../components/MyComponent"`
- [\_variables.scss](./src/_variables.scss) to override the default `react-md`
  theme and feature toggles
- a custom [\_app.jsx](./src/pages/_app.jsx) that imports the Roboto font from
  [Google Fonts](https://fonts.google.com)
- a reusable [Layout.jsx](./src/components/Layout/Layout.jsx) that:
  - updates all the icons to use `SVGIcon`s instead of `FontIcon`s
  - initializes the `Layout` component from `react-md` with navigation items
- a simple [robots.txt](./public/robots.txt)

## How to Use

Since this example is not within the Next.js repo, you will need to download
this example manually instead of using `create-next-app`:

```bash
curl https://codeload.github.com/mlaursen/react-md/tar.gz/master | tar -xz --strip=2 react-md-master/examples/nextjs
cd nextjs
```

Install it and run:

```sh
npm install
npm run dev
# or
yarn
yarn dev
```

Finally, initialize the git repo and create your first commit:

```sh
git init
git add .
git commit -m "Initial commit"
```

## Learn More

To learn more about react-md and Next.js, take a look at the following
resources:

- [react-md Documentation](https://react-md.dev)
- [Configuring your Layout](https://react-md.dev/guides/configuring-your-layout)
- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js
  features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
