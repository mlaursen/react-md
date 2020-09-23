import React from "react";
import { render } from "@testing-library/react";

import { ListSubheader } from "../ListSubheader";

describe("ListSubheader", () => {
  it("should render correctly", () => {
    const props = { children: <span>CHildren</span> };
    const { container, rerender } = render(<ListSubheader {...props} />);

    expect(container).toMatchSnapshot();

    rerender(<ListSubheader inset {...props} />);
    expect(container).toMatchSnapshot();
  });
});
