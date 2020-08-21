# @react-md/expansion-panel

Expansion panels are used to create disclosure widgets that show additional
information once the component has been toggled to an "open" state. In other
words, expansion panels are a styled version of a
[details](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details)
element.

An expansion panel can be rendered standalone or within a group with the
`ExpansionList` component and `usePanels` hook.

## Installation

```sh
npm install --save @react-md/expansion-panel
```

This package is not super helpful on its own, so it is recommended to also
install the following packages:

```sh
npm install --save @react-md/theme \
  @react-md/typography \
  @react-md/list \
  @react-md/icon
```

<!-- DOCS_REMOVE -->

## Documentation

You should check out the
[full documentation](https://react-md.dev/packages/expansion-panel/demos) for
live examples and more customization information, but an example usage is shown
below.

<!-- DOCS_REMOVE_END -->

## Usage

Expansion panels are normally rendered within a list of two or more panels. To
create such a list, you'll want to use the `ExpansionList` and `ExpansionPanel`
components and `usePanels` hook:

```tsx
import React from "react";
import { render } from "react-dom";
import {
  ExpansionList,
  ExpansionPanel,
  usePanels,
} from "@react-md/expansion-panel";

const App = () => {
  const [panels, onKeyDown] = usePanels({
    count: 3,
    idPrefix: "my-panel-group",
  });

  const [panel1Props, panel2Props, panel3Props] = panels;

  return (
    <main>
      <ExpansionList onKeyDown={onKeyDown}>
        <ExpansionPanel {...panel1Props} headerChildren="Panel 1">
          Panel 1 contents...
        </ExpansionPanel>
        <ExpansionPanel {...panel2Props} headerChildren={<span>Panel 2</span>}>
          Panel 2 contents...
        </ExpansionPanel>
        <ExpansionPanel {...panel3Props} headerChildren="Panel 1">
          Panel 3 contents...
        </ExpansionPanel>
      </ExpansionList>
    </main>
  );
};

render(<App />, document.getElementById("root"));
```
