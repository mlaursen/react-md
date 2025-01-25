import { afterEach, describe, expect, it, jest } from "@jest/globals";
import { type ReactElement, type Ref, createRef, useId, useRef } from "react";

import { Button } from "../../button/Button.js";
import {
  act,
  render,
  rmdRender,
  screen,
  userEvent,
  waitFor,
} from "../../test-utils/index.js";
import { testImmediateRaf } from "../../test-utils/jest-globals/timers.js";
import { TRANSITION_CONFIG } from "../../transition/config.js";
import { SCALE_CLASSNAMES } from "../../transition/useScaleTransition.js";
import { Typography } from "../../typography/Typography.js";
import { useToggle } from "../../useToggle.js";
import { DialogContent } from "../DialogContent.js";
import { DialogFooter } from "../DialogFooter.js";
import { DialogHeader } from "../DialogHeader.js";
import { DialogTitle } from "../DialogTitle.js";
import { FixedDialog, type FixedDialogProps } from "../FixedDialog.js";

type TestProps = Omit<
  FixedDialogProps,
  "fixedTo" | "visible" | "onRequestClose"
> & {
  nodeRef?: Ref<HTMLDivElement>;
  defaultVisible?: boolean;
};

function Test(props: TestProps): ReactElement {
  const { defaultVisible = false, nodeRef, ...remaining } = props;
  const fixedTo = useRef<HTMLButtonElement>(null);
  const {
    toggled: visible,
    enable: showDialog,
    disable: hideDialog,
  } = useToggle(defaultVisible);
  const titleId = useId();
  return (
    <>
      <Button ref={fixedTo} onClick={showDialog}>
        Button
      </Button>
      <FixedDialog
        {...remaining}
        aria-labelledby={titleId}
        ref={nodeRef}
        fixedTo={fixedTo}
        visible={visible}
        onRequestClose={hideDialog}
      >
        <DialogHeader>
          <DialogTitle id={titleId}>Hello, world!</DialogTitle>
        </DialogHeader>
        <DialogContent>
          <Typography margin="none">Additional content</Typography>
        </DialogContent>
        <DialogFooter>
          <Button onClick={hideDialog}>OK</Button>
        </DialogFooter>
      </FixedDialog>
    </>
  );
}

describe("FixedDialog", () => {
  afterEach(() => {
    jest.useRealTimers();
    TRANSITION_CONFIG.disabled = true;
  });

  it("should apply the correct styling, HTMLAttributes, and allow a ref", () => {
    const ref = createRef<HTMLDivElement>();

    const { rerender } = render(<Test nodeRef={ref} defaultVisible />);
    const dialog = screen.getByRole("dialog", { name: "Hello, world!" });
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
    expect(ref.current).toBe(dialog);
    expect(dialog).toMatchSnapshot();

    rerender(
      <Test
        nodeRef={ref}
        defaultVisible
        style={{ color: "orange" }}
        className="custom-class-name"
      />
    );
    expect(dialog).toHaveStyle("color: orange");
    expect(dialog).toHaveClass("custom-class-name");
    expect(dialog).toMatchSnapshot();
  });

  it("should default to hiding the overlay", async () => {
    const user = userEvent.setup();
    const { rerender } = rmdRender(
      <Test overlayProps={{ "data-testid": "overlay" }} />
    );

    expect(() => screen.getByRole("dialog")).toThrow();
    expect(() => screen.getByTestId("overlay")).toThrow();
    const button = screen.getByRole("button", { name: "Button" });
    await user.click(button);

    const overlay = screen.getByTestId("overlay");
    expect(overlay).not.toHaveClass("rmd-overlay--active");

    rerender(
      <Test overlayProps={{ "data-testid": "overlay" }} overlayHidden={false} />
    );
    expect(overlay).toHaveClass("rmd-overlay--active");
  });

  it("should default to using the SCALE_CLASSNAMES over the DEFAULT_DIALOG_CLASSNAMES for the transition", async () => {
    jest.useFakeTimers();
    TRANSITION_CONFIG.disabled = false;

    const user = userEvent.setup({
      delay: null,
    });
    rmdRender(<Test overlayProps={{ "data-testid": "overlay" }} />);

    await user.click(screen.getByRole("button", { name: "Button" }));
    const dialog = screen.getByRole("dialog", { name: "Hello, world!" });
    expect(dialog).toHaveClass(SCALE_CLASSNAMES.enter);
    expect(dialog).toHaveClass(SCALE_CLASSNAMES.enterActive);
    act(() => {
      jest.runOnlyPendingTimers();
    });
    expect(dialog).not.toHaveClass(SCALE_CLASSNAMES.enter);
    expect(dialog).not.toHaveClass(SCALE_CLASSNAMES.enterActive);

    act(() => {
      jest.runOnlyPendingTimers();
    });
    await user.click(screen.getByTestId("overlay"));
    expect(dialog).toHaveClass(SCALE_CLASSNAMES.exit);
    expect(dialog).toHaveClass(SCALE_CLASSNAMES.exitActive);
    act(() => {
      jest.runOnlyPendingTimers();
    });
    expect(dialog).not.toBeInTheDocument();
  });

  it("should default to allowing the user to scroll the page while the dialog is visible", () => {
    const { rerender } = render(<Test defaultVisible />);
    expect(document.body).not.toHaveStyle("overflow: hidden");

    rerender(<Test defaultVisible disableScrollLock={false} />);
    expect(document.body).toHaveStyle("overflow: hidden");
  });

  it("should prevent refocusing the fixedTo element when it is no longer visible in the viewport to prevent scrolling back to that element", async () => {
    const user = userEvent.setup();
    const raf = testImmediateRaf();
    rmdRender(<Test />);
    const button = screen.getByRole("button", { name: "Button" });

    await user.click(button);
    let dialog = screen.getByRole("dialog", { name: "Hello, world!" });
    expect(dialog).toHaveFocus();

    await user.keyboard("[Escape]");
    expect(dialog).not.toBeInTheDocument();
    await waitFor(() => {
      expect(button).toHaveFocus();
    });

    await user.click(button);
    dialog = screen.getByRole("dialog", { name: "Hello, world!" });
    expect(dialog).toHaveFocus();

    jest.spyOn(button, "getBoundingClientRect").mockReturnValue({
      ...document.body.getBoundingClientRect(),
      top: -300,
      bottom: -200,
    });
    jest.spyOn(dialog, "getBoundingClientRect").mockReturnValueOnce({
      ...document.body.getBoundingClientRect(),
      top: -280,
      bottom: -100,
    });
    act(() => {
      const scrollEvent = new UIEvent("scroll");
      window.dispatchEvent(scrollEvent);
    });
    expect(dialog).not.toBeInTheDocument();
    expect(button).not.toHaveFocus();
    expect(document.body).toHaveFocus();

    raf.mockRestore();
  });
});
