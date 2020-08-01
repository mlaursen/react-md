# ReactMD, Gatsby, and Typescript Example

This is a [Gatsby](https://www.gatsbyjs.org/) project using
[react-md](https://react-md.dev) as the component library.

## What's Included

This example will setup an example Gatsby + ReactMD app that has the following
features:

- [\_variables.scss](./src/styles/_variables.scss) to override the default
  `react-md` theme and feature toggles
- [gatsby-browser.js](./gatsby-browser.js) to import global `react-md` styles
  and the Roboto font
- [gatsby-config.js](./gatsby-config.js) with plugins to support sass and a
  global layout
- a reusable [Layout.jsx](./src/components/Layout/Layout.jsx) that:
  - updates all the icons to use `SVGIcon`s instead of `FontIcon`s
  - initializes the `Layout` component from `react-md` with navigation items
- a simple [robots.txt](./static/robots.txt)

> Note: The `Layout` and `LinkUnstyled` are `.jsx` instead of `.tsx` since I
> don't know how to get `gatsby-plugin-layout` to work with `.tsx` extensions. I
> would really appreciate a PR to fix this.

## How to Use

Since this example is not in a separate repo, the Gatsby CLI cannot be used to create a new project
based on example and will need to be downloaded manually:

```bash
curl https://codeload.github.com/mlaursen/react-md/tar.gz/master | tar -xz --strip=2 react-md-master/examples/gatsby
cd gatsby
```

Install it and run:

```sh
npm install
npm run develop
# or
yarn
yarn develop
```

Finally, initialize the git repo and create your first commit:

```sh
git init
git add .
git commit -m "Initial commit"
```

## Learn More

To learn more about react-md and Gatsby, take a look at the following resources:

- [react-md Documentation](https://react-md.dev)
- [Configuring your Layout](https://react-md.dev/guides/configuring-your-layout)
- [Gatsby Documentation](https://www.gatsbyjs.org/docs/)
