# @react-md/link

Create simple links from react-md with a customizable theme. The provided `Link`
component can easily integrate with
[react-router](https://github.com/ReactTraining/react-router),
[@reach/router](https://github.com/reach/router), and theoretically any other
routing library if needed.

This package also exports a great screen-reader and keyboard accessibility
helper: `SkipToMainContent` that will allow a user to immediately jump to the
main content of the page.

## Installation

```sh
npm install --save @react-md/link
```

It is also recommended to install the following packages to the full experience.

```sh
npm install --save @react-md/theme @react-md/typography
```

<!-- DOCS_REMOVE -->

## Documentation

You should check out the
[full documentation](https://react-md.dev/packages/link/demos) for live examples
and more customization information, but an example usage is shown below.

<!-- DOCS_REMOVE_END -->

## Usage

### Usage with react-router

```tsx
import React, { ReactElement } from "react";
import { render } from "react-dom";
import {
  Link as ReactRouterLink,
  LinkProps as ReactRouterLinkProps,
  BrowserRouter,
} from "react-router-dom";
import { Link as ReactMDLink, LinkProps as RMDLinkProps } from "@react-md/link";

export type LinkProps = RDMLinkProps & ReactRouterLinkProps;

function Link(props: linkProps): ReactElement {
  return <ReactMDLink {...props} component={ReactRouterLink} />;
}

function Home(): ReactElement {
  return <h1>Home page!</h1>;
}

function About(): ReactElement {
  return <h1>About page!</h1>;
}

function App(): ReactElement {
  return (
    <BrowserRouter>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>

      <Route exact path="/" component={Home} />
      <Route path="/about" component={About} />
    </BrowserRouter>
  );
}

render(<App />, document.getElementById("root"));
```

### SkipToMainContent

If you are using the `@react-md/layout` package, this component is already
built-in to help out! However, this component can also be used within full page
dialogs or custom screens to be able to jump to a specific element in the page.

```tsx
import React, { ReactElement } from "react";
import { render } from "react-dom";
import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogFooter,
} from "@react-md/dialog";
import { SkipToMainContent } from "@react-md/link";

const noop = (): void => {};

function App(): ReactElement {
  return (
    <Dialog
      id="full-page-dialog"
      aria-labelledby="full-page-dialog-title"
      visible
      onRequestClose={noop}
    >
      <DialogHeader>
        <SkipToMainContent mainId="full-page-dialog-content" />
        {/* pretend 100 focusable things before main content */}
      </DialogHeader>
      <DialogContent id="full-page-dialog-content">
        <p>Here is some content</p>
      </DialogContent>
    </Dialog>
  );
}

render(<App />, document.getElementById("root"));
```
