import React from "react";
import { render } from "@testing-library/react";

import { MediaOverlay } from "../MediaOverlay";

describe("MediaOverlay", () => {
  it("should apply the correct class names", () => {
    const { getByTestId, rerender } = render(
      <MediaOverlay data-testid="div" />
    );
    const div = getByTestId("div");
    expect(div.className).toBe("rmd-media-overlay rmd-media-overlay--bottom");

    rerender(<MediaOverlay data-testid="div" position="top" />);
    expect(div.className).toBe("rmd-media-overlay rmd-media-overlay--top");

    rerender(<MediaOverlay data-testid="div" position="right" />);
    expect(div.className).toBe("rmd-media-overlay rmd-media-overlay--right");

    rerender(<MediaOverlay data-testid="div" position="left" />);
    expect(div.className).toBe("rmd-media-overlay rmd-media-overlay--left");

    rerender(<MediaOverlay data-testid="div" position="center" />);
    expect(div.className).toBe("rmd-media-overlay rmd-media-overlay--center");

    rerender(<MediaOverlay data-testid="div" position="middle" />);
    expect(div.className).toBe("rmd-media-overlay rmd-media-overlay--middle");

    rerender(<MediaOverlay data-testid="div" position="absolute-center" />);
    expect(div.className).toBe(
      "rmd-media-overlay rmd-media-overlay--absolute-center"
    );
  });
});
