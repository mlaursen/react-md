import React from "react";
import { render } from "@testing-library/react";

import { TreeGroup } from "../TreeGroup";

describe("TreeGroup", () => {
  it("should render correctly", () => {
    const props = {
      collapsed: true,
      children: (
        <>
          <li>Item 1</li>
        </>
      ),
    };

    const { container, rerender } = render(<TreeGroup {...props} />);

    expect(container).toMatchSnapshot();

    rerender(<TreeGroup {...props} collapsed={false} />);
    expect(container).toMatchSnapshot();
  });
});
