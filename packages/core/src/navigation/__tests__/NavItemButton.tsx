import { describe, expect, it, jest } from "@jest/globals";
import { createRef, type ReactElement, type Ref } from "react";
import { type IconRotatorBaseProps } from "../../icon/IconRotator.js";
import { rmdRender, screen, userEvent, waitFor } from "test-utils";
import { useToggle } from "../../useToggle.js";
import { NavItemButton, type NavItemButtonProps } from "../NavItemButton.js";

interface TestProps
  extends Omit<Partial<NavItemButtonProps>, "collapsed" | "onClick"> {
  nodeRef?: Ref<HTMLButtonElement>;
}

function Test(props: TestProps): ReactElement {
  const { nodeRef, children = "Content", ...remaining } = props;
  const { toggle, toggled } = useToggle(true);

  return (
    <NavItemButton
      ref={nodeRef}
      {...remaining}
      collapsed={toggled}
      onClick={toggle}
    >
      {children}
    </NavItemButton>
  );
}

const render = (props: TestProps = {}) => {
  const user = userEvent.setup();
  const { rerender, ...view } = rmdRender(<Test {...props} />);

  return {
    ...view,
    user,
    rerender(props: TestProps) {
      rerender(<Test {...props} />);
    },
  };
};

describe("NavItemButton", () => {
  it("should apply the correct styling, HTML attributes, and allow a ref", () => {
    const ref = createRef<HTMLButtonElement>();
    const { rerender } = render({ nodeRef: ref });
    const button = screen.getByRole("button", { name: "Content" });

    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    expect(ref.current).toBe(button);
    expect(button).toMatchSnapshot();

    rerender({
      nodeRef: ref,
      style: { color: "white" },
      className: "custom-class-name",
    });
    expect(button).toMatchSnapshot();
  });

  it("should allow the icon rotator to be removed", async () => {
    const iconRotatorProps: Omit<IconRotatorBaseProps, "rotated"> = {
      "data-testid": "rotator",
      forceIconWrap: true,
    };
    const { user, rerender } = render({ iconRotatorProps });
    const button = screen.getByRole("button", { name: "Content" });
    const rotator = screen.getByTestId("rotator");

    expect(button).toHaveAttribute("aria-expanded", "false");
    await user.click(button);
    expect(button).toHaveAttribute("aria-expanded", "true");
    expect(rotator).toBeInTheDocument();

    rerender({
      iconRotatorProps,
      disableIconRotator: true,
    });
    expect(rotator).not.toBeInTheDocument();
    expect(button).toHaveAttribute("aria-expanded", "true");
  });

  it("should support an overflow only tooltip by default", async () => {
    const { user } = render({
      spanProps: {
        "data-testid": "content",
      },
    });
    const button = screen.getByRole("button", { name: "Content" });

    const content = screen.getByTestId("content");
    jest.spyOn(content, "scrollWidth", "get").mockReturnValue(300);

    const rect = content.getBoundingClientRect();
    jest.spyOn(content, "offsetWidth", "get").mockReturnValue(150);
    jest
      .spyOn(content, "getBoundingClientRect")
      .mockReturnValue({ ...rect, width: 150 });

    await user.hover(button);
    const tooltip = await screen.findByRole("tooltip", {
      name: "Content",
    });
    // Make the test less flakey by waiting for the fixed positioning style
    // to have been calculated at least once with the tooltip element
    await waitFor(() => {
      expect(tooltip).toHaveStyle("left: 24px");
    });

    expect(tooltip).toMatchSnapshot();
  });

  it("should allow an addon to be rendered before or after the children so that the addons are not included in the overflowing tooltip", () => {
    render({
      beforeAddon: <span>Before</span>,
      afterAddon: <span>After</span>,
    });
    const button = screen.getByRole("button");

    expect(button).toMatchSnapshot();
  });
});
