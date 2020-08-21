# @react-md/transition

Create simple CSS transitions using the provided transition hooks and components
utilizing the default transition timing functions. This package also provides a
collapse transition, scaling transition, vertical only scaling transition, and a
new page transition named cross fade.

Provided components and hooks:

- `Collapse` or `useCollapse` - transition an element in and out of view based
  on the height of the element
- `CrossFade` or `useCrossFade` - a transition generally used for a full page
  transition that fades and slightly moves a child component into view
- `ScaleTransition` - transition an element in and out of view with a `scale`
  transform that can be updated to just be `scaleY`
- `useTransition` - a hook implementation of the `Transition` component from
  `react-transition-group`
- `useCSSTransition` -a hook implementation of the `CSSTransition` component
  from `react-transition-group`
- `useFixedPositioning` - hooks into the `CSSTransition` component from
  `react-transition-group` to fix an element to another element within the
  viewport

The `rmd-transition-shadow-transition` mixin allows you to "performantly"
transition between two box shadow values using the
[opacity trick](http://tobiasahlin.com/blog/how-to-animate-box-shadow/). This
mixin automatically creates a pseudo `::before` or `::after` element with the
final box shadow and animates the opacity once one of the `$active-selectors`
are triggered. The code below will help explain this part a bit more.

## Installation

```sh
npm install --save @react-md/transition
```

It is also recommended to install the following packages as they work
hand-in-hand with this package:

```sh
npm install --save @react-md/theme \
  @react-md/utils
```

<!-- DOCS_REMOVE -->

## Documentation

You should check out the
[full documentation](https://react-md.dev/packages/transition/demos) for live
examples and more customization information, but an example usage is shown
below.

<!-- DOCS_REMOVE_END -->

## Usage

```tsx
import React, { useState } from "react";
import { render } from "react-dom";
import { Button } from "@react-md/button";
import { Collapse } from "@react-md/transition";

const App = () => {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <>
      <Button onClick={() => setCollapsed(!collapsed)}>Toggle</Button>
      <Collapse collapsed={collapsed}>
        <div>This is my collapsible content!</div>
      </Collapse>
    </>
  );
};

render(<App />, document.getElementById("root"));
```
