/* eslint-disable jsx-a11y/tabindex-no-positive */
import React from "react";
import { render, fireEvent } from "@testing-library/react";

import { ListItem } from "../ListItem";

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

  it("should default the tabIndex to 0 when not disabled and to -1 when disabled", () => {
    const props = { children: "Content" };
    const { rerender, getByRole } = render(<ListItem {...props} />);
    const item = getByRole("button");
    expect(item.tabIndex).toBe(0);

    rerender(<ListItem {...props} disabled />);
    expect(item.tabIndex).toBe(-1);

    rerender(<ListItem {...props} tabIndex={1} />);
    expect(item.tabIndex).toBe(1);

    rerender(<ListItem {...props} tabIndex={1} disabled />);
    expect(item.tabIndex).toBe(1);

    rerender(<ListItem {...props} tabIndex={0} disabled />);
    expect(item.tabIndex).toBe(0);
  });

  it("should apply the correct disabled classes based on the disabledOpacity prop", () => {
    const props = { disabled: true, children: "Content" };
    const { rerender, getByRole } = render(<ListItem {...props} />);

    const item = getByRole("button");
    expect(item.className).toContain("rmd-list-item--disabled-color");
    expect(item.className).not.toContain("rmd-list-item--disabled-opacity");

    rerender(<ListItem {...props} disabledOpacity />);
    expect(item.className).not.toContain("rmd-list-item--disabled-color");
    expect(item.className).toContain("rmd-list-item--disabled-opacity");
  });
});
