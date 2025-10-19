import { type HTMLAttributes, type ReactElement, forwardRef } from "react";
import { describe, expect, it } from "vitest";

import { Link } from "../../link/Link.js";
import { render, screen } from "../../test-utils/index.js";
import { List } from "../List.js";
import { ListItemLink } from "../ListItemLink.js";

describe("ListItemLink", () => {
  it("should render as an <a> element by default", () => {
    const { container } = render(
      <List>
        <ListItemLink href="/link">Hello</ListItemLink>
      </List>
    );
    const link = screen.getByRole("link", { name: "Hello" });
    expect(link).toBeInstanceOf(HTMLAnchorElement);
    expect(link.parentElement).toBeInstanceOf(HTMLLIElement);

    expect(container).toMatchSnapshot();
  });

  it("should allow for a custom link component using the as prop", () => {
    const { container } = render(
      <List>
        <ListItemLink as={Link} href="/link">
          Hello
        </ListItemLink>
      </List>
    );
    const link = screen.getByRole("link", { name: "Hello" });
    expect(link).toBeInstanceOf(HTMLAnchorElement);
    expect(link.parentElement).toBeInstanceOf(HTMLLIElement);

    expect(container).toMatchSnapshot();
  });

  it("should support the to prop for routing libraries like react-router-dom", () => {
    type Props = Omit<HTMLAttributes<HTMLAnchorElement>, "href"> & {
      to: string;
    };

    function NonForwardedLink(props: Props): ReactElement {
      const { to, children, ...remaining } = props;
      return (
        <a href={to} {...remaining}>
          {children}
        </a>
      );
    }

    const Link = forwardRef<HTMLAnchorElement, Props>(
      function Link(props, ref) {
        const { to, children, ...remaining } = props;
        return (
          <a ref={ref} href={to} {...remaining}>
            {children}
          </a>
        );
      }
    );

    const { container, rerender } = render(
      <List>
        <ListItemLink
          // custom links **must** allow for a ref to be passed
          // @ts-expect-error
          as={NonForwardedLink}
          href="/link"
        >
          Hello
        </ListItemLink>
      </List>
    );

    rerender(
      <List>
        <ListItemLink as={Link} href="/link">
          Hello
        </ListItemLink>
      </List>
    );
    const link = screen.getByRole("link", { name: "Hello" });
    expect(link).toBeInstanceOf(HTMLAnchorElement);
    expect(link.parentElement).toBeInstanceOf(HTMLLIElement);

    expect(container).toMatchSnapshot();
  });
});
