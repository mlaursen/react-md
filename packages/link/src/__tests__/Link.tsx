import { Link as ReachLink } from "@reach/router";
import { render } from "@testing-library/react";
import { Link as ReactRouterLink } from "react-router-dom";
import { StaticRouter } from "react-router-dom/server";

import { Link } from "../Link";

describe("Link", () => {
  it("should render correctly when there is no component prop", () => {
    const { container, rerender } = render(<Link href="#">Content</Link>);
    expect(container).toMatchSnapshot();

    rerender(<Link href="">Disabled Link</Link>);
    expect(container).toMatchSnapshot();

    rerender(<Link href="/direct-url">Direct url</Link>);
    expect(container).toMatchSnapshot();
  });

  it("should should render correctly when using react-router's Link component", () => {
    const { container, rerender } = render(
      <Link component={ReactRouterLink} href="#">
        Content
      </Link>,
      {
        wrapper: function Wrapper({ children }) {
          return <StaticRouter location="/">{children}</StaticRouter>;
        },
      }
    );

    expect(container).toMatchSnapshot();

    rerender(
      <Link component={ReactRouterLink} href="">
        Disabled Link
      </Link>
    );
    expect(container).toMatchSnapshot();

    rerender(
      <Link component={ReactRouterLink} href="/direct-url">
        Direct url
      </Link>
    );
    expect(container).toMatchSnapshot();
  });

  it("should should render correctly when using @reach/router's Link component", () => {
    const { container, rerender } = render(
      <Link component={ReachLink} to="#">
        Content
      </Link>
    );
    expect(container).toMatchSnapshot();

    rerender(
      <Link component={ReachLink} href="">
        Disabled Link
      </Link>
    );
    expect(container).toMatchSnapshot();

    rerender(
      <Link component={ReachLink} href="/direct-url">
        Direct url
      </Link>
    );
    expect(container).toMatchSnapshot();
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
