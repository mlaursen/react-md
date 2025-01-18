import { describe, expect, it, jest } from "@jest/globals";
import { createRef } from "react";
import { rmdRender, screen } from "../../test-utils/index.js";
import { type MenuItemRadioProps } from "../MenuItemInputToggle.js";
import { MenuItemRadio } from "../MenuItemRadio.js";

describe("MenuItemRadio", () => {
  it("should apply the correct styling, HTMLAttributes, and allow a ref", () => {
    const ref = createRef<HTMLLIElement>();
    const props = {
      ref,
      checked: false,
      onCheckedChange: jest.fn(),
      children: "Radio",
    } as const;

    const { rerender } = rmdRender(<MenuItemRadio {...props} />);

    const element = screen.getByRole("menuitemradio", { name: "Radio" });
    expect(ref.current).toBeInstanceOf(HTMLLIElement);
    expect(ref.current).toBe(element);
    expect(element).toMatchSnapshot();

    rerender(
      <MenuItemRadio
        {...props}
        style={{ color: "white" }}
        className="custom-class-name"
      />
    );
    expect(element).toMatchSnapshot();
  });

  it("should allow for a custom unchecked and checked icon", () => {
    const props: MenuItemRadioProps = {
      icon: null,
      checkedIcon: <span data-testid="checked" />,
      iconAfter: true,
      children: "Radio",
      checked: false,
      onCheckedChange: jest.fn(),
    };

    const { rerender } = rmdRender(<MenuItemRadio {...props} />);

    const element = screen.getByRole("menuitemradio", { name: "Radio" });
    expect(element).toMatchSnapshot();
    expect(element.querySelector(".rmd-icon")).toBeNull();

    rerender(<MenuItemRadio {...props} checked />);
    expect(element).toMatchSnapshot();
  });
});
