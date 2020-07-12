import React from "react";
import { render, fireEvent } from "@testing-library/react";

import SimpleListItem from "../SimpleListItem";

describe("SimpleListItem", () => {
  it("should render correctly", () => {
    const props = { children: "Content" };
    const { container, rerender } = render(<SimpleListItem {...props} />);

    expect(container).toMatchSnapshot();

    rerender(<SimpleListItem {...props} leftAddon={<span>Left</span>} />);
    expect(container).toMatchSnapshot();
  });

  it('should correctly "polyfill" the disabled behavior by preventing click events when disabled', () => {
    const onClick = jest.fn();
    const props = { children: "Content", onClick, clickable: true };
    const { rerender, getByText } = render(
      <SimpleListItem {...props} disabled />
    );

    const item = getByText(props.children);
    expect(item).toHaveAttribute("aria-disabled", "true");
    expect(item.className).toContain("rmd-list-item--disabled");
    fireEvent.click(item);
    expect(onClick).not.toBeCalled();

    rerender(<SimpleListItem {...props} aria-disabled />);
    expect(item).toHaveAttribute("aria-disabled", "true");
    expect(item.className).toContain("rmd-list-item--disabled");
    fireEvent.click(item);
    expect(onClick).not.toBeCalled();

    rerender(<SimpleListItem {...props} aria-disabled={false} />);
    expect(item).not.toHaveAttribute("aria-disabled");
    expect(item.className).not.toContain("rmd-list-item--disabled");
    fireEvent.click(item);
    expect(onClick).toBeCalled();
  });
});
