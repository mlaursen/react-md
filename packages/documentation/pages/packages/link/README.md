## @react-md/link

Create simple links from react-md with a customizable theme. The provided `Link`
component can easily integrate with
[react-router](https://github.com/ReactTraining/react-router),
[@reach/router](https://github.com/reach/router), and theoretically any other
routing library if needed.

### Installation

```sh
$ npm install --save @react-md/link
```

It is also recommended to install the following packages to the full experience.

```sh
$ npm install --save @react-md/theme @react-md/typography
```

### Including Styles

> If you have not done so already, please read the main documentation about
> #including-styles before continuing.

### Usage with react-router

```tsx
import React, { FunctionComponent } from "react";
import { Link as ReactRouterLink, LinkProps } from "react-router-dom";
import { Link as ReactMDLink, ILinkProps } from "@react-md/link";

const Link: FunctionComponent<ILinkProps & LinkProps> = props => (
  <ReactMDLink {...props} component={ReactRouterLink} />
);

export default Link;
```

```tsx
import React from "react";
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";

import Link from "./Link";

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
