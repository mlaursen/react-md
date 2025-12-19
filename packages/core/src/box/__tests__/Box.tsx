import { createRef } from "react";
import { describe, expect, it } from "vitest";

import { render, screen } from "../../test-utils/index.js";
import { Box, type BoxProps } from "../Box.js";
import { type BoxAlignItems, type BoxJustifyContent } from "../styles.js";

const BOX_ALIGN_VALUES: BoxAlignItems[] = [
  "start",
  "flex-start",
  "center",
  "end",
  "flex-end",
  "stretch",
];

const BOX_JUSTIFY_VALUES: BoxJustifyContent[] = [
  ...BOX_ALIGN_VALUES,
  "space-between",
  "space-around",
  "space-evenly",
];

const BASE_PROPS: BoxProps = {
  "data-testid": "box",
  children: "Content",
};

describe("Box", () => {
  it("should apply the correct styling, HTML attributes, and allow a ref", () => {
    const ref = createRef<HTMLDivElement>();
    const props = {
      ...BASE_PROPS,
      ref,
    } as const;
    const { rerender } = render(<Box {...props} />);

    const box = screen.getByTestId("box");
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
    expect(ref.current).toBe(box);
    expect(box).toMatchSnapshot();

    rerender(
      <Box
        {...props}
        style={{ color: "white" }}
        className="custom-class-name"
      />
    );
    expect(box).toMatchSnapshot();
  });

  it("should support common flex behavior", () => {
    const { rerender } = render(<Box {...BASE_PROPS} />);

    const box = screen.getByTestId("box");
    for (const align of BOX_ALIGN_VALUES) {
      for (const justify of BOX_JUSTIFY_VALUES) {
        rerender(<Box {...BASE_PROPS} align={align} justify={justify} />);

        expect(box).toMatchSnapshot();
      }
    }
  });

  it("should allow the padding to be disabled", () => {
    const { rerender } = render(<Box {...BASE_PROPS} />);
    const box = screen.getByTestId("box");

    expect(box).toHaveClass("rmd-box--padded");

    rerender(<Box {...BASE_PROPS} disablePadding />);
    expect(box).not.toHaveClass("rmd-box--padded");
  });

  it("should support a full width prop to expand within other flex/grid containers", () => {
    const { rerender } = render(<Box {...BASE_PROPS} />);
    const box = screen.getByTestId("box");

    expect(box).not.toHaveClass("rmd-box--full-width");

    rerender(<Box {...BASE_PROPS} fullWidth />);
    expect(box).toHaveClass("rmd-box--full-width");
  });

  it("should be able to render as a grid using the grid prop", () => {
    render(<Box {...BASE_PROPS} grid />);
    const box = screen.getByTestId("box");
    expect(box).toMatchSnapshot();
  });

  it("should support rendering the grid with auto-fill instead of auto-fit", () => {
    const { rerender } = render(<Box {...BASE_PROPS} grid />);
    const box = screen.getByTestId("box");

    expect(box).toHaveClass("rmd-box--grid");
    expect(box).not.toHaveClass("rmd-box--grid-fill");

    rerender(<Box {...BASE_PROPS} grid gridColumns="fit" />);
    expect(box).toHaveClass("rmd-box--grid");
    expect(box).not.toHaveClass("rmd-box--grid-fill");

    rerender(<Box {...BASE_PROPS} grid gridColumns="fill" />);
    expect(box).toHaveClass("rmd-box--grid");
    expect(box).toHaveClass("rmd-box--grid-fill");
  });

  it("should set the --rmd-box-columns variable and grid-columsn class when gridColumns is a number", () => {
    const { rerender } = render(<Box {...BASE_PROPS} grid />);
    const box = screen.getByTestId("box");

    expect(box).toMatchSnapshot();
    expect(box).toHaveClass("rmd-box--grid");
    expect(box).not.toHaveClass("rmd-box--grid-fill");
    expect(box).not.toHaveClass("rmd-box--grid-size");

    rerender(<Box {...BASE_PROPS} grid gridColumns={4} />);
    expect(box).toMatchSnapshot();
    expect(box).toHaveClass("rmd-box--grid");
    expect(box).not.toHaveClass("rmd-box--grid-fill");
    expect(box).toHaveClass("rmd-box--grid-size");

    rerender(
      <Box {...BASE_PROPS} grid gridColumns={4} style={{ color: "red" }} />
    );
    expect(box).toMatchSnapshot();
  });

  it("should be able to generate a grid name", () => {
    render(<Box {...BASE_PROPS} grid gridName="variant-1" />);
    const box = screen.getByTestId("box");

    expect(box).toHaveClass("rmd-box--variant-1");
  });

  it("should be able stack and reverse ordering", () => {
    const { rerender } = render(<Box {...BASE_PROPS} />);
    const box = screen.getByTestId("box");

    expect(box).not.toHaveClass("rmd-box--column");
    expect(box).not.toHaveClass("rmd-box--reverse");
    expect(box).not.toHaveClass("rmd-box--column-reverse");

    rerender(<Box {...BASE_PROPS} stacked />);
    expect(box).toHaveClass("rmd-box--column");
    expect(box).not.toHaveClass("rmd-box--reverse");
    expect(box).not.toHaveClass("rmd-box--column-reverse");

    rerender(<Box {...BASE_PROPS} stacked reversed />);
    expect(box).not.toHaveClass("rmd-box--column");
    expect(box).not.toHaveClass("rmd-box--reverse");
    expect(box).toHaveClass("rmd-box--column-reverse");

    rerender(<Box {...BASE_PROPS} reversed />);
    expect(box).not.toHaveClass("rmd-box--column");
    expect(box).toHaveClass("rmd-box--reverse");
    expect(box).not.toHaveClass("rmd-box--column-reverse");
  });

  it("should be able to support the grid-auto-rows behavior", () => {
    const { rerender } = render(<Box {...BASE_PROPS} />);
    const box = screen.getByTestId("box");

    expect(box).not.toHaveClass("rmd-box--grid-auto-rows");
    expect(box).toMatchSnapshot();

    rerender(<Box {...BASE_PROPS} gridAutoRows />);
    expect(box).not.toHaveClass("rmd-box--grid-auto-rows");
    expect(box).toMatchSnapshot();

    rerender(<Box {...BASE_PROPS} grid gridAutoRows />);
    expect(box).toHaveClass("rmd-box--grid-auto-rows");
    expect(box).toMatchSnapshot();
  });

  it("should allow the gap to be disabled entirely, by row, or by column", () => {
    const { rerender } = render(<Box {...BASE_PROPS} />);
    const box = screen.getByTestId("box");
    expect(box).toHaveClass("rmd-box--gap");
    expect(box).not.toHaveClass("rmd-box--gap-h");
    expect(box).not.toHaveClass("rmd-box--gap-v");

    rerender(<Box {...BASE_PROPS} disableGap />);
    expect(box).not.toHaveClass("rmd-box--gap");
    expect(box).not.toHaveClass("rmd-box--gap-h");
    expect(box).not.toHaveClass("rmd-box--gap-v");

    rerender(<Box {...BASE_PROPS} disableGap="row" />);
    expect(box).not.toHaveClass("rmd-box--gap");
    expect(box).toHaveClass("rmd-box--gap-h");
    expect(box).not.toHaveClass("rmd-box--gap-v");

    rerender(<Box {...BASE_PROPS} disableGap="column" />);
    expect(box).not.toHaveClass("rmd-box--gap");
    expect(box).not.toHaveClass("rmd-box--gap-h");
    expect(box).toHaveClass("rmd-box--gap-v");
  });

  it("should allow the columns to be configured by different breakpoints", () => {
    const { rerender } = render(<Box {...BASE_PROPS} grid gridColumns={2} />);
    const box = screen.getByTestId("box");
    expect(box).toHaveClass("rmd-box--grid-size");

    rerender(<Box {...BASE_PROPS} grid gridColumns={{ phone: "fill" }} />);
    expect(box).toHaveClass("rmd-box--grid-phone");
    expect(box).not.toHaveClass("rmd-box--grid-phone-size");
    expect(box).toMatchSnapshot();

    rerender(
      <Box
        {...BASE_PROPS}
        grid
        gridColumns={{ phone: 1, tablet: "fill", desktop: "fit" }}
      />
    );
    expect(box).toHaveClass("rmd-box--grid-phone");
    expect(box).toHaveClass("rmd-box--grid-phone-size");
    expect(box).toMatchSnapshot();

    rerender(
      <Box
        {...BASE_PROPS}
        grid
        gridColumns={{ tablet: 2, desktop: 4, largeDesktop: "fit" }}
      />
    );
    expect(box).toMatchSnapshot();
  });

  it("should allow the grid item size to be configured by different breakpoints", () => {
    const { rerender } = render(
      <Box {...BASE_PROPS} grid gridItemSize="4rem" />
    );
    const box = screen.getByTestId("box");
    expect(box).toMatchSnapshot();

    rerender(<Box {...BASE_PROPS} grid gridItemSize={{ phone: "4rem" }} />);
    expect(box).toMatchSnapshot();

    rerender(
      <Box
        {...BASE_PROPS}
        grid
        gridItemSize={{ phone: "4rem", tablet: "8rem", desktop: "12rem" }}
      />
    );
    expect(box).toMatchSnapshot();

    rerender(
      <Box
        {...BASE_PROPS}
        grid
        gridItemSize={{
          tablet: "5rem",
          desktop: "12rem",
          largeDesktop: "auto",
        }}
      />
    );
    expect(box).toMatchSnapshot();
  });
});
