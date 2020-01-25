import React from "react";
import { render } from "@testing-library/react";

import LayoutAppBar from "../LayoutAppBar";

describe("LayoutAppBar", () => {
  it("should render correctly", () => {
    const { container } = render(<LayoutAppBar layoutId="layout" />);

    expect(container).toMatchSnapshot();
  });
});
