import type { HTMLAttributes, ReactElement } from "react";
import { forwardRef } from "react";
import { render } from "../../test-utils";

import { Link } from "../../link";
import { List } from "../List";
import { ListItemLink } from "../ListItemLink";

describe("ListItemLink", () => {
  it("should render as an <a> element by default", () => {
    const { getByRole, container } = render(
      <List>
        <ListItemLink href="/link">Hello</ListItemLink>
      </List>
    );
    const link = getByRole("link", { name: "Hello" });
    expect(link).toBeInstanceOf(HTMLAnchorElement);
    expect(link.parentElement).toBeInstanceOf(HTMLLIElement);

    expect(container).toMatchSnapshot();
  });

  it("should allow for a custom link component using the as prop", () => {
    const { getByRole, container } = render(
      <List>
        <ListItemLink as={Link} href="/link">
          Hello
        </ListItemLink>
      </List>
    );
    const link = getByRole("link", { name: "Hello" });
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

    const Link = forwardRef<HTMLAnchorElement, Props>(function Link(
      props,
      ref
    ) {
      const { to, children, ...remaining } = props;
      return (
        <a ref={ref} href={to} {...remaining}>
          {children}
        </a>
      );
    });

    const { getByRole, container, rerender } = render(
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
    const link = getByRole("link", { name: "Hello" });
    expect(link).toBeInstanceOf(HTMLAnchorElement);
    expect(link.parentElement).toBeInstanceOf(HTMLLIElement);

    expect(container).toMatchSnapshot();
  });
});
