// comment
import React, { MouseEventHandler } from "react";
import { act, fireEvent, render } from "@testing-library/react";
import {
  HoverModeOnlyOptions,
  HoverModeOptions,
  useHoverMode,
} from "../useHoverMode";
import {
  HoverModeConfiguration,
  HoverModeProvider,
} from "../HoverModeProvider";
import {
  DEFAULT_HOVER_MODE_DEACTIVATION_TIME,
  DEFAULT_HOVER_MODE_STICKY_EXIT_TIME,
  DEFAULT_HOVER_MODE_VISIBLE_IN_TIME,
} from "../constants";

beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.clearAllTimers();
});

describe("Hover Mode", () => {
  type Options = HoverModeOnlyOptions<HTMLElement>;

  function Implementation({ options }: { options?: Options }) {
    const { visible, handlers } = useHoverMode<HTMLElement>(options);

    return (
      <>
        <button {...handlers} type="button">
          Button
        </button>
        {visible && <div role="dialog" id="dialog-id" aria-label="Dialog" />}
      </>
    );
  }

  interface Props {
    config?: HoverModeConfiguration;
    options?: Options;
  }

  function Test({ config, options }: Props) {
    return (
      <HoverModeProvider {...config}>
        <Implementation options={options} />
      </HoverModeProvider>
    );
  }

  it("should allow for the event handlers to be merged and prevent the behavior if they call event.stopPropagation()", () => {
    const onMouseEnter: MouseEventHandler<HTMLElement> = (event) =>
      event.stopPropagation();
    const onMouseLeave: MouseEventHandler<HTMLElement> = (event) =>
      event.stopPropagation();
    const { getByRole, rerender } = render(<Test options={{ onMouseEnter }} />);

    const button = getByRole("button");
    fireEvent.mouseEnter(button);
    act(() => {
      jest.runAllTimers();
    });
    expect(() => getByRole("dialog")).toThrow();

    rerender(<Test options={{ onMouseLeave }} />);
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
    expect(() => getByRole("dialog")).toThrow();

    fireEvent.mouseEnter(button);
    expect(() => getByRole("dialog")).not.toThrow();

    fireEvent.mouseLeave(button);
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
    const { getByRole } = render(<Test config={{ disabled: true }} />);

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
  function Implementation(props: HoverModeOptions<HTMLElement>) {
    const { visible, handlers, stickyHandlers } = useHoverMode({
      ...props,
      sticky: true,
    });

    return (
      <>
        <button {...stickyHandlers} type="button">
          Button
        </button>
        {visible && (
          <div role="dialog" id="dialog-id" aria-label="Dialog" {...handlers} />
        )}
      </>
    );
  }

  function Test(props: HoverModeOptions<HTMLElement>) {
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
      jest.advanceTimersByTime(DEFAULT_HOVER_MODE_STICKY_EXIT_TIME);
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
      jest.advanceTimersByTime(DEFAULT_HOVER_MODE_STICKY_EXIT_TIME);
    });

    expect(() => getByRole("dialog")).not.toThrow();
    act(() => {
      jest.advanceTimersByTime(200);
    });
    expect(() => getByRole("dialog")).toThrow();
  });

  it("should do nothing onClick if disabled or the onClick handler calls event.stopPropagation()", () => {
    const { getByRole, rerender } = render(<Test disabled />);
    const button = getByRole("button");

    fireEvent.click(button);
    expect(() => getByRole("dialog")).toThrow();

    const onClick: MouseEventHandler<HTMLElement> = (event) =>
      event.stopPropagation();
    rerender(<Test onClick={onClick} />);
    fireEvent.click(button);
    expect(() => getByRole("dialog")).toThrow();
  });
});

describe("Type Checking", () => {
  it("should not return the sticky handlers if no options are provided or the sticky option is false", () => {
    let result: any;
    function Test1() {
      const _result = useHoverMode();
      // @ts-expect-error
      _result.stuck;
      // @ts-expect-error
      _result.stickyHandlers;
      result = _result;
      return null;
    }
    function Test2() {
      const _result = useHoverMode({ sticky: false });
      // @ts-expect-error
      _result.stuck;
      // @ts-expect-error
      _result.stickyHandlers;
      result = _result;
      return null;
    }

    const { rerender } = render(<Test1 />);
    expect(result.stuck).toBeUndefined();
    expect(result.stickyHandlers).toBeUndefined();

    rerender(<Test2 />);
    expect(result.stuck).toBeUndefined();
    expect(result.stickyHandlers).toBeUndefined();
  });
});
