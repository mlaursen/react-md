import React, { useState } from "react";
import { render } from "@testing-library/react";

import { useOnUnmount } from "../useOnUnmount";
import userEvent from "@testing-library/user-event";

describe("useOnUnmount", () => {
  it("should work correctly", () => {
    const callback = jest.fn();
    function Test() {
      useOnUnmount(callback);

      return null;
    }

    const { unmount, rerender } = render(<Test />);
    expect(callback).not.toBeCalled();

    rerender(<Test />);
    expect(callback).not.toBeCalled();

    unmount();
    expect(callback).toBeCalledTimes(1);
  });

  it("should ensure the callback function doesn't have a stale closure", () => {
    const callback = jest.fn();
    function Test() {
      const [value, setValue] = useState("");

      useOnUnmount(() => {
        callback(value);
      });

      return (
        <input
          type="text"
          value={value}
          onChange={(event) => setValue(event.currentTarget.value)}
        />
      );
    }

    const { getByRole, unmount } = render(<Test />);
    const input = getByRole("textbox");

    userEvent.type(input, "my new value");
    expect(callback).not.toBeCalled();

    unmount();
    expect(callback).toBeCalledWith("my new value");
  });
});
