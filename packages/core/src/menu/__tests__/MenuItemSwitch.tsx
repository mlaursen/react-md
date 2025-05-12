import { describe, expect, it, jest } from "@jest/globals";
import { createRef } from "react";

import { rmdRender, screen } from "../../test-utils/index.js";
import { type MenuItemSwitchProps } from "../MenuItemInputToggle.js";
import { MenuItemSwitch } from "../MenuItemSwitch.js";

describe("MenuItemSwitch", () => {
  it("should apply the correct styling, HTMLAttributes, and allow a ref", () => {
    const ref = createRef<HTMLLIElement>();
    const props = {
      ref,
      checked: false,
      onCheckedChange: jest.fn(),
      children: "Switch",
    } as const;

    const { rerender } = rmdRender(<MenuItemSwitch {...props} />);

    const element = screen.getByRole("menuitemcheckbox", { name: "Switch" });
    expect(ref.current).toBeInstanceOf(HTMLLIElement);
    expect(ref.current).toBe(element);
    expect(element).toMatchSnapshot();

    rerender(
      <MenuItemSwitch
        {...props}
        style={{ color: "white" }}
        className="custom-class-name"
      />
    );
    expect(element).toMatchSnapshot();
  });

  it("should allow for a custom unchecked and checked icon", () => {
    const props: MenuItemSwitchProps = {
      icon: null,
      checkedIcon: <span data-testid="checked" />,
      iconAfter: true,
      children: "Switch",
      checked: false,
      onCheckedChange: jest.fn(),
    };

    const { rerender } = rmdRender(<MenuItemSwitch {...props} />);

    const element = screen.getByRole("menuitemcheckbox", { name: "Switch" });
    expect(element).toMatchSnapshot();
    expect(element.querySelector(".rmd-icon")).toBeNull();

    rerender(<MenuItemSwitch {...props} checked />);
    expect(element).toMatchSnapshot();
  });
});
