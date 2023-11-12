import { describe, expect, it, jest } from "@jest/globals";
import { type ReactElement } from "react";
import { Button } from "../../button/Button.js";
import {
  rmdRender,
  screen,
  userEvent,
  waitFor,
} from "../../test-utils/index.js";
import { TRANSITION_CONFIG } from "../../transition/config.js";
import { useScaleTransition } from "../../transition/useScaleTransition.js";
import { useToggle } from "../../useToggle.js";
import {
  useFocusContainer,
  type FocusContainerOptions,
} from "../useFocusContainer.js";

function Test(
  props: Omit<FocusContainerOptions<HTMLDivElement>, "activate"> & {
    autoFocus?: boolean;
    disableChildren?: boolean;
  }
): ReactElement {
  const { autoFocus, disableChildren, ...options } = props;
  const { disableTransition } = options;
  const { toggled, enable, disable } = useToggle(false);

  const { eventHandlers, transitionOptions } = useFocusContainer({
    ...options,
    activate: toggled,
  });
  const { elementProps, rendered } = useScaleTransition({
    transitionIn: toggled,
    temporary: true,
    ...transitionOptions,
    appear: !disableTransition,
    enter: !disableTransition,
    exit: !disableTransition,
  });

  return (
    <>
      <Button onClick={enable}>Show</Button>
      {rendered && (
        <div
          data-testid="container"
          {...eventHandlers}
          {...elementProps}
          tabIndex={-1}
        >
          {!disableChildren && (
            <>
              <Button autoFocus={autoFocus} onClick={disable}>
                Button 1
              </Button>
              <Button onClick={disable}>Button 2</Button>
              <Button onClick={disable}>Button 3</Button>
              <Button onClick={disable}>Button 4</Button>
            </>
          )}
        </div>
      )}
    </>
  );
}

describe("useFocusContainer", () => {
  it("should correctly call the transition callbacks", async () => {
    TRANSITION_CONFIG.disabled = false;

    const user = userEvent.setup();
    const onEntering = jest.fn();
    const onEntered = jest.fn();
    const onExiting = jest.fn();
    const onExited = jest.fn();
    rmdRender(
      <Test
        onEntering={onEntering}
        onEntered={onEntered}
        onExiting={onExiting}
        onExited={onExited}
      />
    );

    expect(onEntering).not.toHaveBeenCalled();
    expect(onEntered).not.toHaveBeenCalled();
    expect(onExiting).not.toHaveBeenCalled();
    expect(onExited).not.toHaveBeenCalled();

    await user.click(screen.getByRole("button", { name: "Show" }));
    await waitFor(() => {
      expect(onEntering).toHaveBeenCalled();
    });
    expect(onEntered).not.toHaveBeenCalled();
    expect(onExiting).not.toHaveBeenCalled();
    expect(onExited).not.toHaveBeenCalled();

    await waitFor(() => {
      expect(onEntered).toHaveBeenCalled();
    });

    await user.click(screen.getByRole("button", { name: "Button 1" }));
    expect(onEntering).toHaveBeenCalled();
    expect(onEntered).toHaveBeenCalled();
    expect(onExiting).toHaveBeenCalled();
    expect(onExited).not.toHaveBeenCalled();

    await waitFor(() => {
      expect(onExited).toHaveBeenCalled();
    });
  });

  it("should capture the previous focus and refocus that element when entering and then exiting when transitions are enabled", async () => {
    TRANSITION_CONFIG.disabled = false;

    const user = userEvent.setup();
    const onEntering = jest.fn();
    const onEntered = jest.fn();
    const onExiting = jest.fn();
    const onExited = jest.fn();
    rmdRender(
      <Test
        onEntering={onEntering}
        onEntered={onEntered}
        onExiting={onExiting}
        onExited={onExited}
      />
    );
    const showButton = screen.getByRole("button", { name: "Show" });

    expect(document.activeElement).toBe(document.body);
    await user.click(showButton);

    const container = screen.getByTestId("container");
    await waitFor(() => {
      expect(onEntering).toHaveBeenCalled();
    });
    expect(onEntered).not.toHaveBeenCalled();
    expect(document.activeElement).toBe(container);
    expect(onExiting).not.toHaveBeenCalled();
    await waitFor(() => {
      expect(onEntered).toHaveBeenCalled();
    });
    expect(document.activeElement).toBe(container);

    await user.click(screen.getByRole("button", { name: "Button 1" }));
    await waitFor(() => {
      expect(onExiting).toHaveBeenCalled();
    });
    // have to await because of the raf. this might cause a timing issue at some point with the onExited...
    await waitFor(() => {
      expect(document.activeElement).toBe(showButton);
    });
    expect(onExited).not.toHaveBeenCalled();

    await waitFor(() => {
      expect(onExited).toHaveBeenCalled();
    });
    expect(document.activeElement).toBe(showButton);
  });

  it("should still move focus when the disableTransition option is true", async () => {
    TRANSITION_CONFIG.disabled = false;

    const user = userEvent.setup();
    const onEntering = jest.fn();
    const onEntered = jest.fn();
    const onExiting = jest.fn();
    const onExited = jest.fn();
    rmdRender(
      <Test
        onEntering={onEntering}
        onEntered={onEntered}
        onExiting={onExiting}
        onExited={onExited}
        disableTransition
      />
    );
    const showButton = screen.getByRole("button", { name: "Show" });

    expect(document.activeElement).toBe(document.body);
    await user.click(showButton);

    const container = screen.getByTestId("container");
    expect(onEntering).not.toHaveBeenCalled();
    expect(onEntered).toHaveBeenCalled();
    expect(document.activeElement).toBe(container);

    await user.click(screen.getByRole("button", { name: "Button 1" }));
    expect(onExiting).not.toHaveBeenCalled();
    expect(onExited).toHaveBeenCalled();
    await waitFor(() => {
      expect(document.activeElement).toBe(showButton);
    });
  });

  it("should still move focus when the TRANSITION_CONFIG.disabled is true", async () => {
    const user = userEvent.setup();
    const onEntering = jest.fn();
    const onEntered = jest.fn();
    const onExiting = jest.fn();
    const onExited = jest.fn();
    rmdRender(
      <Test
        onEntering={onEntering}
        onEntered={onEntered}
        onExiting={onExiting}
        onExited={onExited}
      />
    );
    const showButton = screen.getByRole("button", { name: "Show" });

    expect(document.activeElement).toBe(document.body);
    await user.click(showButton);

    const container = screen.getByTestId("container");
    expect(onEntering).not.toHaveBeenCalled();
    expect(onEntered).toHaveBeenCalled();
    expect(document.activeElement).toBe(container);

    await user.click(screen.getByRole("button", { name: "Button 1" }));
    expect(onExiting).not.toHaveBeenCalled();
    expect(onExited).toHaveBeenCalled();
    await waitFor(() => {
      expect(document.activeElement).toBe(showButton);
    });
  });

  it("should not move focus to the container element if one of the children has autoFocus enabled or has been programmatically focused", async () => {
    const user = userEvent.setup();
    rmdRender(<Test autoFocus />);

    await user.click(screen.getByRole("button", { name: "Show" }));
    expect(document.activeElement).toBe(
      screen.getByRole("button", { name: "Button 1" })
    );
  });

  it("should prevent tab focus from moving outside of the container element", async () => {
    const user = userEvent.setup();
    rmdRender(<Test />);

    await user.click(screen.getByRole("button", { name: "Show" }));

    const button1 = screen.getByRole("button", { name: "Button 1" });
    const button2 = screen.getByRole("button", { name: "Button 2" });
    const button3 = screen.getByRole("button", { name: "Button 3" });
    const button4 = screen.getByRole("button", { name: "Button 4" });

    await user.tab();
    expect(document.activeElement).toBe(button1);

    await user.tab({ shift: true });
    expect(document.activeElement).toBe(button4);

    await user.tab();
    expect(document.activeElement).toBe(button1);

    await user.tab();
    expect(document.activeElement).toBe(button2);

    await user.tab();
    expect(document.activeElement).toBe(button3);
  });

  it("should just stop tab focus if there are no focusable elements", async () => {
    const user = userEvent.setup();
    rmdRender(<Test disableChildren />);

    await user.click(screen.getByRole("button", { name: "Show" }));
    const container = screen.getByTestId("container");
    expect(document.activeElement).toBe(container);

    await user.tab();
    expect(document.activeElement).toBe(container);

    await user.tab({ shift: true });
    expect(document.activeElement).toBe(container);
  });
});
