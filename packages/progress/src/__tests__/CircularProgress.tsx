import React, { CSSProperties } from "react";
import { render } from "@testing-library/react";

import CircularProgress from "../CircularProgress";

describe("CircularProgress", () => {
  it("should render correctly", () => {
    const { container, rerender } = render(<CircularProgress id="progress" />);

    expect(container).toMatchSnapshot();

    rerender(<CircularProgress id="progress" centered />);
    expect(container).toMatchSnapshot();

    rerender(<CircularProgress id="progress" centered={false} />);
    expect(container).toMatchSnapshot();
  });

  it("should merge the transform style if it exists", () => {
    const style: CSSProperties = {
      WebkitTransform: "translateX(20px)",
      transform: "translateX(20px)",
    };

    const { getByRole } = render(
      <CircularProgress id="progress" style={style} value={20} />
    );
    const progress = getByRole("progressbar");
    expect(progress.style.transform).toContain(style.transform);
    expect(progress).toMatchSnapshot();
  });
});
