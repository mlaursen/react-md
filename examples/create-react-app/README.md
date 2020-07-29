# ReactMD and Create React App Example

This project was bootstrapped with
[Create React App](https://github.com/facebook/create-react-app) using
[react-md](https://react-md.dev) as the component library.

## What's Included

This example will setup an example Next.js + react-md app that has the following
features:

- [jsconfig.json](./jsconfig.json) to allow absolute imports instead of relative
  imports from the `"src"` directory
  - `import MyComponent from "components/MyComponent"` instead of
    `import MyComponent from "../../components/MyComponent"`
- [\_variables.scss](./src/_variables.scss) to override the default `react-md`
  theme and feature toggles
- a reusable [Layout.jsx](./src/components/Layout/Layout.jsx) that:
  - updates all the icons to use `SVGIcon`s instead of `FontIcon`s
  - initializes the `Layout` component from `react-md` with navigation items
  - uses [react-router-dom](https://www.npmjs.com/package/react-router-dom) as
    the routing library

## How to Use

Since this example is not a separate repo, this example will need to be manually
downloaded instead of using `create-react-app`:

```bash
curl https://codeload.github.com/mlaursen/react-md/tar.gz/master | tar -xz --strip=2 react-md-master/examples/create-react-app
cd create-react-app
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
- [Create React App Documentation](https://create-react-app.dev/)

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br /> Open
[http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br /> You will also see any lint errors
in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br /> See the section
about
[running tests](https://facebook.github.io/create-react-app/docs/running-tests)
for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br /> It correctly bundles
React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br /> Your app is
ready to be deployed!

See the section about
[deployment](https://facebook.github.io/create-react-app/docs/deployment) for
more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can
`eject` at any time. This command will remove the single build dependency from
your project.

Instead, it will copy all the configuration files and the transitive
dependencies (webpack, Babel, ESLint, etc) right into your project so you have
full control over them. All of the commands except `eject` will still work, but
they will point to the copied scripts so you can tweak them. At this point
you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for
small and middle deployments, and you shouldn’t feel obligated to use this
feature. However we understand that this tool wouldn’t be useful if you couldn’t
customize it when you are ready for it.

## Learn More

You can learn more in the
[Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here:
https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here:
https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here:
https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here:
https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here:
https://facebook.github.io/create-react-app/docs/deployment

### `yarn build` fails to minify

This section has moved here:
https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
