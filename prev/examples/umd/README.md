# ReactMD with UMD

This is a simple example of how you can use the UMD bundles from React,
ReactDOM, and ReactMD.

## What's Included

A super simple `index.html` file that:

- loads the Material Icons and Roboto fonts
- loads the `React`, `ReactDOM`, and `ReactMD` UMD bundles
- creates a simple [index.html](./index.html) that uses the `TextContainer` and
  `Typography` components from `ReactMD`

## How to Use

First download the example (or just copy/paste the [index.html](./index.html)):

```bash
curl https://codeload.github.com/mlaursen/react-md/tar.gz/main | tar -xz --strip=2 react-md-main/examples/umd
cd umd
```

Next, open the file by double clicking or running the following command in the
command line:

```sh
open index.html
```

Finally, manually update the `index.html` with changes in the final `<script>`
tag and reload the browser to see changes.

## Learn More

This example is really just a way to showcase the UMD bundles and pre-compiled
themes using CDNs. You'll normally use something like
[webpack externals](https://webpack.js.org/configuration/externals/) if you want
to use the UMD version instead of a manual `index.html` file above., but this
can be used for some code websites like [codepen.io](https://codepen.io).

You can always learn more about ReactMD from the main
[documentation website](https://react-md.dev).
