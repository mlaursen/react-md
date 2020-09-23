import React from "react";
import { Link as ReachLink } from "@reach/router";
import { render } from "@testing-library/react";
import { Link as ReactRouterLink, StaticRouter } from "react-router-dom";
import renderer from "react-test-renderer";

import { Link } from "../Link";

describe("Link", () => {
  it("should render correctly when there is no component prop", () => {
    expect(
      renderer.create(<Link href="#">Content</Link>).toJSON()
    ).toMatchSnapshot();
    expect(
      renderer.create(<Link href="">Disabled Link</Link>).toJSON()
    ).toMatchSnapshot();
    expect(
      renderer.create(<Link href="/direct-url">Direct url</Link>).toJSON()
    ).toMatchSnapshot();
  });

  it("should should render correctly when using react-router's Link component", () => {
    const create = ({
      children,
      ...props
    }: {
      children: React.ReactNode;
      [key: string]: any;
    }) =>
      renderer.create(
        <StaticRouter context={{}}>
          <Link {...props} component={ReactRouterLink}>
            {children}
          </Link>
        </StaticRouter>
      );

    expect(create({ children: "Content", to: "#" }).toJSON()).toMatchSnapshot();
    expect(
      create({ children: "Disabled Link", to: "" }).toJSON()
    ).toMatchSnapshot();
    expect(
      create({ children: "Direct url", to: "/direct-url" }).toJSON()
    ).toMatchSnapshot();
  });

  it("should should render correctly when using @reach/router's Link component", () => {
    expect(
      renderer.create(<ReachLink to="#">Content</ReachLink>).toJSON()
    ).toMatchSnapshot();
    expect(
      renderer.create(<ReachLink to="">Disabled Link</ReachLink>).toJSON()
    ).toMatchSnapshot();
    expect(
      renderer
        .create(<ReachLink to="/direct-url">Direct url</ReachLink>)
        .toJSON()
    ).toMatchSnapshot();
  });

  it("should automatically add noopener noreferrer when the target is blank and there is no rel prop", () => {
    const props = {
      href: "https://example.com",
      target: "_blank",
      children: "Link",
    };
    const { getByText, rerender } = render(<Link {...props} />);

    const link = getByText("Link");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");

    rerender(<Link {...props} rel="noopener" />);
    expect(link).toHaveAttribute("rel", "noopener");

    rerender(<Link {...props} preventMaliciousTarget={false} />);
    expect(link).not.toHaveAttribute("rel");
  });
});
