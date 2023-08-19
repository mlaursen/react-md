import { describe, expect, it } from "@jest/globals";
import type { CSSProperties } from "react";
import { render } from "../../test-utils/index.js";

import { CircularProgress } from "../CircularProgress.js";

describe("CircularProgress", () => {
  it("should render correctly", () => {
    const { getByRole, rerender } = render(<CircularProgress />);

    const progress = getByRole("progressbar");
    expect(progress).toMatchSnapshot();

    rerender(<CircularProgress disableCentered={false} />);
    expect(progress).toMatchSnapshot();

    rerender(<CircularProgress disableCentered />);
    expect(progress).toMatchSnapshot();

    rerender(<CircularProgress id="custom-id" />);
    expect(progress).toMatchSnapshot();
  });

  it("should merge the transform style if it exists", () => {
    const svgStyle: CSSProperties = {
      WebkitTransform: "translateX(20px)",
      transform: "translateX(20px)",
    };

    const { getByRole, rerender } = render(<CircularProgress value={20} />);
    const progress = getByRole("progressbar");
    expect(progress).toMatchSnapshot();

    rerender(<CircularProgress value={30} svgStyle={svgStyle} />);

    rerender(
      <CircularProgress
        value={20}
        svgStyle={svgStyle}
        determinateRotateDegrees={-1}
      />
    );
    expect(progress).toMatchSnapshot();
  });

  it("should support a small variant", () => {
    const { getByRole, rerender } = render(<CircularProgress small />);
    const progress = getByRole("progressbar");

    expect(progress.className).toContain("rmd-circular-progress--small");
    expect(progress).toMatchSnapshot();

    rerender(<CircularProgress small disableCentered />);

    expect(progress.className).toContain("rmd-circular-progress--small");
    expect(progress).toMatchSnapshot();
  });
});
