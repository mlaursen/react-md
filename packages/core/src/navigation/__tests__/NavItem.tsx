import { createRef } from "react";
import { describe, expect, it } from "vitest";

import { render, screen } from "../../test-utils/index.js";
import { NavItem } from "../NavItem.js";

describe("NavItem", () => {
  it("should apply the correct styling, HTML attributes, and allow a ref", () => {
    const ref = createRef<HTMLLIElement>();
    const props = {
      "data-testid": "item",
      ref,
      children: "Content",
    } as const;
    const { rerender } = render(<NavItem {...props} />);

    const item = screen.getByTestId("item");
    expect(ref.current).toBeInstanceOf(HTMLLIElement);
    expect(ref.current).toBe(item);
    expect(item).toMatchSnapshot();

    rerender(
      <NavItem
        {...props}
        style={{ color: "white" }}
        className="custom-class-name"
      />
    );
    expect(item).toMatchSnapshot();
  });
});
