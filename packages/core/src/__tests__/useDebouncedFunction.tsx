import { describe, expect, it, jest } from "@jest/globals";
import { useState } from "react";
import {
  act,
  fireEvent,
  render,
  userEvent,
  waitFor,
} from "../test-utils/index.js";

import { TextField } from "../form/TextField.js";
import { useDebouncedFunction } from "../useDebouncedFunction.js";

describe("useDebouncedFunction", () => {
  it("should trigger a function once every X seconds and cleanup any pending timeouts on unmount", async () => {
    const fired = jest.fn();
    const user = userEvent.setup();
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
        </>
      );
    }

    const { getByRole, getByTestId, unmount } = render(<Test />);
    const output = getByTestId("output");
    const field = getByRole("textbox", { name: "Field" });

    expect(output).toHaveTextContent("");
    expect(field).toHaveValue("");

    await user.type(field, "Hello, world!");
    expect(output).toHaveTextContent("");
    expect(field).toHaveValue("Hello, world!");

    await waitFor(() => {
      expect(output).toHaveTextContent("Hello, world!");
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
});
