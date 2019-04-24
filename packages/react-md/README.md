# react-md

This package is kind of deprecated now as it is recommended to install each
scoped package within react-md instead. This package can be used for convenience
to import everything from a single namespace if you **really** trust dead code
elimination in your bundler.

## Installation

```sh
$ npm install --save react-md
```

## Usage

```tsx
import { Button, Text } from "react-md";

// use as normal
```

```scss
@import "react-md/dist/react-md";

@include react-md-everything;
```
