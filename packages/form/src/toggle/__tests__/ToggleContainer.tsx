import React from "react";
import { render } from "@testing-library/react";

import { ToggleContainer } from "../ToggleContainer";

describe("ToggleContainer", () => {
  it("should render correctly", () => {
    const props = { children: <input type="checkbox" /> };
    const { container, rerender } = render(<ToggleContainer {...props} />);

    expect(container).toMatchSnapshot();

    rerender(<ToggleContainer {...props} inline />);
    expect(container).toMatchSnapshot();

    rerender(<ToggleContainer {...props} stacked />);
    expect(container).toMatchSnapshot();

    rerender(<ToggleContainer {...props} inline stacked />);
    expect(container).toMatchSnapshot();
  });
});
