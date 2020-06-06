You can also render the `Link` component using a third-party link/routing
library. Popular examples are:

- [react-router](https://github.com/ReactTraining/react-router)
- [@reach/router](https://github.com/reach/router)
- [next.js][1]

Since this documentation site is using [next.js][1], I won't have a live example
here for using `react-router`, but you can view the source code or open the code
sandbox link to see how other libraries can work with it.

If you are using `react-router`, you can use the `component` prop to render as
the `Link` from `react-router` and provide all the `react-router` link specific
props into the react-md `Link`:

```tsx
import React, { FC } from "react";
import { render } from "react-dom";
import { Link as ReactRouterLink, LinkProps } from "react-router";
import { Link as ReactMDLink } from "@react-md/link";

const Link: FC<LinkProps> = (props) => (
  <ReactMDLink component={ReactRouterLink} {...props} />
);

const App = () => (
  <div>
    <Link to="/">Home</Link>
    <Link to="/login">Login</Link>
  </div>
);

render(<App />, document.getElementById("root"));
```

[1]: https://nextjs.org/docs/#with-link
