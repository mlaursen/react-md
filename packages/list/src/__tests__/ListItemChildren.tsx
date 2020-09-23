import React from "react";
import { render } from "@testing-library/react";

import { ListItemChildren } from "../ListItemChildren";

describe("ListItemChildren", () => {
  it("should render correctly", () => {
    const props = { children: "Content" };
    const { container, rerender } = render(<ListItemChildren {...props} />);

    expect(container).toMatchSnapshot();

    rerender(<ListItemChildren {...props} textChildren />);
    expect(container).toMatchSnapshot();

    rerender(<ListItemChildren primaryText="Content" />);
    expect(container).toMatchSnapshot();

    rerender(
      <ListItemChildren primaryText="Primary" secondaryText="Secondary" />
    );
    expect(container).toMatchSnapshot();
  });

  it('should default the left and right addon types and positions to "icon" and "middle"', () => {
    const props = {
      primaryText: "Primary Text",
      leftAddon: <span>Left Addon</span>,
      rightAddon: <span>Right Addon</span>,
    };

    const { container } = render(<ListItemChildren {...props} />);
    expect(container).toMatchSnapshot();
  });

  it("should render the leftAddon correctly based on the leftAddonType and leftAddonPosition props", () => {
    const props = {
      primaryText: "Primary Text",
      leftAddon: <span data-testid="addon">Left Addon</span>,
    };

    const { container, rerender } = render(<ListItemChildren {...props} />);
    expect(container).toMatchSnapshot();

    rerender(<ListItemChildren {...props} leftAddonType="icon" />);
  });
});
