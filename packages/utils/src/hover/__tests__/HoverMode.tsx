import type { MouseEventHandler } from "react";
import { act, fireEvent, render } from "@testing-library/react";
import type { HoverModeOptions, HoverModeEventHandlers } from "../useHoverMode";
import { useHoverMode } from "../useHoverMode";
import type { HoverModeConfiguration } from "../HoverModeProvider";
import { HoverModeProvider } from "../HoverModeProvider";
import {
  DEFAULT_HOVER_MODE_DEACTIVATION_TIME,
  DEFAULT_HOVER_MODE_EXIT_TIME,
  DEFAULT_HOVER_MODE_VISIBLE_IN_TIME,
} from "../constants";

beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.clearAllTimers();
});

describe("Hover Mode", () => {
  interface ImplementationProps extends Partial<HoverModeEventHandlers> {
    options?: HoverModeOptions;
  }
  function Implementation({
    options,
    onMouseEnter: propOnMouseEnter,
    onMouseLeave: propOnMouseLeave,
  }: ImplementationProps) {
    const { visible, onMouseEnter, onMouseLeave } = useHoverMode(options);

    return (
      <>
        <button
          type="button"
          onMouseEnter={(event) => {
            propOnMouseEnter?.(event);
            onMouseEnter(event);
          }}
          onMouseLeave={(event) => {
            propOnMouseLeave?.(event);
            onMouseLeave(event);
          }}
        >
          Button
        </button>
        {visible && <div role="dialog" id="dialog-id" aria-label="Dialog" />}
      </>
    );
  }

  interface Props extends ImplementationProps {
    config?: HoverModeConfiguration;
  }

  function Test({ config, ...props }: Props) {
    return (
      <HoverModeProvider {...config}>
        <Implementation {...props} />
      </HoverModeProvider>
    );
  }

  it("should allow for the event handlers to be merged and prevent the behavior if they call event.stopPropagation()", () => {
    const onMouseEnter: MouseEventHandler<HTMLElement> = (event) =>
      event.stopPropagation();
    const onMouseLeave: MouseEventHandler<HTMLElement> = (event) =>
      event.stopPropagation();
    const { getByRole, rerender } = render(
      <Test onMouseEnter={onMouseEnter} />
    );

    const button = getByRole("button");
    fireEvent.mouseEnter(button);
    act(() => {
      jest.runAllTimers();
    });
    expect(() => getByRole("dialog")).toThrow();

    rerender(<Test onMouseLeave={onMouseLeave} />);
    fireEvent.mouseEnter(button);
    act(() => {
      jest.runOnlyPendingTimers();
    });
    expect(() => getByRole("dialog")).not.toThrow();
    fireEvent.mouseLeave(button);
    expect(() => getByRole("dialog")).not.toThrow();
  });

  it("should work correctly with default options", () => {
    const { getByRole } = render(<Test />);

    const button = getByRole("button", { name: "Button" });
    fireEvent.mouseEnter(button);

    expect(() => getByRole("dialog")).toThrow();
    act(() => {
      jest.advanceTimersByTime(DEFAULT_HOVER_MODE_VISIBLE_IN_TIME);
    });
    expect(() => getByRole("dialog")).not.toThrow();

    fireEvent.mouseLeave(button);
    act(() => {
      jest.advanceTimersByTime(DEFAULT_HOVER_MODE_EXIT_TIME);
    });
    expect(() => getByRole("dialog")).toThrow();

    fireEvent.mouseEnter(button);
    expect(() => getByRole("dialog")).not.toThrow();

    fireEvent.mouseLeave(button);
    expect(() => getByRole("dialog")).not.toThrow();
    act(() => {
      jest.advanceTimersByTime(DEFAULT_HOVER_MODE_EXIT_TIME);
    });
    expect(() => getByRole("dialog")).toThrow();
    act(() => {
      jest.advanceTimersByTime(DEFAULT_HOVER_MODE_DEACTIVATION_TIME);
    });

    fireEvent.mouseEnter(button);
    expect(() => getByRole("dialog")).toThrow();
  });

  it("should never activate if disabled", () => {
    const { getByRole } = render(<Test options={{ disabled: true }} />);

    const button = getByRole("button", { name: "Button" });
    fireEvent.mouseEnter(button);

    expect(() => getByRole("dialog")).toThrow();
    act(() => {
      jest.advanceTimersByTime(DEFAULT_HOVER_MODE_VISIBLE_IN_TIME);
    });
    expect(() => getByRole("dialog")).toThrow();
  });

  it("should never enable hover mode if the config is disabled", () => {
    const { getByRole } = render(
      <Test config={{ disabled: true }} options={{ exitVisibilityDelay: 0 }} />
    );

    const button = getByRole("button", { name: "Button" });
    fireEvent.mouseEnter(button);
    act(() => {
      jest.runOnlyPendingTimers();
    });
    expect(() => getByRole("dialog")).not.toThrow();

    fireEvent.mouseLeave(button);
    fireEvent.mouseEnter(button);
    expect(() => getByRole("dialog")).toThrow();
  });

  it("should allow the element to be visible by default", () => {
    const { getByRole } = render(<Test options={{ defaultVisible: true }} />);
    expect(() => getByRole("dialog")).not.toThrow();
  });
});

describe("Sticky Hover Mode", () => {
  interface ImplementationProps
    extends HoverModeOptions,
      Partial<HoverModeEventHandlers> {}
  function Implementation({
    onClick: propOnClick,
    ...props
  }: ImplementationProps) {
    const { visible, onClick, hoverHandlers } = useHoverMode({
      ...props,
    });

    return (
      <>
        <button
          {...hoverHandlers}
          onClick={(event) => {
            propOnClick?.(event);
            onClick(event);
          }}
          type="button"
        >
          Button
        </button>
        {visible && (
          <div
            {...hoverHandlers}
            role="dialog"
            id="dialog-id"
            aria-label="Dialog"
          />
        )}
      </>
    );
  }

  function Test(props: ImplementationProps) {
    return (
      <HoverModeProvider>
        <Implementation {...props} />
      </HoverModeProvider>
    );
  }

  it("should work correctly", () => {
    const { getByRole } = render(<Test />);

    const button = getByRole("button");
    fireEvent.mouseEnter(button);
    fireEvent.click(button);

    expect(() => getByRole("dialog")).not.toThrow();
    fireEvent.mouseLeave(button);

    act(() => {
      jest.runOnlyPendingTimers();
    });

    expect(() => getByRole("dialog")).not.toThrow();

    fireEvent.click(button);
    expect(() => getByRole("dialog")).toThrow();
    act(() => {
      jest.runOnlyPendingTimers();
    });

    fireEvent.mouseEnter(button);
    const dialog = getByRole("dialog");

    fireEvent.mouseLeave(button);
    fireEvent.mouseEnter(dialog);
    act(() => {
      jest.runOnlyPendingTimers();
    });
    expect(() => getByRole("dialog")).not.toThrow();

    fireEvent.mouseLeave(dialog);
    act(() => {
      jest.advanceTimersByTime(DEFAULT_HOVER_MODE_EXIT_TIME);
    });
    expect(() => getByRole("dialog")).toThrow();
  });

  it("should allow for a custom exitVisibilityDelay", () => {
    const { getByRole } = render(<Test exitVisibilityDelay={500} />);
    const button = getByRole("button");
    fireEvent.mouseEnter(button);

    act(() => {
      jest.runOnlyPendingTimers();
    });
    const dialog = getByRole("dialog");

    fireEvent.mouseLeave(button);
    fireEvent.mouseEnter(dialog);

    act(() => {
      jest.runOnlyPendingTimers();
    });

    fireEvent.mouseLeave(dialog);
    act(() => {
      jest.advanceTimersByTime(DEFAULT_HOVER_MODE_EXIT_TIME);
    });

    expect(() => getByRole("dialog")).not.toThrow();
    act(() => {
      jest.advanceTimersByTime(200);
    });
    expect(() => getByRole("dialog")).toThrow();
  });

  it("should toggle the visibility onClick when the hover mode behavior is disabled", () => {
    const { getByRole } = render(<Test disabled />);
    const button = getByRole("button");

    fireEvent.click(button);
    expect(() => getByRole("dialog")).not.toThrow();

    fireEvent.click(button);
    expect(() => getByRole("dialog")).toThrow();
  });

  it("should do nothing onClick if the onClick handler calls event.stopPropagation()", () => {
    const onClick: MouseEventHandler<HTMLElement> = (event) => {
      event.stopPropagation();
    };
    const { getByRole } = render(<Test onClick={onClick} />);
    const button = getByRole("button");

    fireEvent.click(button);
    expect(() => getByRole("dialog")).toThrow();
  });
});
