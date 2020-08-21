# @react-md/app-bar

This package is used to create a top-level fixed app bar in your application to
display some sort of navigation button like a hamburger menu, your app title
and/or logo, as well as any top-level actions for your app. You can also use
this component to create toolbars or other header elements for different
sections of your app.

## Installation

```sh
npm install --save @react-md/app-bar
```

It is generally recommended to also install the following packages since they
work hand-in-hand with this package:

```sh
npm install --save @react-md/theme \
  @react-md/typography \
  @react-md/button \
  @react-md/icon
```

<!-- DOCS_REMOVE -->

## Documentation

You should check out the
[full documentation](https://react-md.dev/packages/app-bar/demos) for live
examples and more customization information, but an example usage is shown
below.

<!-- DOCS_REMOVE_END -->

## Usage

The primary use of this package is to create a fixed header that includes your
app's logo, title, mobile navigation, or common actions. Here's a quick example:

```tsx
import React from "react";
import { render } from "react-dom";
import {
  AppBar,
  AppBarTitle,
  AppBarNav,
  AppBarAction,
  APP_BAR_OFFSET_CLASSNAME,
} from "@react-md/app-bar";
import { MenuSVGIcon, SearchSVGIcon } from "@react-md/material-icons";

const App = () => {
  const mobile = window.innerWidth < 600;

  return (
    <>
      <AppBar id="main-app-bar" fixed>
        {mobile && (
          <AppBarNav id="main-mobile-navigation" aria-label="Mobile navigation">
            <MenuSVGIcon />
          </AppBarNav>
        )}
        {<AppBarTitle keyline={!mobile}>My Company's Name</AppBarTitle>}
        <AppBarAction id="search" aria-label="Search">
          <SearchSVGIcon />
        </AppBarAction>
      </AppBar>
      <main className={APP_BAR_OFFSET_CLASSNAME}>
        <h3>Hello, world!</h3>
      </main>
    </>
  );
};

render(<App />, document.getElementById("root"));
```
