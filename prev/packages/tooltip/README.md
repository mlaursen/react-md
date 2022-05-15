# @react-md/tooltip

Create accessible tooltips to add additional descriptions to buttons, links, or
any other element. The tooltips will automatically attempt to position
themselves within the viewport and adjust as needed.

## Installation

```sh
npm install --save @react-md/tooltip
```

It is also recommended to install the following packages as they work
hand-in-hand with this package:

```sh
npm install --save @react-md/theme \
  @react-md/button
```

<!-- DOCS_REMOVE -->

## Documentation

You should check out the
[full documentation](https://react-md.dev/packages/tooltip/demos) for live
examples and more customization information, but an example usage is shown
below.

<!-- DOCS_REMOVE_END -->

## Usage

```tsx
import { render } from "react-dom";
import { Button } from "@react-md/button";
import { Tooltip, useTooltip } from "@react-md/tooltip";

function App() {
  const { elementProps, tooltipProps } = useTooltip({
    baseId: "button-id",
    onClick(event) {
      // an optional click handler for the button
    },
  });

  return (
    <>
      <Button {...elementProps}>Button Text</Button>
      <Tooltip {...tooltipProps}>I am a tooltip</Tooltip>
    </>
  );
}

render(<App />, document.getElementById("root"));
```
