import { beforeEach, describe, expect, it, jest } from "@jest/globals";
import { type ReactElement, createRef } from "react";

import { Button } from "../../button/Button.js";
import {
  render,
  screen,
  userEvent,
  waitFor,
  waitForElementToBeRemoved,
} from "../../test-utils/index.js";
import { TRANSITION_CONFIG } from "../../transition/config.js";
import { useToggle } from "../../useToggle.js";
import { CollapsibleNavGroup } from "../CollapsibleNavGroup.js";
import { NavItemLink } from "../NavItemLink.js";

const scrollIntoView = jest.spyOn(
  HTMLAnchorElement.prototype,
  "scrollIntoView"
);

beforeEach(() => {
  jest.resetAllMocks();
});

describe("NavItemLink", () => {
  it("should apply the correct styling, HTML attributes, and allow a ref", () => {
    const ref = createRef<HTMLAnchorElement>();
    const props = {
      ref,
      href: "/",
      active: false,
      children: "Home",
    } as const;
    const { rerender } = render(<NavItemLink {...props} />);
    const navItem = screen.getByRole("listitem");
    const link = screen.getByRole("link", { name: "Home" });

    expect(ref.current).toBeInstanceOf(HTMLAnchorElement);
    expect(ref.current).toBe(link);
    expect(navItem).toMatchSnapshot();

    rerender(
      <NavItemLink
        {...props}
        style={{ color: "white" }}
        className="custom-class-name"
      />
    );
    expect(navItem).toMatchSnapshot();

    rerender(<NavItemLink {...props} active />);
    expect(navItem).toMatchSnapshot();

    rerender(
      <NavItemLink {...props} active activeClassName="custom-active-class" />
    );
    expect(navItem).toMatchSnapshot();

    rerender(<NavItemLink {...props} activeClassName="custom-active-class" />);
    expect(navItem).toMatchSnapshot();
  });

  it("should support an overflow only tooltip by default", async () => {
    const user = userEvent.setup();
    render(
      <NavItemLink href="/" active spanProps={{ "data-testid": "content" }}>
        Home
      </NavItemLink>
    );
    const link = screen.getByRole("link", { name: "Home" });

    const content = screen.getByTestId("content");
    jest.spyOn(content, "scrollWidth", "get").mockReturnValue(300);

    const rect = content.getBoundingClientRect();
    jest.spyOn(content, "offsetWidth", "get").mockReturnValue(150);
    jest
      .spyOn(content, "getBoundingClientRect")
      .mockReturnValue({ ...rect, width: 150 });

    await user.hover(link);
    const tooltip = await screen.findByRole("tooltip", {
      name: "Home",
    });

    await waitFor(() => {
      expect(tooltip).toHaveStyle("position: fixed; left: 24px; top: 16px;");
    });
    expect(tooltip).toMatchSnapshot();
  });

  it("should allow an addon to be rendered before or after the children so that the addons are not included in the overflowing tooltip", () => {
    render(
      <NavItemLink
        href="/"
        active
        beforeAddon={<span>Before</span>}
        afterAddon={<span>After</span>}
      >
        Home
      </NavItemLink>
    );

    const navItem = screen.getByRole("listitem");
    expect(navItem).toMatchSnapshot();
  });

  it("should automatically scroll the item into view when it gains the active state to better support temporary layouts", async () => {
    const user = userEvent.setup();
    function Test(): ReactElement {
      const { toggled, toggle } = useToggle();

      return (
        <>
          <Button onClick={toggle}>Toggle</Button>
          <NavItemLink href="/" active={toggled}>
            Home
          </NavItemLink>
        </>
      );
    }

    render(<Test />);
    const toggle = screen.getByRole("button", { name: "Toggle" });

    await user.click(toggle);
    expect(scrollIntoView).toHaveBeenCalledWith({ block: "center" });

    await user.click(toggle);
    expect(scrollIntoView).toHaveBeenCalledTimes(1);

    await user.click(toggle);
    expect(scrollIntoView).toHaveBeenCalledTimes(2);
  });

  it("should not scroll the item into view if it became active by the user clicking on the link", async () => {
    const user = userEvent.setup();
    function Test() {
      const { toggle, toggled } = useToggle();

      return (
        <NavItemLink href="/" active={toggled} onClick={toggle}>
          Home
        </NavItemLink>
      );
    }

    render(<Test />);
    const link = screen.getByRole("link", { name: "Home" });
    expect(link).not.toHaveAttribute("aria-current");

    await user.click(link);
    expect(link).toHaveAttribute("aria-current", "page");
    expect(scrollIntoView).not.toHaveBeenCalled();
  });

  it("should not scroll the item into view if the disableScrollIntoView prop is enabled", async () => {
    const user = userEvent.setup();
    function Test(): ReactElement {
      const { toggled, toggle } = useToggle();

      return (
        <>
          <Button onClick={toggle}>Toggle</Button>
          <NavItemLink href="/" active={toggled} disableScrollIntoView>
            Home
          </NavItemLink>
        </>
      );
    }

    render(<Test />);
    const toggle = screen.getByRole("button", { name: "Toggle" });

    await user.click(toggle);
    expect(scrollIntoView).not.toHaveBeenCalled();
  });

  it("should not scroll the item into view if it became active by mounting after a collapse transition since it makes it animate weirdly", async () => {
    TRANSITION_CONFIG.disabled = false;
    const user = userEvent.setup();
    function Test(): ReactElement {
      const { toggle, toggled } = useToggle(true);
      return (
        <>
          <CollapsibleNavGroup
            depth={0}
            collapsed={toggled}
            buttonChildren="Group"
            toggleCollapsed={toggle}
          >
            <NavItemLink href="/" active>
              Home
            </NavItemLink>
          </CollapsibleNavGroup>
        </>
      );
    }
    render(<Test />);

    const toggle = screen.getByRole("button", { name: "Group" });
    expect(() => screen.getByRole("link")).toThrow();

    await user.click(toggle);
    const link = await screen.findByRole("link", { name: "Home" });
    await waitFor(() => {
      expect(document.querySelector(".rmd-collapse--enter")).toBeNull();
    });
    expect(scrollIntoView).not.toHaveBeenCalled();

    await user.click(toggle);
    await waitForElementToBeRemoved(link);
    expect(scrollIntoView).not.toHaveBeenCalled();

    // same thing, shouldn't scroll into view if transitions are disabled
    TRANSITION_CONFIG.disabled = true;
    await user.click(toggle);
    await screen.findByRole("link", { name: "Home" });
    expect(document.querySelector(".rmd-collapse--enter")).toBeNull();
    expect(scrollIntoView).not.toHaveBeenCalled();
  });
});
