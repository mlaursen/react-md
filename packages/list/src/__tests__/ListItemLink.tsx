import React from "react";
import { render } from "@testing-library/react";

import { ListItemLink } from "../ListItemLink";

describe("ListItemLink", () => {
  it("should render correctly", () => {
    const props = { href: "#" };
    const { container, rerender } = render(<ListItemLink {...props} />);

    expect(container).toMatchSnapshot();

    rerender(<ListItemLink {...props} leftAddon={<span>Left Icon</span>} />);
    expect(container).toMatchSnapshot();
  });
});
