import { describe, expect, it, jest } from "@jest/globals";
import { fireEvent } from "@testing-library/dom";
import type { ReactElement } from "react";
import { render, screen } from "../test-utils/index.js";
import { useEnsuredState } from "../useEnsuredState.js";
import { useToggle } from "../useToggle.js";

const CONTROLLED_ERROR =
  "Both a `value` and `setValue` must be defined for controlled components.";
const MISSING_DEFAULT_VALUE_ERROR =
  "A `defaultValue` must be defined for uncontrolled components.";

describe("useEnsuredState", () => {
  it("should throw an error in dev if not both value and setValue are set together", () => {
    const error = jest.spyOn(console, "error").mockImplementation(() => {});
    function Test1(): null {
      useEnsuredState({ value: "" });
      return null;
    }
    function Test2(): null {
      useEnsuredState({ setValue: () => {} });
      return null;
    }

    expect(() => render(<Test1 />)).toThrow(CONTROLLED_ERROR);
    expect(() => render(<Test2 />)).toThrow(CONTROLLED_ERROR);

    error.mockRestore();
  });

  it("should throw an error if the value, setValue, and defaultValue are undefined", () => {
    const error = jest.spyOn(console, "error").mockImplementation(() => {});
    function Test1(): null {
      useEnsuredState({});
      return null;
    }
    function Test2(): null {
      useEnsuredState({ defaultValue: null });
      return null;
    }

    expect(() => render(<Test1 />)).toThrow(MISSING_DEFAULT_VALUE_ERROR);
    expect(() => render(<Test2 />)).not.toThrow();

    error.mockRestore();
  });

  it("should throw an error if changing the controlled state", () => {
    const error = jest.spyOn(console, "error").mockImplementation(() => {});
    function Test(): ReactElement {
      const { toggled, toggle } = useToggle();
      const controlled = {
        value: "",
        setValue: () => {},
      };
      const uncontrolled = { defaultValue: "" };
      useEnsuredState(toggled ? controlled : uncontrolled);

      return (
        <button type="button" onClick={toggle}>
          Toggle
        </button>
      );
    }

    render(<Test />);

    const button = screen.getByRole("button", { name: "Toggle" });
    expect(() => fireEvent.click(button)).toThrow(
      "Rendered fewer hooks than expected. This may be caused by an accidental early return statement."
    );

    error.mockRestore();
  });
});
