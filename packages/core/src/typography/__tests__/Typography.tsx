import { describe, expect, it } from "@jest/globals";
import { type HTMLAttributes, type ReactElement } from "react";
import { render } from "../../test-utils/index.js";

import { typography, Typography, type TypographyType } from "../Typography.js";

describe("Typography", () => {
  it("should default to rendering as a paragraph and body-1 styles", () => {
    const { getByTestId } = render(<Typography data-testid="text" />);
    const text = getByTestId("text");
    expect(text.tagName).toBe("P");
    expect(text).toHaveClass("rmd-typography");
    expect(text).toHaveClass("rmd-typography--body-1");
    expect(text).toMatchSnapshot();
  });

  it("should render as the correct element based on the typography type", () => {
    const tests: { type: TypographyType; expected: string }[] = [
      { type: "headline-1", expected: "h1" },
      { type: "headline-2", expected: "h2" },
      { type: "headline-3", expected: "h3" },
      { type: "headline-4", expected: "h4" },
      { type: "headline-5", expected: "h5" },
      { type: "headline-6", expected: "h6" },
      { type: "subtitle-1", expected: "h6" },
      { type: "subtitle-2", expected: "h6" },
      { type: "body-1", expected: "p" },
      { type: "body-2", expected: "p" },
      { type: "overline", expected: "span" },
    ];

    const { getByTestId, rerender } = render(<Typography data-testid="text" />);
    tests.forEach(({ type, expected }) => {
      rerender(<Typography data-testid="text" type={type} />);
      const text = getByTestId("text");
      expect(text.tagName.toLowerCase()).toBe(expected);
      expect(text).toHaveClass("rmd-typography");
      expect(text).toHaveClass(`rmd-typography--${type}`);
      expect(text).toMatchSnapshot();
    });

    rerender(
      <table>
        <Typography type="caption" data-testid="text" />
      </table>
    );
    const text = getByTestId("text");
    expect(text.tagName).toBe("CAPTION");
    expect(text).toHaveClass("rmd-typography");
    expect(text).toHaveClass("rmd-typography--caption");
    expect(text).toMatchSnapshot();
  });

  it("should be able to render as a custom component using the `as` prop", () => {
    function Custom(props: HTMLAttributes<HTMLDivElement>): ReactElement {
      return <div {...props}>Custom!</div>;
    }

    const { getByTestId } = render(
      <Typography data-testid="text" as={Custom} />
    );
    expect(getByTestId("text")).toMatchSnapshot();
  });

  it("should be able to apply additional styles", () => {
    const { getByTestId } = render(
      <Typography
        data-testid="text"
        align="center"
        margin="bottom"
        decoration="overline"
        textColor="primary"
        fontStyle="italic"
        weight="semi-bold"
        transform="capitalize"
      />
    );

    expect(getByTestId("text")).toMatchSnapshot();
  });

  describe("styling utility class", () => {
    it("should be callable without any arguments or with a null type", () => {
      expect(typography()).toMatchSnapshot();
      expect(typography({ type: null })).toMatchSnapshot();
    });
  });
});
