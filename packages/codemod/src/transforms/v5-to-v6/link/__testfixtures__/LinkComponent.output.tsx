// TODO: The `ReactMDLink` component from react-md is using the `component` prop which is no longer supported. Use the `link` class name function to apply link styles to a custom component instead.
import { ReactElement } from "react";
import { render } from "react-dom";
import { Link as ReactMDLink } from "react-md";
import { LinkProps, Link as ReactRouterLink } from "react-router-dom";

function Link(props: LinkProps): ReactElement {
  return <ReactMDLink component={ReactRouterLink} {...props} />;
}

function App(): ReactElement {
  return (
    <div>
      <Link to="/">Home</Link>
      <Link to="/login">Login</Link>
    </div>
  );
}

render(<App />, document.getElementById("root"));
