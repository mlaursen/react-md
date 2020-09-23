import React from "react";
import { render } from "@testing-library/react";

import { TreeItemExpanderIcon } from "../TreeItemExpanderIcon";

describe("TreeItemExpanderIcon", () => {
  it("should render correctly", () => {
    const { container, rerender } = render(
      <TreeItemExpanderIcon rotated={false}>
        <i>icon</i>
      </TreeItemExpanderIcon>
    );

    expect(container).toMatchSnapshot();

    rerender(
      <TreeItemExpanderIcon rotated>
        <i>icon</i>
      </TreeItemExpanderIcon>
    );
    expect(container).toMatchSnapshot();
  });
});
