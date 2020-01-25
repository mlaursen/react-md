import React, { ReactElement } from "react";
import { render as renderer, RenderOptions } from "@testing-library/react";

import Grid from "../Grid";
import GridCell from "../GridCell";
import AppSizeListener from "../../sizing/AppSizeListener";

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

  it("should inline the padding style unless it is 0 ", () => {
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
});
