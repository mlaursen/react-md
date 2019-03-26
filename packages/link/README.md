# @react-md/link

Create simple links from react-md with a customizable theme. The provided `Link`
component can easily integrate with
[react-router](https://github.com/ReactTraining/react-router),
[@reach/router](https://github.com/reach/router), and theoretically any other
routing library if needed.

## Installation

```sh
$ npm install --save @react-md/link
```

It is also recommended to install the following packages to the full experience.

```sh
$ npm install --save @react-md/theme @react-md/typography
```

<!-- DOCS_REMOVE -->

## Documentation

You should check out the
[full documentation](https://react-md.dev/packages/link) for live examples and
more customization information, but an example usage is shown below.

<!-- DOCS_REMOVE_END -->

<!-- INCLUDING_STYLES -->

## Usage with react-router

```ts
import React, { FunctionComponent } from "react";
import { render } from "react-dom";
import {
  Link as ReactRouterLink,
  LinkProps as ReactRouterLinkProps,
  BrowserRouter,
} from "react-router-dom";
import { Link as ReactMDLink, LinkProps as RMDLinkProps } from "@react-md/link";

export type LinkProps = RDMLinkProps & ReactRouterLinkProps;

const Link: FunctionComponent<LinkProps> = props => (
  <ReactMDLink {...props} component={ReactRouterLink} />
);

const Home = () => <h1>Home page!</h1>;
const About = () => <h1>About page!</h1>;

const App = () => (
  <BrowserRouter>
    <Link to="/">Home</Link>
    <Link to="/about">About</Link>

    <Route exact path="/" component={Home} />
    <Route path="/about" component={About} />
  </BrowserRouter>
);

render(<App />, document.getElementById("root"));
```
