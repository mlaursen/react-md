import { act, fireEvent, render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";

import { TextField } from "../form";
import { useDebouncedFunction } from "../useDebouncedFunction";

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
