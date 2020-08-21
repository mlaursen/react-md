# @react-md/dialog

Create fully accessible dialogs that can span the entire page, centered within
the viewport, or positioned anywhere. The dialogs can also act as a modal so
that the user **must** press one of the actions to close the dialog instead of
closing by pressing the background overlay.

The main accessibility features and other features for dialogs are:

- automatically managing focus to and from the dialog when it mounts
- allowing a user key press the escape key to close the dialog
- applying the required roles and `aria-*` attributes
- adding additional prominence to the dialog with the `alertdialog` role as
  needed (see docs for this one)
- conditionally portaling the dialogs to help with overflow issues and other
  display errors
- disabling scroll for the main window while a dialog is visible

## Installation

```sh
npm install --save @react-md/dialog
```

This package also goes great with the following packages:

```sh
npm install --save @react-md/theme \
  @react-md/utils \
  @react-md/typography \
  @react-md/button \
  @react-md/app-bar
```

<!-- DOCS_REMOVE -->

## Documentation

You should check out the
[full documentation](https://react-md.dev/packages/dialog/demos) for live
examples and more customization information, but an example usage is shown
below.

<!-- DOCS_REMOVE_END -->

## Example

This package exports multiple components to create your dialog as well as a
context component for handling multiple dialogs at once within your page.

```tsx
import React from "react";
import { render } from "react-dom";
import { Button } from "@react-md/button";
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogContent,
  DialogFooter,
} from "@react-md/dialog";
import { useToggle } from "@react-md/utils";

const App = () => {
  return (
    <>
      <Button id="dialog-toggle" onClick={enable}>
        Show Dialog
      </Button>
      <Dialog
        id="main-dialog"
        visible={visible}
        onRequestClose={disable}
        aria-labelledby="main-dialog-title"
      >
        <DialogHeader>
          <DialogTitle id="main-dialog-title">My Dialog</DialogTitle>
        </DialogHeader>
        <DialogContent>This is some content.</DialogContent>
        <DialogFooter>
          <Button id="main-dialog-close" onClick={disable}>
            Close
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};

render(<App />, document.getElementById("root"));
```
