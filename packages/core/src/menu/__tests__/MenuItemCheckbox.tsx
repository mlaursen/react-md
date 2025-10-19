import { createRef } from "react";
import { describe, expect, it, vi } from "vitest";

import { rmdRender, screen } from "../../test-utils/index.js";
import { MenuItemCheckbox } from "../MenuItemCheckbox.js";
import { type MenuItemCheckboxProps } from "../MenuItemInputToggle.js";

describe("MenuItemCheckbox", () => {
  it("should apply the correct styling, HTMLAttributes, and allow a ref", () => {
    const ref = createRef<HTMLLIElement>();
    const props = {
      ref,
      checked: false,
      onCheckedChange: vi.fn(),
      children: "Checkbox",
    } as const;

    const { rerender } = rmdRender(<MenuItemCheckbox {...props} />);

    const element = screen.getByRole("menuitemcheckbox", { name: "Checkbox" });
    expect(ref.current).toBeInstanceOf(HTMLLIElement);
    expect(ref.current).toBe(element);
    expect(element).toMatchSnapshot();

    rerender(
      <MenuItemCheckbox
        {...props}
        style={{ color: "white" }}
        className="custom-class-name"
      />
    );
    expect(element).toMatchSnapshot();
  });

  it("should allow for a custom unchecked and checked icon", () => {
    const props: MenuItemCheckboxProps = {
      icon: null,
      checkedIcon: <span data-testid="checked" />,
      iconAfter: true,
      children: "Checkbox",
      checked: false,
      onCheckedChange: vi.fn(),
    };

    const { rerender } = rmdRender(<MenuItemCheckbox {...props} />);

    const element = screen.getByRole("menuitemcheckbox", { name: "Checkbox" });
    expect(element).toMatchSnapshot();
    expect(element.querySelector(".rmd-icon")).toBeNull();

    rerender(<MenuItemCheckbox {...props} checked />);
    expect(element).toMatchSnapshot();
  });
});
