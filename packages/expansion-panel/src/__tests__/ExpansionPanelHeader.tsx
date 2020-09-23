import React from "react";
import { render } from "@testing-library/react";

import { ExpansionPanelHeader } from "../ExpansionPanelHeader";

describe("ExpansionPanelHeader", () => {
  it("should render correctly", () => {
    const props = {
      id: "panel-header",
      onClick: () => {},
      children: "Content",
    };
    const { container, rerender } = render(
      <ExpansionPanelHeader {...props} expanded={false} />
    );
    expect(container).toMatchSnapshot();

    rerender(<ExpansionPanelHeader {...props} expanded />);
    expect(container).toMatchSnapshot();
  });
});
