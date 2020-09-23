import React from "react";
import { render } from "@testing-library/react";

import { MediaContainer } from "../MediaContainer";

describe("MediaContainer", () => {
  it("should apply the correct class names", () => {
    const { getByTestId, rerender } = render(
      <MediaContainer data-testid="container" />
    );
    const container = getByTestId("container");

    expect(container.className).toBe(
      "rmd-media-container rmd-media-container--auto"
    );

    rerender(<MediaContainer data-testid="container" auto={false} />);
    expect(container.className).toBe("rmd-media-container");

    rerender(
      <MediaContainer data-testid="container" auto height={9} width={16} />
    );
    expect(container.className).toBe(
      "rmd-media-container rmd-media-container--auto rmd-media-container--aspect-ratio rmd-media-container--16-9"
    );

    rerender(
      <MediaContainer data-testid="container" auto height={1} width={1} />
    );
    expect(container.className).toBe(
      "rmd-media-container rmd-media-container--auto rmd-media-container--aspect-ratio rmd-media-container--1-1"
    );

    rerender(
      <MediaContainer
        data-testid="container"
        auto
        className="this-is-a-multiple-class name-test"
      />
    );
    expect(container.className).toBe(
      "rmd-media-container rmd-media-container--auto this-is-a-multiple-class name-test"
    );
  });
});
