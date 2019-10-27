# Including Styles Without Webpack

Something you might've noticed is that all the `@import` statements start with a
tilde (`~`) character. This allows webpack to resolve files that are found
within the `node_modules` folder. However, if you aren't using webpack and are
using one of the other [Sass compilers](https://sass-lang.com/install) you'll
get a great error:

`src/styles.scss`

```scss
@import "~react-md/dist/react-md";

@include react-md-utils;
```

```sh
$ npx node-sass src/styles.scss src/styles.css
{
  "status": 1,
  "file": "<<REDACTED>>/src/styles.scss",
  "line": 1,
  "column": 1,
  "message": "File to import not found or unreadable: ~react-md/dist/react-md.",
  "formatted": "Error: File to import not found or unreadable: ~react-md/dist/react-md.\n        on line 1 of src/styles.scss\n>> @import '~react-md/dist/react-md';\n\n   ^\n"
}
```

This is because the tilde (`~`) character is webpack specific. Luckily there is
a way to compile without webpack!

## Switching to the non-webpack exports

The first step we'll need to take is to switch from the webpack SCSS exports to
the "general" exports. This can be done by just referencing the `.scss` files in
the `dist/scss` folder instead of just `dist`:

```diff
-@import "~react-md/dist/react-md";
+@import "react-md/dist/scss/react-md";

 @include react-md-utils;
```

When we try to compile again, we'll actually get another similar error:

```sh
$ npx node-sass src/styles.scss src/styles.css
{
  "status": 1,
  "file": "<<REDACTED>>/src/styles.scss",
  "line": 1,
  "column": 1,
  "message": "File to import not found or unreadable: react-md/dist/scss/react-md.",
  "formatted": "Error: File to import not found or unreadable: react-md/dist/scss/react-md.\n        on line 1 of src/styles.scss\n>> @import 'react-md/dist/scss/react-md';\n\n   ^\n"
}
```

This error occurred because `react-md` imports styles from all the
[scoped packages](/guides/scoped-packages) and needs to be updated to look for
these styles. So let's try it one more time by using the
[include-path](https://github.com/sass/node-sass#command-line-interface) option:

```sh
$ npx node-sass --include-path=node_modules src/styles.scss src/styles.css
Rendering Complete, saving .css file...
Wrote CSS to <<REDACTED>>/src/styles.css
```

Woohoo! All done. So if you want to compile with something like
[dart-sass](https://sass-lang.com/dart-sass) or just outside of webpack, you'll
want to:

1. Update the imports to no longer have a leading tilde (`~`)
2. Update the imports to come from the `dist/scss` folder instead of just `dist`
3. Add the `include-path` option to include `node_modules`
