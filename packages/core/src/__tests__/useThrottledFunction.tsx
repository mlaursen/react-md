import { describe, expect, it, jest } from "@jest/globals";
import type { MutableRefObject, ReactElement } from "react";
import { useEffect, useState } from "react";
import {
  act,
  fireEvent,
  render,
  userEvent,
  waitFor,
} from "../test-utils/index.js";

import { TextField } from "../form/TextField.js";
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

const fakeFetch = jest.fn((search: string) =>
  Promise.resolve({
    json: () => Promise.resolve({ search }),
  })
);

interface AsyncTestProps {
  unmounted: MutableRefObject<boolean>;
  onUnmounted(): void;
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
          throttled(value);
        }}
      />
    </>
  );
}

describe("useThrottledFunction", () => {
  it("should throttle functions correctly by prevent setting state after unmounting and preventing stale closures during re-rendering", async () => {
    const user = userEvent.setup();
    const { getByRole, getByTestId, unmount } = render(<SyncTest />);
    const value = getByTestId("value");
    const field = getByRole("textbox", { name: "Field" });
    expect(value).toHaveTextContent("");
    expect(field).toHaveValue("");

    await user.type(field, "Hello");
    expect(value).toHaveTextContent("H");
    expect(field).toHaveValue("Hello");

    await waitFor(() => {
      expect(value).toHaveTextContent("Hello");
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
    jest.useFakeTimers();

    const unmounted = { current: false };
    const onUnmounted = jest.fn();
    const { getByRole, getByTestId } = render(
      <AsyncTest unmounted={unmounted} onUnmounted={onUnmounted} />
    );

    act(() => {
      jest.runAllTimers();
    });
    const value = getByTestId("value");
    const field = getByRole("textbox", { name: "Field" });
    expect(value).toHaveTextContent("");
    expect(field).toHaveValue("");
    expect(onUnmounted).not.toHaveBeenCalled();
    expect(unmounted.current).toBe(false);

    // pretend typing. can't use userEvent here since I have fake timers
    fireEvent.change(field, { value: "H" });
    act(() => {
      jest.advanceTimersByTime(20);
    });
    fireEvent.change(field, { target: { value: "He" } });
    act(() => {
      jest.advanceTimersByTime(20);
    });
    fireEvent.change(field, { target: { value: "Hel" } });
    act(() => {
      jest.advanceTimersByTime(20);
    });
    fireEvent.change(field, { target: { value: "Hell" } });
    act(() => {
      jest.advanceTimersByTime(20);
    });
    fireEvent.change(field, { target: { value: "Hello" } });

    expect(value).toHaveTextContent("");
    expect(field).toHaveValue("Hello");
    act(() => {
      jest.runOnlyPendingTimers();
    });
    expect(value).toHaveTextContent("");
    expect(field).toHaveValue("Hello");
  });
});
