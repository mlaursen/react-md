## Super Quick Start

```sh
$ npx create-react-app my-app --scripts-version=@react-md/react-scripts
$ cd my-app
$ npm start
```

> npx comes with npm 5.2+ and higher, if you have an older version you will need
> to install `create-react-app` globally instead

or with [yarn][1]:

```sh
$ yarn create react-app my-app --scripts-version=@react-md/react-scripts
$ cd my-app
$ yarn start
```

> You can also add the `--typescript` flag to either command above to bootstrap
> with [Typescript][2] support.

## Quick Start

#### Install packages:

```sh
$ npm install --save @react-md/theme \
    @react-md/typography \
    @react-md/icon \
    @react-md/utils

# include any other react-md packages you'd like
```

#### Include react-md styles:

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

#### Include Font and optional material-icons font icons:

```diff
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />

+   <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons">
    <title>React App</title>
```

#### Use components:

```ts
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

[1]: [https://yarnpkg.com]

[2]: [https://www.typescriptlang.org]
