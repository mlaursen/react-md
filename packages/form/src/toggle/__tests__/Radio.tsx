import React from "react";
import { render } from "@testing-library/react";

import { Radio } from "../Radio";

describe("Radio", () => {
  it("should render correctly", () => {
    const props = { id: "radio", value: "a" };
    const { container, rerender } = render(<Radio {...props} />);

    expect(container).toMatchSnapshot();

    rerender(<Radio {...props} label="Label" />);
    expect(container).toMatchSnapshot();

    rerender(<Radio {...props} label="Label" iconAfter />);
    expect(container).toMatchSnapshot();

    rerender(<Radio {...props} label="Label" disabled />);
    expect(container).toMatchSnapshot();

    rerender(<Radio {...props} label="Label" error />);
    expect(container).toMatchSnapshot();
  });
});
