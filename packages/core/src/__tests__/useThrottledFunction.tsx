import { type ReactElement, type RefObject, useEffect, useState } from "react";
import { describe, expect, it, vi } from "vitest";

import { Button } from "../button/Button.js";
import { TextField } from "../form/TextField.js";
import {
  act,
  fireEvent,
  render,
  screen,
  userEvent,
  waitFor,
} from "../test-utils/index.js";
import { useThrottledFunction } from "../useThrottledFunction.js";

function SyncTest(): ReactElement {
  const [throttledValue, setThrottledValue] = useState("");
  const [normalValue, setNormalValue] = useState("");
  const throttled = useThrottledFunction((value: string) => {
    setThrottledValue(value);
  }, 500);

  return (
    <>
      <div data-testid="value">{throttledValue}</div>
      <TextField
        label="Field"
        value={normalValue}
        onChange={(event) => {
          const { value } = event.currentTarget;

          setNormalValue(value);
          throttled(value);
        }}
      />
    </>
  );
}

const fakeFetch = vi.fn((search: string) =>
  Promise.resolve({
    json: () => Promise.resolve({ search }),
  })
);

interface AsyncTestProps {
  unmounted: RefObject<boolean>;
  onUnmounted: () => void;
}

function AsyncTest(props: AsyncTestProps): ReactElement {
  const { unmounted, onUnmounted } = props;

  const [normalValue, setNormalValue] = useState("");
  const [throttledValue, setThrottledValue] = useState("");
  const throttled = useThrottledFunction(async (value: string) => {
    const response = await fakeFetch(value);
    const json = await response.json();
    if (unmounted.current) {
      onUnmounted();
      return;
    }

    // have to wrap in act since it's async updates
    act(() => {
      setThrottledValue(json.search);
    });
  }, 500);

  useEffect(() => {
    return () => {
      unmounted.current = true;
    };
  }, [unmounted]);

  return (
    <>
      <div data-testid="value">{throttledValue}</div>
      <TextField
        label="Field"
        value={normalValue}
        onChange={(event) => {
          const { value } = event.currentTarget;

          setNormalValue(value);
          void throttled(value);
        }}
      />
    </>
  );
}

describe("useThrottledFunction", () => {
  it("should throttle functions correctly by prevent setting state after unmounting and preventing stale closures during re-rendering", async () => {
    const user = userEvent.setup();
    const { unmount } = render(<SyncTest />);
    const value = screen.getByTestId("value");
    const field = screen.getByRole("textbox", { name: "Field" });
    expect(value).toHaveTextContent("");
    expect(field).toHaveValue("");

    await user.type(field, "Hello");
    expect(value).toHaveTextContent("H");
    expect(field).toHaveValue("Hello");

    await waitFor(() => {
      expect(value).toHaveTextContent("Hello");
    });
    await waitFor(() => {
      expect(field).toHaveValue("Hello");
    });

    await user.type(field, " world!");
    expect(value).toHaveTextContent("Hello");
    expect(field).toHaveValue("Hello world!");

    unmount();
    expect(value).toHaveTextContent("Hello");
    expect(field).toHaveValue("Hello world!");
    expect(value).not.toBeInTheDocument();
    expect(field).not.toBeInTheDocument();
  });

  it("should support async functions but they require custom unmount logic", () => {
    vi.useFakeTimers();

    const unmounted = { current: false };
    const onUnmounted = vi.fn();
    render(<AsyncTest unmounted={unmounted} onUnmounted={onUnmounted} />);

    act(() => {
      vi.runAllTimers();
    });
    const value = screen.getByTestId("value");
    const field = screen.getByRole("textbox", { name: "Field" });
    expect(value).toHaveTextContent("");
    expect(field).toHaveValue("");
    expect(onUnmounted).not.toHaveBeenCalled();
    expect(unmounted.current).toBe(false);

    // pretend typing. can't use userEvent here since I have fake timers
    fireEvent.change(field, { value: "H" });
    act(() => {
      vi.advanceTimersByTime(20);
    });
    fireEvent.change(field, { target: { value: "He" } });
    act(() => {
      vi.advanceTimersByTime(20);
    });
    fireEvent.change(field, { target: { value: "Hel" } });
    act(() => {
      vi.advanceTimersByTime(20);
    });
    fireEvent.change(field, { target: { value: "Hell" } });
    act(() => {
      vi.advanceTimersByTime(20);
    });
    fireEvent.change(field, { target: { value: "Hello" } });

    expect(value).toHaveTextContent("");
    expect(field).toHaveValue("Hello");
    act(() => {
      vi.runOnlyPendingTimers();
    });
    expect(value).toHaveTextContent("");
    expect(field).toHaveValue("Hello");
  });

  it("should allow the timeout to be cancelled", async () => {
    vi.useFakeTimers();
    const user = userEvent.setup({ delay: null });
    const fired = vi.fn();

    function Test() {
      const [value, setValue] = useState("");
      const handleChange = useThrottledFunction((value: string) => {
        fired(value);
        setValue(value);
      }, 500);

      return (
        <>
          <div data-testid="output">{value}</div>
          <TextField
            label="Field"
            onChange={(event) => {
              handleChange(event.currentTarget.value);
            }}
          />
          <Button
            onClick={() => {
              handleChange.cancel();
            }}
          >
            Cancel
          </Button>
        </>
      );
    }

    render(<Test />);
    const field = screen.getByRole("textbox", { name: "Field" });
    const output = screen.getByTestId("output");
    const cancel = screen.getByRole("button", { name: "Cancel" });

    expect(output).toHaveTextContent("");
    expect(field).toHaveValue("");

    await user.type(field, "Hello, world!");
    expect(fired).toHaveBeenCalledWith("H");
    expect(output).toHaveTextContent("H");
    expect(field).toHaveValue("Hello, world!");

    await user.click(cancel);
    act(() => {
      vi.runAllTimers();
    });

    expect(fired).toHaveBeenCalledTimes(1);
    expect(output).toHaveTextContent("H");
    expect(field).toHaveValue("Hello, world!");
  });
});
