import { createRef } from "react";
import { render } from "../../test-utils";

import { textContainer, TextContainer } from "../TextContainer";
import { Typography } from "../Typography";

describe("TextContainer", () => {
  it("should render correctly and apply the correct class names", () => {
    const { getByTestId, rerender } = render(
      <TextContainer data-testid="container">
        <Typography>Content</Typography>
      </TextContainer>
    );

    const container = getByTestId("container");
    expect(container).toHaveClass("rmd-text-container");
    expect(container).toHaveClass("rmd-text-container--auto");
    expect(container).not.toHaveClass("rmd-text-container--mobile");
    expect(container).not.toHaveClass("rmd-text-container--desktop");
    expect(container).toMatchSnapshot();

    rerender(
      <TextContainer data-testid="container" size="mobile">
        <Typography>Content</Typography>
      </TextContainer>
    );
    expect(container).toHaveClass("rmd-text-container");
    expect(container).not.toHaveClass("rmd-text-container--auto");
    expect(container).toHaveClass("rmd-text-container--mobile");
    expect(container).not.toHaveClass("rmd-text-container--desktop");
    expect(container).toMatchSnapshot();

    rerender(
      <TextContainer data-testid="container" size="desktop">
        <Typography>Content</Typography>
      </TextContainer>
    );
    expect(container).toHaveClass("rmd-text-container");
    expect(container).not.toHaveClass("rmd-text-container--auto");
    expect(container).toHaveClass("rmd-text-container--desktop");
    expect(container).not.toHaveClass("rmd-text-container--mobile");
    expect(container).toMatchSnapshot();

    rerender(
      <TextContainer data-testid="container" className="custom-1 custom-2">
        <Typography>Content</Typography>
      </TextContainer>
    );

    expect(container).toHaveClass("rmd-text-container");
    expect(container).toHaveClass("rmd-text-container--auto");
    expect(container).not.toHaveClass("rmd-text-container--mobile");
    expect(container).not.toHaveClass("rmd-text-container--desktop");
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
