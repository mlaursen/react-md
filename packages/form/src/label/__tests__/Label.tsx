import React from "react";
import { render } from "@testing-library/react";

import { Label } from "../Label";

describe("Label", () => {
  it("should render correctly", () => {
    const props = { children: "Label", htmlFor: "input" };
    const { container, rerender } = render(<Label {...props} />);

    expect(container).toMatchSnapshot();

    rerender(
      <Label {...props}>
        <span>Custom Children</span>
      </Label>
    );
    expect(container).toMatchSnapshot();

    rerender(<Label {...props} error />);
    expect(container).toMatchSnapshot();

    rerender(<Label {...props} disabled />);
    expect(container).toMatchSnapshot();

    rerender(<Label {...props} active />);
    expect(container).toMatchSnapshot();

    rerender(<Label {...props} error active />);
    expect(container).toMatchSnapshot();
  });
});
