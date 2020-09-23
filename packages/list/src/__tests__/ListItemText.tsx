import React from "react";
import { render } from "@testing-library/react";

import { ListItemText } from "../ListItemText";

describe("ListItemText", () => {
  it("should render correctly", () => {
    const props = { children: "Content" };
    const { container, rerender } = render(<ListItemText {...props} />);

    expect(container).toMatchSnapshot();

    rerender(<ListItemText {...props} secondaryText="Secondary" />);
    expect(container).toMatchSnapshot();

    rerender(
      <ListItemText {...props} secondaryText={<span>Secondary</span>} />
    );
    expect(container).toMatchSnapshot();
  });

  it("should apply class names correctly", () => {
    const props = {
      className: "class-name",
      secondaryTextClassName: "secondary-class-name",
      children: <div>Children</div>,
    };

    const { container, rerender } = render(<ListItemText {...props} />);
    expect(container).toMatchSnapshot();

    rerender(
      <ListItemText {...props} secondaryText={<div>Secondary Text</div>} />
    );
    expect(container).toMatchSnapshot();
  });
});
