import { describe, expect, it } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import { createRef } from "react";

import { MenuItemSeparator } from "../MenuItemSeparator.js";

describe("MenuItemSeparator", () => {
  it("should apply the correct styling, HTMLAttributes, and allow a ref", () => {
    const ref = createRef<HTMLLIElement>();
    const props = {
      ref,
    } as const;

    const { rerender } = render(<MenuItemSeparator {...props} />);

    const element = screen.getByRole("separator");
    expect(ref.current).toBeInstanceOf(HTMLLIElement);
    expect(ref.current).toBe(element);
    expect(element).toMatchSnapshot();

    rerender(<MenuItemSeparator inset {...props} />);
    expect(element).toMatchSnapshot();

    rerender(<MenuItemSeparator inset vertical {...props} />);
    expect(element).toMatchSnapshot();

    rerender(<MenuItemSeparator vertical {...props} />);
    expect(element).toMatchSnapshot();

    rerender(
      <MenuItemSeparator
        {...props}
        style={{ color: "white" }}
        className="custom-class-name"
      />
    );
    expect(element).toMatchSnapshot();
  });
});
