import { describe, expect, it, jest } from "@jest/globals";
import { useState } from "react";
import {
  act,
  fireEvent,
  render,
  screen,
  userEvent,
  waitFor,
} from "../test-utils/index.js";

import { Button } from "../button/Button.js";
import { TextField } from "../form/TextField.js";
import { useDebouncedFunction } from "../useDebouncedFunction.js";

function setup(delay?: number | null) {
  const fired = jest.fn();
  const user = userEvent.setup({ delay });
  function Test() {
    const [value, setValue] = useState("");
    // can't use event here because of react not persisting events by default
    const handleChange = useDebouncedFunction((value: string) => {
      fired(value);
      setValue(value);
    }, 500);

    return (
      <>
        <div data-testid="output">{value}</div>
        <TextField
          label="Field"
          onChange={(event) => handleChange(event.currentTarget.value)}
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

  const { unmount } = render(<Test />);
  const output = screen.getByTestId("output");
  const field = screen.getByRole("textbox", { name: "Field" });
  const cancel = screen.getByRole("button", { name: "Cancel" });

  return { fired, user, output, cancel, field, unmount };
}

describe("useDebouncedFunction", () => {
  it("should trigger a function once every X seconds and cleanup any pending timeouts on unmount", async () => {
    const { fired, user, output, field, unmount } = setup();

    expect(output).toHaveTextContent("");
    expect(field).toHaveValue("");

    await user.type(field, "Hello, world!");
    expect(output).toHaveTextContent("");
    expect(field).toHaveValue("Hello, world!");

    await waitFor(() => {
      expect(output).toHaveTextContent("Hello, world!");
    });
    await waitFor(() => {
      expect(field).toHaveValue("Hello, world!");
    });
    expect(fired).toHaveBeenCalledTimes(1);
    expect(fired).toHaveBeenCalledWith("Hello, world!");

    jest.useFakeTimers();

    fireEvent.change(field, { target: { value: "Hello, w" } });
    unmount();
    act(() => {
      jest.runAllTimers();
    });
    expect(fired).toHaveBeenCalledTimes(1);
  });

  it("should allow the timeout to be cancelled manually", async () => {
    jest.useFakeTimers();
    const { user, fired, cancel, output, field } = setup(null);

    expect(output).toHaveTextContent("");
    expect(field).toHaveValue("");

    await user.type(field, "Hello, world!");
    expect(output).toHaveTextContent("");
    expect(field).toHaveValue("Hello, world!");

    act(() => {
      jest.advanceTimersByTime(300);
    });

    expect(fired).not.toHaveBeenCalled();
    await user.click(cancel);
    act(() => {
      jest.runAllTimers();
    });

    expect(fired).not.toHaveBeenCalled();
    expect(output).toHaveTextContent("");
    expect(field).toHaveValue("Hello, world!");
  });
});
