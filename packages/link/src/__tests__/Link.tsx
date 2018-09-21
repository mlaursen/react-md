import * as React from "react";
import { StaticRouter, Link as RRLink } from "react-router-dom";
import { Link as ReachLink } from "@reach/router";
import * as renderer from "react-test-renderer";

import Link from "../Link";

describe("Link", () => {
  it("should render correctly when there is no component prop", () => {
    expect(renderer.create(<Link href="#">Content</Link>).toJSON()).toMatchSnapshot();
    expect(renderer.create(<Link href="">Disabled Link</Link>).toJSON()).toMatchSnapshot();
    expect(renderer.create(<Link href="/direct-url">Direct url</Link>).toJSON()).toMatchSnapshot();
  });

  it("should should render correctly when using react-router's Link component", () => {
    const create = ({ children, ...props }) =>
      renderer.create(
        <StaticRouter context={{}}>
          <Link {...props} component={RRLink}>
            {children}
          </Link>
        </StaticRouter>
      );

    expect(create({ children: "Content", to: "#" }).toJSON()).toMatchSnapshot();
    expect(create({ children: "Disabled Link", to: "" }).toJSON()).toMatchSnapshot();
    expect(create({ children: "Direct url", to: "/direct-url" }).toJSON()).toMatchSnapshot();
  });

  it("should should render correctly when using @reach/router's Link component", () => {
    const create = ({ children, ...props }) =>
      renderer.create(
        <StaticRouter context={{}}>
          <Link {...props} component={RRLink}>
            {children}
          </Link>
        </StaticRouter>
      );

    expect(renderer.create(<ReachLink to="#">Content</ReachLink>).toJSON()).toMatchSnapshot();
    expect(renderer.create(<ReachLink to="">Disabled Link</ReachLink>).toJSON()).toMatchSnapshot();
    expect(
      renderer.create(<ReachLink to="/direct-url">Direct url</ReachLink>).toJSON()
    ).toMatchSnapshot();
  });
});
