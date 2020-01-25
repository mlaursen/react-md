import React, { Fragment } from "react";
import { render } from "@testing-library/react";

import TreeGroup from "../TreeGroup";

describe("TreeGroup", () => {
  it("should render correctly", () => {
    const props = {
      collapsed: true,
      children: (
        <Fragment>
          <li>Item 1</li>
        </Fragment>
      ),
    };

    const { container, rerender } = render(<TreeGroup {...props} />);

    expect(container).toMatchSnapshot();

    rerender(<TreeGroup {...props} collapsed={false} />);
    expect(container).toMatchSnapshot();
  });
});
