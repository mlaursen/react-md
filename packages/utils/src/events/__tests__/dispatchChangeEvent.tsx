import React from "react";
import { fireEvent, render } from "@testing-library/react";

import { dispatchChangeEvent } from "../dispatchChangeEvent";

describe("dispatchChangeEvent", () => {
  it("should do nothing if the target is not an HTMLInputElement", () => {
    let success = false;
    const onChange = jest.fn();
    function Test() {
      return (
        <textarea
          onChange={onChange}
          onKeyDown={(event) => {
            if (event.key === "ArrowUp") {
              success = dispatchChangeEvent(event.currentTarget, "New Value");
            }
          }}
        />
      );
    }

    const { getByRole } = render(<Test />);
    const area = getByRole("textbox");

    fireEvent.keyDown(area, { key: "ArrowUp" });
    expect(success).toBe(false);
    expect(onChange).not.toBeCalled();
  });

  it("should correctly call the onChange event for HTMLInputElement", () => {
    let success = false;
    const onChange = jest.fn();
    function Test() {
      return (
        <input
          type="text"
          onChange={onChange}
          onKeyDown={(event) => {
            if (event.key === "ArrowUp") {
              success = dispatchChangeEvent(event.currentTarget, "New Value");
            }
          }}
        />
      );
    }

    const { getByRole } = render(<Test />);
    const input = getByRole("textbox");

    fireEvent.keyDown(input, { key: "ArrowUp" });
    expect(success).toBe(true);
    expect(onChange).toBeCalledTimes(1);
  });
});
