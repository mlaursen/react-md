import React from "react";
import { render } from "@testing-library/react";

import { FloatingLabel } from "../FloatingLabel";

describe("FloatingLabel", () => {
  it("should render correctly", () => {
    const props = {
      htmlFor: "input-id",
      valued: false,
      children: <span>Label value</span>,
    };
    const { container, rerender } = render(<FloatingLabel {...props} />);
    expect(container).toMatchSnapshot();

    rerender(<FloatingLabel {...props} dense />);
    expect(container).toMatchSnapshot();

    rerender(<FloatingLabel {...props} floating />);
    expect(container).toMatchSnapshot();
  });

  it("should only add the inactive flag when valued and not active , errored, and disabled", () => {
    const props = { htmlFor: "input-id", valued: true, children: "label" };
    const { container, rerender } = render(<FloatingLabel {...props} />);
    const label = container.firstElementChild;
    if (!label) {
      throw new Error();
    }

    expect(container).toMatchSnapshot();
    expect(label.className).toContain("rmd-floating-label--inactive");

    rerender(<FloatingLabel {...props} valued={false} />);
    expect(container).toMatchSnapshot();
    expect(label.className).not.toContain("rmd-floating-label--inactive");

    rerender(<FloatingLabel {...props} active error />);
    expect(container).toMatchSnapshot();
    expect(label.className).not.toContain("rmd-floating-label--inactive");

    rerender(<FloatingLabel {...props} error />);
    expect(container).toMatchSnapshot();
    expect(label.className).not.toContain("rmd-floating-label--inactive");

    rerender(<FloatingLabel {...props} active />);
    expect(container).toMatchSnapshot();
    expect(label.className).not.toContain("rmd-floating-label--inactive");

    rerender(<FloatingLabel {...props} disabled />);
    expect(container).toMatchSnapshot();
    expect(label.className).not.toContain("rmd-floating-label--inactive");
  });
});
