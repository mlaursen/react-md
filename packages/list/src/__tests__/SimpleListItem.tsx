import React from "react";
import { render } from "@testing-library/react";

import SimpleListItem from "../SimpleListItem";

describe("SimpleListItem", () => {
  it("should render correctly", () => {
    const props = { children: "Content" };
    const { container, rerender } = render(<SimpleListItem {...props} />);

    expect(container).toMatchSnapshot();

    rerender(<SimpleListItem {...props} leftAddon={<span>Left</span>} />);
    expect(container).toMatchSnapshot();
  });
});
