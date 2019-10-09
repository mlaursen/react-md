## Adding a Sass stylesheet

The following steps have been taken directly from the
[adding a Sass stylesheet](https://facebook.github.io/create-react-app/docs/adding-a-sass-stylesheet),
but have been modified a bit to ensure that it works with `react-md`.

To use Sass with `react-md`, first install `node-sass`:

```sh
$ npm install --save-dev node-sass
```

Now that `node-sass` has been installed, you can rename the following files:

- `src/App.css -> src/App.scss`
- `src/index.css -> src.index.scss`

Once they have been renamed, make sure to update both `src/App.jsx` and
`src/index.jsx` to point to the `App.scss` and `index.scss` instead of their
`.css` counterparts so they can be processed by Sass.

Next, update your base `.env` file to add a new environment variable:

```sh
SASS_PATH=node_modules:src
```

This will allow all the imports from `react-md` to work as they rely on the
`node_modules` being included in the path. So now you can import `react-md`
files without the need for a `~`:

```scss
@import "~@react-md/theme/dist/color-palette";
@import "~@react-md/theme/dist/mixins";
```

## Defining your theme

Now that `react-md` styles can be correctly imported, it is generally helpful to
create a variables file that contains common variables (like theming/branding)
to use throughout your app. Create a `src/_variables.scss`:

```scss
@import "~@react-md/theme/dist/color-palette";

// any theme changes you'd like to make
$rmd-theme-primary: $rmd-blue-500;
$rmd-theme-secondary: $rmd-pink-a-400;

// any custom branding variables or react-md variable overrides
```

You can now import this `variables` file into _any_ of your `.scss` files to
have access to your custom theme and branding.

For a good example, let's pretend like your app has grown and you have a SCSS
file at `src/components/SomeComponent/SomeComponent.scss`. You can import these
variables just with:

```scss
@import "variables";

// use variables as needed.
```

## Including react-md styles

Now that your variables file has been created along with your `react-md` theme
variables, let's generate all the styles for your app. Update `src/index.scss`:

> If you have not done so already, please read the
> [SCSS Naming Paradigm](/getting-started/installation#scss-naming-paradigm) for
> a better understanding of SCSS file names and `react-md` naming schemes.

```diff
-body {
-  margin: 0;
-  padding: 0;
-  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
-    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
-    sans-serif;
-  -webkit-font-smoothing: antialiased;
-  -moz-osx-font-smoothing: grayscale;
-}
-
-code {
-  font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New",
-    monospace;
-}
+// import your variables
+@import 'variables';
+
+// import all your installed react-md packages
+@import '~@react-md/app-bar/dist/app-bar';
+@import '~@react-md/avatar/dist/avatar';
+@import '~@react-md/button/dist/button';
+@import '~@react-md/layout/dist/layout';
+// .. other imports ...
+@import '~@react-md/utils/dist/utils';
+
+// this mixin will automatically include all the styles of imported
+// react-md packages for you
+@include react-md-utils;
```

That's it! Your app should now have all the styles included and you can start
using the provided React components throughout your app.
