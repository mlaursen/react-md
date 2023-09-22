import { describe, expect, it } from "@jest/globals";
import { createRef } from "react";
import { render } from "../../test-utils/index.js";

import {
  AppBar,
  appBar,
  type AppBarHeight,
  type AppBarPosition,
} from "../AppBar.js";
import { AppBarTitle } from "../AppBarTitle.js";

describe("AppBar", () => {
  it("should apply the correct styling, HTML attributes, and allow a ref", () => {
    const ref = createRef<HTMLDivElement>();
    const props = {
      "data-testid": "app-bar",
      ref,
      children: <AppBarTitle>My Title</AppBarTitle>,
    } as const;

    const { getByTestId, rerender } = render(<AppBar {...props} />);
    let appBar = getByTestId("app-bar");
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
    expect(ref.current).toBe(appBar);
    expect(appBar).toMatchSnapshot();

    rerender(
      <AppBar
        {...props}
        style={{ backgroundColor: "orange" }}
        className="custom-class-name"
      />
    );
    appBar = getByTestId("app-bar");
    expect(appBar).toMatchSnapshot();

    rerender(<AppBar {...props} position="fixed" />);
    appBar = getByTestId("app-bar");
    expect(appBar).toMatchSnapshot();

    rerender(<AppBar {...props} position="fixed" disableElevation />);
    appBar = getByTestId("app-bar");
    expect(appBar).toMatchSnapshot();

    rerender(<AppBar {...props} position="sticky" />);
    appBar = getByTestId("app-bar");
    expect(appBar).toMatchSnapshot();

    rerender(<AppBar {...props} position="sticky" disableElevation />);
    appBar = getByTestId("app-bar");
    expect(appBar).toMatchSnapshot();

    rerender(<AppBar {...props} stacked />);
    appBar = getByTestId("app-bar");
    expect(appBar).toMatchSnapshot();
  });

  it("should allow for different theme colors", () => {
    const props = {
      "data-testid": "app-bar",
    } as const;

    const { getByTestId, rerender } = render(<AppBar {...props} />);
    const appBar = getByTestId("app-bar");
    expect(appBar).toMatchSnapshot();

    rerender(<AppBar {...props} theme="secondary" />);
    expect(appBar).toMatchSnapshot();

    rerender(<AppBar {...props} theme="surface" />);
    expect(appBar).toMatchSnapshot();

    rerender(<AppBar {...props} theme="clear" />);
    expect(appBar).toMatchSnapshot();
  });

  it("should allow the app bar to be fixed to the top or bottom of the page", () => {
    const positions: readonly AppBarPosition[] = ["top", "bottom"];
    const props = {
      "data-testid": "app-bar",
      position: "fixed",
    } as const;
    const { getByTestId, rerender } = render(<AppBar {...props} />);
    const appBar = getByTestId("app-bar");
    expect(appBar).toMatchSnapshot();

    positions.forEach((position) => {
      rerender(<AppBar {...props} pagePosition={position} />);
      expect(appBar).toMatchSnapshot();
    });
  });

  it("should allow for different heights", () => {
    const heights: readonly AppBarHeight[] = [
      "normal",
      "prominent",
      "prominent-dense",
      "dense",
      "auto",
    ];
    const props = {
      "data-testid": "app-bar",
    } as const;

    const { getByTestId, rerender } = render(<AppBar {...props} />);
    const appBar = getByTestId("app-bar");
    expect(appBar).toMatchSnapshot();

    heights.forEach((height) => {
      rerender(<AppBar {...props} height={height} />);
      expect(appBar).toMatchSnapshot();
    });
  });

  describe("styling utils", () => {
    it("should be callback without any arguments", () => {
      expect(appBar()).toMatchSnapshot();
    });
  });
});
