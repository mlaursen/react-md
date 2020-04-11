import React from "react";
import { render } from "@testing-library/react";

import ListItem from "../ListItem";

describe("ListItem", () => {
  it("should render correctly", () => {
    const { container, rerender } = render(<ListItem>Content</ListItem>);
    expect(container).toMatchSnapshot();

    rerender(<ListItem leftAddon={<span>Left Icon</span>}>Content</ListItem>);
    expect(container).toMatchSnapshot();
  });
});
