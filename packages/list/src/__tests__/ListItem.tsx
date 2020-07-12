import React from "react";
import { render, fireEvent } from "@testing-library/react";

import ListItem from "../ListItem";

describe("ListItem", () => {
  it("should render correctly", () => {
    const { container, rerender } = render(<ListItem>Content</ListItem>);
    expect(container).toMatchSnapshot();

    rerender(<ListItem leftAddon={<span>Left Icon</span>}>Content</ListItem>);
    expect(container).toMatchSnapshot();
  });

  it('should correctly "polyfill" the disabled behavior by preventing click events when disabled', () => {
    const onClick = jest.fn();
    const props = { children: "Content", onClick };
    const { rerender, getByRole } = render(<ListItem {...props} disabled />);

    const item = getByRole("button");
    expect(item).toHaveAttribute("aria-disabled", "true");
    expect(item.className).toContain("rmd-list-item--disabled");
    fireEvent.click(item);
    expect(onClick).not.toBeCalled();

    rerender(<ListItem {...props} aria-disabled />);
    expect(item).toHaveAttribute("aria-disabled", "true");
    expect(item.className).toContain("rmd-list-item--disabled");
    fireEvent.click(item);
    expect(onClick).not.toBeCalled();
  });
});
