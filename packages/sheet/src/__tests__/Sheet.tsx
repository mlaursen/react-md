import React from "react";
import { render, cleanup } from "@testing-library/react";

import Sheet from "../Sheet";

afterEach(cleanup);

const PROPS = {
  id: "test-sheet",
  visible: true,
  onRequestClose: () => {},
  children: <div />,
};

describe("Sheet", () => {
  it("should render with the role of dialog", () => {
    const { queryByRole } = render(<Sheet {...PROPS} />);
    expect(queryByRole("dialog")).not.toBeNull();
  });

  it("should not be rendered when hidden by default", () => {
    const { queryByRole } = render(<Sheet {...PROPS} visible={false} />);
    expect(queryByRole("dialog")).toBe(null);
  });

  it("should be rendered when hidden if the mountOnEnter and unmountOnExit props are disabled", () => {
    const { queryByRole } = render(
      <Sheet
        {...PROPS}
        visible={false}
        mountOnEnter={false}
        unmountOnExit={false}
      />
    );
    expect(queryByRole("dialog")).not.toBe(null);
  });

  it("should apply the offscreen and hidden classnames to the sheet when it is rendered when hidden", () => {
    const { queryByRole } = render(
      <Sheet
        {...PROPS}
        visible={false}
        mountOnEnter={false}
        unmountOnExit={false}
      />
    );

    const sheet = queryByRole("dialog") as HTMLDivElement;
    expect(sheet.classList.contains("rmd-sheet--offscreen")).toBe(true);
    expect(sheet.classList.contains("rmd-sheet--hidden")).toBe(true);
  });

  it("should not apply any width classes if the position is top or bottom", () => {
    const { getByRole, rerender } = render(
      <Sheet {...PROPS} position="bottom" />
    );
    let dialog = getByRole("dialog") as HTMLDivElement;
    expect(dialog.className).not.toMatch(/--horizontal/);
    expect(dialog.className).not.toMatch(/width/);
    expect(dialog.className).toMatch(/height/);
    expect(dialog.className).toMatch(/--vertical/);

    rerender(<Sheet {...PROPS} position="top" />);
    dialog = getByRole("dialog") as HTMLDivElement;
    expect(dialog.className).not.toMatch(/--horizontal/);
    expect(dialog.className).not.toMatch(/width/);
    expect(dialog.className).toMatch(/height/);
    expect(dialog.className).toMatch(/--vertical/);
  });

  it("should apply the correct height classes for top and bottom", () => {
    const { getByRole, rerender } = render(
      <Sheet {...PROPS} position="bottom" />
    );
    const getClassName = () =>
      (getByRole("dialog") as HTMLDivElement).className;

    expect(getClassName()).not.toMatch(/viewport-height/);
    expect(getClassName()).not.toMatch(/touchable-height/);
    expect(getClassName()).toMatch(/recommended-height/);
    rerender(<Sheet {...PROPS} position="top" />);
    expect(getClassName()).not.toMatch(/viewport-height/);
    expect(getClassName()).not.toMatch(/touchable-height/);
    expect(getClassName()).toMatch(/recommended-height/);

    rerender(<Sheet {...PROPS} position="bottom" verticalSize="none" />);
    expect(getClassName()).toMatch(/viewport-height/);
    expect(getClassName()).not.toMatch(/touchable-height/);
    expect(getClassName()).not.toMatch(/recommended-height/);
    rerender(<Sheet {...PROPS} position="top" verticalSize="none" />);
    expect(getClassName()).toMatch(/viewport-height/);
    expect(getClassName()).not.toMatch(/touchable-height/);
    expect(getClassName()).not.toMatch(/recommended-height/);

    rerender(<Sheet {...PROPS} position="bottom" verticalSize="touch" />);
    expect(getClassName()).not.toMatch(/viewport-height/);
    expect(getClassName()).toMatch(/touchable-height/);
    expect(getClassName()).not.toMatch(/recommended-height/);
    rerender(<Sheet {...PROPS} position="top" verticalSize="touch" />);
    expect(getClassName()).not.toMatch(/viewport-height/);
    expect(getClassName()).toMatch(/touchable-height/);
    expect(getClassName()).not.toMatch(/recommended-height/);
  });

  it("should not apply any of the height classes if the position is left or right", () => {
    const { getByRole, rerender } = render(
      <Sheet {...PROPS} position="left" />
    );
    let dialog = getByRole("dialog") as HTMLDivElement;
    expect(dialog.className).toMatch(/width/);
    expect(dialog.className).not.toMatch(/height/);

    rerender(<Sheet {...PROPS} position="right" />);
    dialog = getByRole("dialog") as HTMLDivElement;
    expect(dialog.className).toMatch(/width/);
    expect(dialog.className).not.toMatch(/height/);
  });

  it("should apply the correct width classes for left and right", () => {
    const { getByRole, rerender } = render(
      <Sheet {...PROPS} position="left" />
    );
    const getClassName = () =>
      (getByRole("dialog") as HTMLDivElement).className;

    expect(getClassName()).not.toMatch(/small-width/);
    expect(getClassName()).not.toMatch(/large-width/);
    expect(getClassName()).toMatch(/media-width/);
    rerender(<Sheet {...PROPS} position="right" />);
    expect(getClassName()).not.toMatch(/small-width/);
    expect(getClassName()).not.toMatch(/large-width/);
    expect(getClassName()).toMatch(/media-width/);

    rerender(<Sheet {...PROPS} position="left" horizontalSize="small" />);
    expect(getClassName()).toMatch(/small-width/);
    expect(getClassName()).not.toMatch(/large-width/);
    expect(getClassName()).not.toMatch(/media-width/);
    rerender(<Sheet {...PROPS} position="right" horizontalSize="small" />);
    expect(getClassName()).toMatch(/small-width/);
    expect(getClassName()).not.toMatch(/large-width/);
    expect(getClassName()).not.toMatch(/media-width/);

    rerender(<Sheet {...PROPS} position="left" horizontalSize="large" />);
    expect(getClassName()).not.toMatch(/small-width/);
    expect(getClassName()).toMatch(/large-width/);
    expect(getClassName()).not.toMatch(/media-width/);
    rerender(<Sheet {...PROPS} position="right" horizontalSize="large" />);
    expect(getClassName()).not.toMatch(/small-width/);
    expect(getClassName()).toMatch(/large-width/);
    expect(getClassName()).not.toMatch(/media-width/);
  });
});
