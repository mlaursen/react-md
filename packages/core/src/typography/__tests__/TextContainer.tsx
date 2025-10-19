import { createRef } from "react";
import { describe, expect, it } from "vitest";

import { render, screen } from "../../test-utils/index.js";
import { TextContainer } from "../TextContainer.js";
import { Typography } from "../Typography.js";
import { textContainer } from "../textContainerStyles.js";

describe("TextContainer", () => {
  it("should render correctly and apply the correct class names", () => {
    const { rerender } = render(
      <TextContainer data-testid="container">
        <Typography>Content</Typography>
      </TextContainer>
    );

    const container = screen.getByTestId("container");
    expect(container).toHaveClass("rmd-text-container");
    expect(container).toMatchSnapshot();

    rerender(
      <TextContainer data-testid="container" className="custom-1 custom-2">
        <Typography>Content</Typography>
      </TextContainer>
    );

    expect(container).toHaveClass("rmd-text-container");
    expect(container).toHaveClass("custom-1");
    expect(container).toHaveClass("custom-2");
    expect(container).toMatchSnapshot();
  });

  it("should forward the ref to the div element", () => {
    const ref = createRef<HTMLDivElement>();
    render(<TextContainer ref={ref} />);

    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  describe("styling utility class", () => {
    it("should be callable without any arguments", () => {
      expect(textContainer()).toMatchSnapshot();
    });
  });
});
