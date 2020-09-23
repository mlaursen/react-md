import React from "react";
import { render } from "@testing-library/react";

import { TextFieldAddon } from "../TextFieldAddon";

describe("TextFieldAddon", () => {
  it("should render as null when there are no children", () => {
    const { container } = render(<TextFieldAddon />);

    expect(container.firstElementChild).toBe(null);
    expect(container).toMatchSnapshot();
  });

  it("should render correctly", () => {
    const props = { children: <span>Content</span> };
    const { container, rerender } = render(<TextFieldAddon {...props} />);

    expect(container).toMatchSnapshot();

    rerender(<TextFieldAddon presentational={false} {...props} />);
    expect(container).toMatchSnapshot();
  });
});
