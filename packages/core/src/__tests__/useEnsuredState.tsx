import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  jest,
} from "@jest/globals";
import { type ReactElement } from "react";

import { fireEvent, render, screen } from "../test-utils/index.js";
import { useEnsuredState } from "../useEnsuredState.js";
import { useToggle } from "../useToggle.js";

const CONTROLLED_ERROR =
  "Both a `value` and `setValue` must be defined for controlled components.";
const MISSING_DEFAULT_VALUE_ERROR =
  "A `defaultValue` must be defined for uncontrolled components.";

let error: jest.SpiedFunction<typeof console.error>;
beforeEach(() => {
  error = jest.spyOn(console, "error").mockImplementation(() => {});
});

afterEach(() => {
  error.mockRestore();
});

describe("useEnsuredState", () => {
  it("should throw an error in dev if not both value and setValue are set together", () => {
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
  });

  it("should throw an error if the value, setValue, and defaultValue are undefined", () => {
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
  });

  it("should throw an error if changing the controlled state", () => {
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
  });

  it("should allow the name to be configured to improve debugging", () => {
    function Test1(): null {
      const { toggled } = useToggle();
      useEnsuredState({
        name: "visible",
        value: toggled,
      });

      return null;
    }
    function Test2(): null {
      const { toggle } = useToggle();
      useEnsuredState({
        name: "visible",
        setValue: toggle,
      });

      return null;
    }
    function Test3(): null {
      useEnsuredState({ name: "visible" });

      return null;
    }

    const visibleError = CONTROLLED_ERROR.replace("Value", "Visible").replace(
      "value",
      "visible"
    );
    const defaultVisibleError = MISSING_DEFAULT_VALUE_ERROR.replace(
      "Value",
      "Visible"
    );

    expect(() => render(<Test1 />)).toThrow(visibleError);
    expect(() => render(<Test2 />)).toThrow(visibleError);
    expect(() => render(<Test3 />)).toThrow(defaultVisibleError);
  });
});
