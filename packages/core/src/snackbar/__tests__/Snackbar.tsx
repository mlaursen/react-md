import { type ReactElement, createRef } from "react";
import { describe, expect, it } from "vitest";

import {
  type ReactMDRenderOptions,
  type RenderResult,
  rmdRender,
  screen,
} from "../../test-utils/index.js";
import { Snackbar } from "../Snackbar.js";
import { ToastManager } from "../ToastManager.js";
import { ToastManagerProvider } from "../ToastManagerProvider.js";
import { type SnackbarPosition } from "../snackbarStyles.js";

const render = (
  ui: ReactElement,
  options?: ReactMDRenderOptions
): RenderResult => {
  const manager = new ToastManager();
  manager.addToast({ children: "Toast" });

  return rmdRender(ui, {
    ...options,
    wrapper: ({ children }) => (
      <ToastManagerProvider manager={manager}>{children}</ToastManagerProvider>
    ),
  });
};

describe("Snackbar", () => {
  it("should apply the correct styling, HTML attributes, and allow a ref", () => {
    const ref = createRef<HTMLDivElement>();
    const props = {
      "data-testid": "snackbar",
      ref,
    } as const;
    const { rerender } = render(<Snackbar {...props} />);

    const snackbar = screen.getByTestId("snackbar");
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
    expect(ref.current).toBe(snackbar);
    expect(snackbar).toMatchSnapshot();

    rerender(
      <Snackbar
        {...props}
        style={{ color: "white" }}
        className="custom-class-name"
      />
    );
    expect(snackbar).toMatchSnapshot();
  });

  it("should support different positions within the viewport", () => {
    const positions: SnackbarPosition[] = [
      "bottom",
      "bottom-left",
      "bottom-right",
      "top",
      "top-left",
      "top-right",
    ];

    const { rerender } = render(<Snackbar data-testid="snackbar" />);
    const snackbar = screen.getByTestId("snackbar");
    expect(snackbar).toMatchSnapshot();

    for (const position of positions) {
      rerender(<Snackbar position={position} />);

      expect(snackbar).toMatchSnapshot();
    }
  });

  it("should allow the portal behavior to be disabled", () => {
    const { container, rerender } = render(<Snackbar data-testid="snackbar" />);
    let snackbar = screen.getByTestId("snackbar");
    expect(container).not.toContainElement(snackbar);
    expect(snackbar).toBeInTheDocument();

    rerender(<Snackbar data-testid="snackbar" disablePortal />);
    snackbar = screen.getByTestId("snackbar");
    expect(container).toContainElement(snackbar);
  });
});
