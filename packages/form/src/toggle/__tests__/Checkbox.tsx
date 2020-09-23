import React from "react";
import { render } from "@testing-library/react";

import { Checkbox } from "../Checkbox";

describe("Checkbox", () => {
  it("should render correctly", () => {
    const props = { id: "checkbox" };
    const { container, rerender } = render(<Checkbox {...props} />);

    expect(container).toMatchSnapshot();

    rerender(<Checkbox {...props} label="Label" />);
    expect(container).toMatchSnapshot();

    rerender(<Checkbox {...props} label="Label" iconAfter />);
    expect(container).toMatchSnapshot();

    rerender(<Checkbox {...props} label="Label" indeterminate />);
    expect(container).toMatchSnapshot();

    rerender(<Checkbox {...props} label="Label" disabled />);
    expect(container).toMatchSnapshot();

    rerender(<Checkbox {...props} label="Label" error />);
    expect(container).toMatchSnapshot();
  });
});
