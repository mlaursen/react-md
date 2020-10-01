import React, { HTMLAttributes, ReactElement } from "react";
import { render as renderer, RenderOptions } from "@testing-library/react";

import { AppSizeListener } from "../../sizing/AppSizeListener";
import { Grid, GRID_COLUMNS_VAR } from "../Grid";
import { GridCell } from "../GridCell";

const render = (
  children: ReactElement,
  options?: Omit<RenderOptions, "queries">
) =>
  renderer(children, {
    ...options,
    wrapper: ({ children }) => <AppSizeListener>{children}</AppSizeListener>,
  });

describe("Grid", () => {
  it("should render correctly with the GridCell component", () => {
    const { container } = render(
      <Grid>
        <GridCell>Cell 1</GridCell>
        <GridCell>Cell 2</GridCell>
        <GridCell>Cell 3</GridCell>
      </Grid>
    );

    expect(container).toMatchSnapshot();
  });

  it("should inline the padding style unless it is 0", () => {
    const props = { "data-testid": "grid" };
    const { getByTestId, rerender } = render(<Grid {...props} padding={12} />);
    const grid = getByTestId("grid");

    expect(grid.style.padding).toBe("12px");

    rerender(<Grid {...props} padding={0} />);
    expect(grid.style.padding).toBe("");
  });

  it("should render correctly when the columns props are provided", () => {
    // really need to make a way for this test to be changed since it relies on the AppSizeListener
    // for the current column size
    const { container, rerender } = render(<Grid columns={2} />);
    expect(container).toMatchSnapshot();

    rerender(
      <Grid
        phoneColumns={1}
        tabletColumns={2}
        desktopColumns={3}
        largeDesktopColumns={4}
      />
    );
    expect(container).toMatchSnapshot();
  });

  it("should be able to wrap each child in the GridCell component when the clone prop is enabled", () => {
    const { container, getByTestId } = render(
      <Grid clone>
        {false && <span data-testid="span" />}
        {true && <div data-testid="div" />}
        <section data-testid="section" />
      </Grid>
    );

    expect(() => getByTestId("span")).toThrow();
    expect(getByTestId("div").className).toContain("rmd-grid__cell");
    expect(getByTestId("section").className).toContain("rmd-grid__cell");
    expect(container).toMatchSnapshot();
  });

  it("should be able to clone the style and classname into the child element ignoring all other props", () => {
    const MyCustomComponent = ({
      style,
      className,
    }: HTMLAttributes<HTMLSpanElement>) => {
      return (
        <span style={style} className={className} data-testid="span">
          Content
        </span>
      );
    };

    const { container, getByTestId } = render(
      <Grid cloneStyles columns={3}>
        <MyCustomComponent />
      </Grid>
    );

    const span = getByTestId("span");
    expect(span.className).toContain("rmd-grid");
    expect(span.style.getPropertyValue(GRID_COLUMNS_VAR)).toBe("3");
    expect(container).toMatchSnapshot();
  });
});
