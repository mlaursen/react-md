import { describe, expect, it } from "@jest/globals";
import { createRef, type ReactElement } from "react";
import { Button } from "../../button/Button.js";
import { PORTAL_CONTAINER_ID } from "../../portal/PortalContainerProvider.js";
import {
  rmdRender,
  screen,
  userEvent,
  waitFor,
} from "../../test-utils/index.js";
import { useToggle } from "../../useToggle.js";
import { isElementVisible } from "../../utils/isElementVisible.js";
import { Dialog, type DialogProps } from "../Dialog.js";
import { dialog } from "../styles.js";

interface TestProps
  extends Omit<
    DialogProps,
    "aria-label" | "aria-labelledby" | "visible" | "onRequestClose"
  > {}

function Test(props: TestProps): ReactElement {
  const { children, ...remaining } = props;

  const { toggled, enable, disable } = useToggle();
  return (
    <>
      <Button onClick={enable}>Show</Button>
      <Dialog
        {...remaining}
        aria-label="Dialog"
        visible={toggled}
        onRequestClose={disable}
        overlayProps={{
          "data-testid": "overlay",
          ...remaining.overlayProps,
        }}
        containerProps={{
          "data-testid": "container",
          ...remaining.containerProps,
        }}
      >
        <Button onClick={disable}>Close</Button>
        {children}
      </Dialog>
    </>
  );
}

describe("Dialog", () => {
  it("should apply the correct styling, HTMLAttributes, and allow a ref", () => {
    const ref = createRef<HTMLDivElement>();
    const props = {
      "aria-label": "Dialog",
      ref,
      visible: true,
      onRequestClose: () => {},
    } as const;

    const { rerender } = rmdRender(<Dialog {...props} />);

    const dialog = screen.getByRole("dialog", { name: "Dialog" });
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
    expect(ref.current).toBe(dialog);
    expect(dialog).toMatchSnapshot();

    rerender(
      <Dialog
        {...props}
        style={{ color: "white" }}
        className="custom-class-name"
      />
    );
    expect(dialog).toMatchSnapshot();
  });

  it("should use conditional rendering but support being hidden with the DISPLAY_NONE_CLASS by setting temporary to false", async () => {
    const user = userEvent.setup();
    const { rerender } = rmdRender(<Test />);

    let show = screen.getByRole("button", { name: "Show" });
    expect(() => screen.getByRole("dialog")).toThrow();
    expect(() => screen.getByRole("button", { name: "Close" })).toThrow();

    await user.click(show);
    let dialog = screen.getByRole("dialog", { name: "Dialog" });
    let closeButton = screen.getByRole("button", { name: "Close" });
    expect(dialog).not.toHaveClass("rmd-dialog--enter");

    await user.click(closeButton);
    expect(dialog).not.toBeInTheDocument();
    expect(closeButton).not.toBeInTheDocument();

    // I do not support toggling the temporary state without going through the
    // full transition flow again
    rerender(<Test key="restart" temporary={false} />);
    show = screen.getByRole("button", { name: "Show" });
    dialog = screen.getByRole("dialog", { name: "Dialog" });
    closeButton = screen.getByRole("button", { name: "Close" });

    expect(isElementVisible(dialog)).toBe(false);
    expect(isElementVisible(closeButton)).toBe(false);

    await user.click(show);
    expect(isElementVisible(dialog)).toBe(true);
    expect(isElementVisible(closeButton)).toBe(true);

    await user.click(closeButton);
    expect(isElementVisible(dialog)).toBe(false);
    expect(isElementVisible(closeButton)).toBe(false);
  });

  it("should render an overlay unless the disableOverlay prop is true", async () => {
    const user = userEvent.setup();
    const { rerender } = rmdRender(<Test />);

    const show = screen.getByRole("button", { name: "Show" });
    expect(() => screen.getByTestId("overlay")).toThrow();

    await user.click(show);
    expect(() => screen.getByTestId("overlay")).not.toThrow();
    expect(() => screen.getByRole("dialog", { name: "Dialog" })).not.toThrow();

    await user.click(screen.getByRole("button", { name: "Close" }));
    expect(() => screen.getByTestId("overlay")).toThrow();
    expect(() => screen.getByRole("dialog")).toThrow();

    rerender(<Test disableOverlay />);

    await user.click(show);
    expect(() => screen.getByTestId("overlay")).toThrow();
    expect(() => screen.getByRole("dialog", { name: "Dialog" })).not.toThrow();
  });

  it("should allow the user to close the dialog by clicking on the overlay", async () => {
    const user = userEvent.setup();
    rmdRender(<Test />);
    await user.click(screen.getByRole("button", { name: "Show" }));

    expect(() => screen.getByRole("dialog", { name: "Dialog" })).not.toThrow();
    await user.click(screen.getByTestId("overlay"));
    expect(() => screen.getByRole("dialog")).toThrow();
  });

  it("should move the focus onto the dialog when it becomes visible and back to the previous element once it is closed", async () => {
    const user = userEvent.setup();
    rmdRender(<Test />);

    const show = screen.getByRole("button", { name: "Show" });
    await user.click(show);

    const dialog = screen.getByRole("dialog", { name: "Dialog" });
    expect(document.activeElement).toBe(dialog);

    await user.click(screen.getByRole("button", { name: "Close" }));
    expect(dialog).not.toBeInTheDocument();

    // have to use waitFor because this focus happens after an animation frame
    // due to the weird timing of Enter keydown events compared to space
    await waitFor(() => {
      expect(document.activeElement).toBe(show);
    });
  });

  it("should allow both the dialog and overlay to disable the portal behavior by enabling the disablePortal prop", async () => {
    const user = userEvent.setup();
    rmdRender(<Test disablePortal />);

    await user.click(screen.getByRole("button", { name: "Show" }));

    const dialog = screen.getByRole("dialog", { name: "Dialog" });
    const overlay = screen.getByTestId("overlay");
    const portalContainer = document.getElementById(PORTAL_CONTAINER_ID);
    expect(portalContainer).not.toContainElement(dialog);
    expect(portalContainer).not.toContainElement(overlay);
  });

  it("should close the modal when the escape key is pressed and the disableEscapeClose is not true", async () => {
    const user = userEvent.setup();
    const { rerender } = rmdRender(<Test />);

    const show = screen.getByRole("button", { name: "Show" });
    await user.click(show);
    let dialog = screen.getByRole("dialog", { name: "Dialog" });

    await user.keyboard("[Escape]");
    expect(dialog).not.toBeInTheDocument();

    rerender(<Test disableEscapeClose />);
    await user.click(show);
    dialog = screen.getByRole("dialog", { name: "Dialog" });

    await user.keyboard("[Escape]");
    expect(dialog).toBeInTheDocument();
  });

  it("should be able to render as a modal with the correct accessibility", async () => {
    const user = userEvent.setup();
    rmdRender(
      <Test aria-describedby="alert-message" modal>
        <div id="alert-message">Warning</div>
      </Test>
    );

    await user.click(screen.getByRole("button", { name: "Show" }));
    const alertDialog = screen.getByRole("alertdialog", { name: "Dialog" });
    const overlay = screen.getByTestId("overlay");

    expect(alertDialog).toHaveAttribute("aria-modal", "true");
    expect(overlay).not.toHaveClass("rmd-overlay--clickable");
    expect(overlay).toMatchSnapshot();
  });

  it("should not close the modal dialog when escape key is pressed or the overlay is clicked", async () => {
    const user = userEvent.setup();
    rmdRender(
      <Test aria-describedby="alert-message" modal>
        <div id="alert-message">Warning</div>
      </Test>
    );

    await user.click(screen.getByRole("button", { name: "Show" }));
    const alertDialog = screen.getByRole("alertdialog", { name: "Dialog" });

    await user.keyboard("[Escape]");
    expect(alertDialog).toBeInTheDocument();

    await user.click(screen.getByTestId("overlay"));
    expect(alertDialog).toBeInTheDocument();
  });

  it("should be able to render as a full-page dialog by setting the type prop to full-page", async () => {
    const user = userEvent.setup();
    const { rerender } = rmdRender(<Test />);

    await user.click(screen.getByRole("button", { name: "Show" }));
    const dialog = screen.getByRole("dialog", { name: "Dialog" });
    const container = screen.getByTestId("container");
    expect(container).toMatchSnapshot();

    rerender(<Test type="full-page" />);
    // for some reason the container changes to the dialog? so just check there
    // is no container by retying to re-query for it
    expect(() => screen.getByTestId("container")).toThrow();
    expect(dialog).toMatchSnapshot();
  });

  it("should enable scroll lock on the page while visible unless the disableScrollLock prop is true", async () => {
    const user = userEvent.setup();
    const { rerender } = rmdRender(<Test />);

    expect(document.body).not.toHaveStyle("overflow: hidden");

    await user.click(screen.getByRole("button", { name: "Show" }));
    expect(document.body).toHaveStyle("overflow: hidden");

    rerender(<Test disableScrollLock />);
    expect(document.body).not.toHaveStyle("overflow: hidden");

    await user.click(screen.getByRole("button", { name: "Close" }));
    expect(document.body).not.toHaveStyle("overflow: hidden");

    await user.click(screen.getByRole("button", { name: "Show" }));
    expect(document.body).not.toHaveStyle("overflow: hidden");
  });

  it("should enable the noOpacity prop on parent dialog overlay elements so the screen does not get darker as more dialogs are visible", async () => {
    const user = userEvent.setup();
    function InfiniteDialog({ depth }: { depth: number }): ReactElement {
      const { toggled, enable, disable } = useToggle();

      return (
        <>
          <Button onClick={enable}>{`Show ${depth}`}</Button>
          <Dialog
            aria-label={`Dialog ${depth}`}
            visible={toggled}
            onRequestClose={disable}
            overlayProps={{
              "data-testid": `overlay${depth}`,
            }}
          >
            <InfiniteDialog depth={depth + 1} />
          </Dialog>
        </>
      );
    }

    rmdRender(
      <Test>
        <InfiniteDialog depth={1} />
      </Test>
    );

    await user.click(screen.getByRole("button", { name: "Show" }));

    const overlay = screen.getByTestId("overlay");
    expect(overlay.className).toMatchSnapshot();

    await user.click(screen.getByRole("button", { name: "Show 1" }));

    const overlay1 = screen.getByTestId("overlay1");
    expect(overlay.className).toMatchSnapshot();
    expect(overlay1.className).toMatchSnapshot();

    await user.click(screen.getByRole("button", { name: "Show 2" }));
    expect(overlay.className).toMatchSnapshot();
    expect(overlay1.className).toMatchSnapshot();
  });
});

describe("dialog class name utility", () => {
  it("should be callable with no arguments", () => {
    expect(dialog()).toMatchSnapshot();
  });
});
