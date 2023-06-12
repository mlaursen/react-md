import type { RenderOptions, RenderResult } from "@testing-library/react";
import { render as baseRender, screen } from "@testing-library/react";
import type { ReactElement } from "react";
import { createRef } from "react";
import { CoreProviders } from "../../CoreProviders";
import type { SnackbarPosition } from "../Snackbar";
import { Snackbar } from "../Snackbar";
import { ToastManager, ToastManagerProvider } from "../ToastManagerProvider";

const render = (
  ui: ReactElement,
  options: RenderOptions = {}
): RenderResult => {
  return baseRender(ui, {
    ...options,
    wrapper: ({ children }) => (
      <CoreProviders elementInteractionMode="none">
        <ToastManagerProvider manager={new ToastManager()}>
          {children}
        </ToastManagerProvider>
      </CoreProviders>
    ),
  });
};

describe("Snackbar", () => {
  it("should apply the correct styling, HTML attributes, and allow a ref", () => {
    const ref = createRef<HTMLDivElement>();
    const props = {
      "aria-label": "Notifications",
      ref,
    } as const;
    const { getByRole, rerender } = render(<Snackbar {...props} />);

    const snackbar = getByRole("status", { name: "Notifications" });
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

    const { rerender } = render(<Snackbar />);
    const snackbar = screen.getByRole("status");
    expect(snackbar).toMatchSnapshot();

    positions.forEach((position) => {
      rerender(<Snackbar position={position} />);

      expect(snackbar).toMatchSnapshot();
    });
  });

  it("should allow the portal behavior to be disabled", () => {
    const { container, rerender } = render(<Snackbar />);
    let snackbar = screen.getByRole("status");
    expect(container).not.toContainElement(snackbar);
    expect(snackbar).toBeInTheDocument();

    rerender(<Snackbar disablePortal />);
    snackbar = screen.getByRole("status");
    expect(container).toContainElement(snackbar);
  });
});
