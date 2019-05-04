## Quick Start

If you have an existing app that you'd like to migrate `react-md` into, here are
the quick steps. If you use [create-react-app], I recommend checking out
[this documentation](/getting-started/updating-create-react-app) instead.

#### Using convenience react-md package

There is a base `react-md` package that combines all the packages within
react-md as one import for convenience. To use this package, follow these steps:

##### Install:

```sh
$ npm install --save react-md
```

##### Include styles:

```scss
// src/app.scss

@import "react-md";

@include react-md-utils;
```

> This requires your `SASS_PATH=node_modules` or the `includePaths` value to be
> set. See the
> [Updating sass include paths](/getting-started/installation#updating-sass-include-paths)
> documentation for more info.

##### Include fonts and optional material-icons font icons:

```diff
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />

+   <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons">
    <title>React App</title>
```

##### Use components:

```tsx
import React from "react";
import { render } from "react-dom";
import { Button, Text, TextContainer } from "react-md";"

import "./app.scss"

const App = () => (
  <TextContainer>
    <Text type="headline-1">Example</Text>
    <Button id="example-button">Button</Button>
  </TextContainer>
);

render(<App />, document.getElementById("root"));
```

#### Using scoped packages

If you don't want to have to use the entire `react-md` library for your app, you
can also use the scoped packages that are provided. The steps are almost the
same as the convenience `react-md` package, but there are a few more steps.

##### Install:

```sh
$ npm install --save @react-md/theme \
    @react-md/typography \
    @react-md/icon \
    @react-md/utils

# include any other react-md packages you'd like
```

##### Include styles:

```scss
// src/app.scss

// import react-md styles
@import "@react-md/icon/dist/mixins";
@import "@react-md/theme/dist/mixins";
@import "@react-md/typography/dist/mixins";
@import "@react-md/utils/dist/mixins";

// generate all the styles for packages that have been imported from react-md
@include react-md-utils;
```

> NOTE: You'll need to ensure the `SASS_PATH` environment variable is set to
> include `node_modules` or update the sass compiler's `includePaths` to include
> `node_modules`. See
> [updating sass include paths](/getting-started/installation#updating-sass-include-paths)
> for more info.

##### Include font and optional material-icons font icons:

```diff
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />

+   <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons">
    <title>React App</title>
```

##### Use components:

```tsx
// src/index.tsx
import React from "react";
import { render } from "react-dom";
import { TextContainer, Text } from "@react-md/typography";

import "./app.scss";
const App = () => (
  <TextContainer>
    <Text type="headline-1">Hello, world</Text>
  </TextContainer>
);

render(<App />, document.getElementById("root"));
```

### Where to go next

You should now be good to start creating your React app using `react-md`'s
components and styles. Here are some helpful links for where to go next:

#### Installation Deep Dive

This is a deep dive of installing react-md that will go into the nitty-gritty
details such as:

- Package File Structure
- Using the UMD Bundles / pre-compiled styles
- Including Styles
- Including Fonts

[Navigate](installation)

#### Updating create-react-app

If you use `create-react-app`, the link above will describe how to

### Usage

You should now be good to create your app using `react-md`'s styles and
components! If you'd like more of a full dive into installing `react-md` to get
an understanding of the included files, published structure, and naming
conventions, check out the [installation](/getting-started/installation) page.
Otherwise, start looking at each package's documentation page. For convenience,
I have listed them all below:

[create-react-app]: https://github.com/facebook/create-react-app
[yarn]: https://yarnpkg.com
[typescript]: https://www.typescriptlang.org
