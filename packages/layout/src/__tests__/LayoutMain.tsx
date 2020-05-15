import React, { ReactElement } from "react";
import {
  render as baseRender,
  act,
  RenderOptions,
} from "@testing-library/react";
import { InteractionModeListener } from "@react-md/utils";

import LayoutMain from "../LayoutMain";

const render = (ui: ReactElement, options?: RenderOptions) =>
  baseRender(ui, {
    ...options,
    wrapper: ({ children }) => (
      <InteractionModeListener>{children}</InteractionModeListener>
    ),
  });

describe("LayoutMain", () => {
  it("should only set the tabIndex to -1 while the app is in keyboard mode", () => {
    const { getByTestId } = render(
      <LayoutMain data-testid="main">
        <h2>Hello, World!</h2>
      </LayoutMain>
    );

    const main = getByTestId("main");
    expect(main).not.toHaveAttribute("tabindex");

    act(() => {
      window.dispatchEvent(new Event("keydown"));
    });
    expect(main).toHaveAttribute("tabindex", "-1");

    act(() => {
      window.dispatchEvent(new Event("mousedown"));
    });
    expect(main).not.toHaveAttribute("tabindex");

    act(() => {
      window.dispatchEvent(new Event("keydown"));
    });
    expect(main).toHaveAttribute("tabindex", "-1");

    act(() => {
      window.dispatchEvent(new Event("touchstart"));
    });
    expect(main).not.toHaveAttribute("tabindex");
  });
});
