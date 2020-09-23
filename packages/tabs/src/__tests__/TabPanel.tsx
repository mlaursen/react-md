import React from "react";
import { render } from "@testing-library/react";

import { TabPanel } from "../TabPanel";

describe("TabPanel", () => {
  it("should render correctly", () => {
    const props = {
      "aria-label": "Panel",
      children: <div>Here is some amazing content</div>,
    };

    const { container, rerender } = render(<TabPanel {...props} />);
    expect(container).toMatchSnapshot();

    rerender(<TabPanel {...props} id="panel-id" />);
    expect(container).toMatchSnapshot();
  });
});
