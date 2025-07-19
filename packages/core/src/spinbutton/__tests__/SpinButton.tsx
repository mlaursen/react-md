import { type ReactElement, createRef, useState } from "react";
import { describe, expect, it, vi } from "vitest";

import { Button } from "../../button/Button.js";
import { Form } from "../../form/Form.js";
import {
  type ReactMDRenderOptions,
  render,
  screen,
  userEvent,
} from "../../test-utils/index.js";
import { type MinMaxRange } from "../../types.js";
import { SpinButton, type SpinButtonProps } from "../SpinButton.js";
import { type SpinButtonOptions, type SpinButtonValue } from "../types.js";

const setup = (
  props?: Partial<Omit<SpinButtonProps, "value" | "setValue">>,
  options?: ReactMDRenderOptions
) => {
  const label = props?.["aria-label"] ?? "Label";
  const user = userEvent.setup();
  const { rerender } = render(
    <SpinButton {...props} aria-label={label} />,
    options
  );
  const spinbutton = screen.getByRole("spinbutton", { name: label });

  return {
    user,
    spinbutton,
    rerender: (props?: Partial<Omit<SpinButtonProps, "value" | "setValue">>) =>
      rerender(
        <SpinButton {...props} aria-label={props?.["aria-label"] ?? label} />
      ),
  };
};

describe("SpinButton", () => {
  it("should apply the correct styling, HTML attributes, and allow a ref", () => {
    const ref = createRef<HTMLDivElement>();
    const props = {
      ref,
      "aria-label": "Example",
    } as const;

    const { rerender } = render(<SpinButton {...props} />);

    const spinbutton = screen.getByRole("spinbutton", { name: "Example" });
    expect(spinbutton).toMatchSnapshot();
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
    expect(ref.current).toBe(spinbutton);
    expect(spinbutton).toMatchSnapshot();

    rerender(
      <SpinButton
        {...props}
        style={{ color: "white" }}
        className="custom-class-name"
      />
    );
    expect(spinbutton).toMatchSnapshot();
  });

  it("should allow for a default value", () => {
    const { spinbutton } = setup({ defaultValue: 3 });

    expect(spinbutton).toHaveValue(3);
    expect(spinbutton).toHaveAttribute("aria-valuenow", "3");
    expect(spinbutton).not.toHaveAttribute("aria-valuetext");
    expect(spinbutton).toHaveTextContent("3");
  });

  it("should allow the value to be controlled", async () => {
    const user = userEvent.setup();
    function Test(): ReactElement {
      const [value, setValue] = useState<SpinButtonValue>(null);

      return (
        <>
          <Button onClick={() => setValue(null)}>Set null</Button>
          <Button onClick={() => setValue(3)}>Set 3</Button>
          <SpinButton
            aria-label="Example"
            value={value}
            onValueChange={({ value }) => setValue(value)}
          />
        </>
      );
    }

    render(<Test />);
    const setNull = screen.getByRole("button", { name: "Set null" });
    const set3 = screen.getByRole("button", { name: "Set 3" });
    const spinbutton = screen.getByRole("spinbutton", { name: "Example" });

    expect(spinbutton).not.toHaveAttribute("aria-valuenow");
    expect(spinbutton).toHaveAttribute("aria-valuetext", "No value selected");
    expect(spinbutton).toBeEmptyDOMElement();

    await user.click(set3);
    expect(spinbutton).toHaveValue(3);
    expect(spinbutton).toHaveAttribute("aria-valuenow", "3");
    expect(spinbutton).not.toHaveAttribute("aria-valuetext");
    expect(spinbutton).toHaveTextContent("3");

    await user.click(setNull);
    expect(spinbutton).not.toHaveAttribute("aria-valuenow");
    expect(spinbutton).toHaveAttribute("aria-valuetext", "No value selected");
    expect(spinbutton).toBeEmptyDOMElement();
  });

  it("should update the value as the user types", async () => {
    const { user, spinbutton } = setup();

    expect(spinbutton).not.toHaveAttribute("aria-valuenow");
    expect(spinbutton).toBeEmptyDOMElement();

    await user.type(spinbutton, "3");
    expect(spinbutton).toHaveValue(3);
    expect(spinbutton).toHaveAttribute("aria-valuenow", "3");
    expect(spinbutton).not.toHaveAttribute("aria-valuetext");
    expect(spinbutton).toHaveTextContent("3");

    await user.type(spinbutton, "0", { skipClick: true });
    expect(spinbutton).toHaveValue(30);
    expect(spinbutton).toHaveAttribute("aria-valuenow", "30");
    expect(spinbutton).not.toHaveAttribute("aria-valuetext");
    expect(spinbutton).toHaveTextContent("30");
  });

  it("should ignore leading zeros if the min/minDigits are not provided", async () => {
    const { user, spinbutton } = setup();

    expect(spinbutton).not.toHaveAttribute("aria-valuenow");
    expect(spinbutton).toHaveAttribute("aria-valuetext", "No value selected");
    expect(spinbutton).toBeEmptyDOMElement();

    await user.type(spinbutton, "00000");
    expect(spinbutton).toHaveValue(0);
    expect(spinbutton).toHaveAttribute("aria-valuenow", "0");
    expect(spinbutton).not.toHaveAttribute("aria-valuetext");
    expect(spinbutton).toHaveTextContent("0");

    await user.type(spinbutton, "1", { skipClick: true });
    expect(spinbutton).toHaveValue(1);
    expect(spinbutton).toHaveAttribute("aria-valuenow", "1");
    expect(spinbutton).not.toHaveAttribute("aria-valuetext");
    expect(spinbutton).toHaveTextContent("1");
  });

  it("should allow for a custom getValueText to describe the current value", async () => {
    const { user, spinbutton } = setup({
      getValueText: (value) => `Current value: ${value}`,
    });

    expect(spinbutton).toHaveAttribute("aria-valuetext", "Current value: null");

    await user.type(spinbutton, "12");
    expect(spinbutton).toHaveAttribute("aria-valuetext", "Current value: 12");
  });

  describe("fallback text content", () => {
    it("should be able to display a fallback text value while the value is null", async () => {
      const { user, spinbutton } = setup({ fallback: "HH" });

      expect(spinbutton).not.toHaveValue("aria-valuenow");
      expect(spinbutton).toHaveAttribute("aria-valuetext", "No value selected");
      expect(spinbutton).toHaveTextContent("HH");

      await user.type(spinbutton, "3");
      expect(spinbutton).toHaveValue(3);
      expect(spinbutton).toHaveAttribute("aria-valuenow", "3");
      expect(spinbutton).not.toHaveAttribute("aria-valuetext");
      expect(spinbutton).toHaveTextContent("03");
    });

    it("should default to a fallback of hyphens if a min value was provided", async () => {
      const { spinbutton, rerender, user } = setup({ min: 0 });

      expect(spinbutton).not.toHaveValue("aria-valuenow");
      expect(spinbutton).toHaveAttribute("aria-valuetext", "No value selected");
      expect(spinbutton).toHaveTextContent("-");

      rerender({ min: 10 });

      expect(spinbutton).not.toHaveValue("aria-valuenow");
      expect(spinbutton).toHaveAttribute("aria-valuetext", "No value selected");
      expect(spinbutton).toHaveTextContent("--");

      await user.type(spinbutton, "2");
      expect(spinbutton).not.toHaveValue("aria-valuenow");
      expect(spinbutton).toHaveAttribute("aria-valuetext", "No value selected");
      expect(spinbutton).toHaveTextContent("02");

      await user.type(spinbutton, "0", { skipClick: true });
      expect(spinbutton).toHaveValue(20);
      expect(spinbutton).toHaveAttribute("aria-valuenow", "20");
      expect(spinbutton).not.toHaveAttribute("aria-valuetext");
      expect(spinbutton).toHaveTextContent("20");
    });

    it("should allow for a custom getTextContent customize the fallback text content", async () => {
      const { user, spinbutton } = setup({
        getTextContent: (options) => {
          const { value } = options;
          if (value === null) {
            return "Nothing";
          }

          return `${value}`;
        },
      });

      expect(spinbutton).not.toHaveAttribute("aria-valuenow");
      expect(spinbutton).toHaveTextContent("Nothing");
      await user.type(spinbutton, "12");

      expect(spinbutton).toHaveAttribute("aria-valuenow", "12");
      expect(spinbutton).toHaveTextContent("12");

      await user.keyboard("{Backspace}");
      expect(spinbutton).not.toHaveAttribute("aria-valuenow");
      expect(spinbutton).toHaveTextContent("Nothing");
    });
  });

  describe("keyboard overrides", () => {
    it("should prevent default beahvior for ArrowLeft, ArrowRight, Home, and End keys to prevent the cursor from moving in the contentEditable element", async () => {
      const { user, spinbutton } = setup({ defaultValue: 10 });

      await user.type(spinbutton, "{ArrowLeft}");
      expect(spinbutton).toHaveSelection("10");

      await user.type(spinbutton, "{ArrowRight}");
      expect(spinbutton).toHaveSelection("10");

      await user.type(spinbutton, "{Home}");
      expect(spinbutton).toHaveSelection("10");

      await user.type(spinbutton, "{End}");
      expect(spinbutton).toHaveSelection("10");
    });

    it("should allow the Home key to jump to the min value", async () => {
      const { user, spinbutton } = setup({ min: 0, defaultValue: 10 });

      await user.type(spinbutton, "{Home}");
      expect(spinbutton).toHaveValue(0);
      expect(spinbutton).toHaveSelection("0");
    });

    it("should allow the End key to jump to the max value", async () => {
      const { user, spinbutton } = setup({ max: 20, defaultValue: 10 });

      await user.type(spinbutton, "{End}");
      expect(spinbutton).toHaveValue(20);
      expect(spinbutton).toHaveSelection("20");
    });

    it("should attempt to submit the form when the enter key is pressed", async () => {
      const onSubmit = vi.fn();
      const { user, spinbutton } = setup(
        {},
        {
          wrapper: ({ children }) => (
            <Form onSubmit={onSubmit}>
              {children}
              <Button type="submit">Submit</Button>
            </Form>
          ),
        }
      );

      await user.type(spinbutton, "3{Enter}");
      expect(onSubmit).toHaveBeenCalledTimes(1);
    });
  });

  describe("keyboard increment", () => {
    it("should allow the user to increment the value with the ArrowUp key", async () => {
      const { user, spinbutton } = setup({ min: 0, max: 3, defaultValue: 0 });
      expect(spinbutton).toHaveValue(0);

      spinbutton.focus();
      await user.keyboard("{ArrowUp}");
      expect(spinbutton).toHaveValue(1);

      await user.keyboard("{ArrowUp}");
      expect(spinbutton).toHaveValue(2);

      await user.keyboard("{ArrowUp}");
      expect(spinbutton).toHaveValue(3);
    });

    it("should loop the value to the min value if it was provided", async () => {
      const { user, spinbutton } = setup({ min: 0, max: 3, defaultValue: 3 });
      expect(spinbutton).toHaveValue(3);

      spinbutton.focus();
      await user.keyboard("{ArrowUp}");
      expect(spinbutton).toHaveValue(0);
    });

    it("should stop at the max value if a min was not provided", async () => {
      const { user, spinbutton } = setup({ max: 3, defaultValue: 3 });
      expect(spinbutton).toHaveValue(3);

      spinbutton.focus();
      await user.keyboard("{ArrowUp}");
      expect(spinbutton).toHaveValue(3);
    });

    it("should allow the initial increment value to start from the defaultKeyboardValue if there is no value in the spinbutton", async () => {
      const { user, spinbutton } = setup({ defaultKeyboardValue: 3 });
      expect(spinbutton).not.toHaveAttribute("aria-valuenow");

      spinbutton.focus();
      await user.keyboard("{ArrowUp}");
      expect(spinbutton).toHaveValue(4);
    });

    it("should set the initial increment value to the min if it was provided without a defaultKeyboardValue", async () => {
      const { user, spinbutton } = setup({ min: 2 });
      expect(spinbutton).not.toHaveAttribute("aria-valuenow");

      spinbutton.focus();
      await user.keyboard("{ArrowUp}");
      expect(spinbutton).toHaveValue(3);
    });

    it("should set the initial increment value to the max if it was provided without a defaultKeyboardValue and min", async () => {
      const { user, spinbutton } = setup({ max: 9 });
      expect(spinbutton).not.toHaveAttribute("aria-valuenow");

      spinbutton.focus();
      await user.keyboard("{ArrowUp}");
      expect(spinbutton).toHaveValue(9);
    });

    it("should set the initial increment value to 0 if defaultKeyboardValue, min, and max were not provided", async () => {
      const { user, spinbutton } = setup();
      expect(spinbutton).not.toHaveAttribute("aria-valuenow");

      spinbutton.focus();
      await user.keyboard("{ArrowUp}");
      expect(spinbutton).toHaveValue(1);
    });
  });

  describe("keyboard decrement", () => {
    it("should allow the user to decrement the value with the ArrowDown key", async () => {
      const { user, spinbutton } = setup({ min: 0, max: 3, defaultValue: 3 });

      expect(spinbutton).toHaveValue(3);

      spinbutton.focus();
      await user.keyboard("{ArrowDown}");
      expect(spinbutton).toHaveValue(2);

      await user.keyboard("{ArrowDown}");
      expect(spinbutton).toHaveValue(1);

      await user.keyboard("{ArrowDown}");
      expect(spinbutton).toHaveValue(0);
    });

    it("should loop the value to the max value if it was provided", async () => {
      const { user, spinbutton } = setup({ min: 0, max: 3, defaultValue: 0 });
      expect(spinbutton).toHaveValue(0);

      spinbutton.focus();
      await user.keyboard("{ArrowDown}");
      expect(spinbutton).toHaveValue(3);
    });

    it("should stop at the max value if a max was not provided", async () => {
      const { user, spinbutton } = setup({ min: 3, defaultValue: 3 });
      expect(spinbutton).toHaveValue(3);

      spinbutton.focus();
      await user.keyboard("{ArrowDown}");
      expect(spinbutton).toHaveValue(3);
    });

    it("should allow the initial decrement value to start from the defaultKeyboardValue if there is no value in the spinbutton", async () => {
      const { user, spinbutton } = setup({ defaultKeyboardValue: 3 });
      expect(spinbutton).not.toHaveAttribute("aria-valuenow");

      spinbutton.focus();
      await user.keyboard("{ArrowDown}");
      expect(spinbutton).toHaveValue(2);
    });

    it("should set the initial decrement value to the min if it was provided without a defaultKeyboardValue", async () => {
      const { user, spinbutton } = setup({ min: 2 });
      expect(spinbutton).not.toHaveAttribute("aria-valuenow");

      spinbutton.focus();
      await user.keyboard("{ArrowDown}");
      expect(spinbutton).toHaveValue(2);
    });

    it("should set the initial decrement value to the max if it was provided without a defaultKeyboardValue and min", async () => {
      const { user, spinbutton } = setup({ max: 9 });
      expect(spinbutton).not.toHaveAttribute("aria-valuenow");

      spinbutton.focus();
      await user.keyboard("{ArrowDown}");
      expect(spinbutton).toHaveValue(8);
    });

    it("should set the initial decrement value to 0 if defaultKeyboardValue, min, and max were not provided", async () => {
      const { user, spinbutton } = setup();
      expect(spinbutton).not.toHaveAttribute("aria-valuenow");

      spinbutton.focus();
      await user.keyboard("{ArrowDown}");
      expect(spinbutton).toHaveValue(-1);
    });
  });

  describe("form states", () => {
    it("should add the correct attributes when disabled and prevent any changes", async () => {
      const { user, spinbutton } = setup({
        min: 0,
        max: 10,
        disabled: true,
        defaultValue: 5,
      });

      expect(spinbutton).toHaveAttribute("aria-disabled", "true");
      expect(spinbutton).not.toHaveAttribute("tabIndex");
      expect(spinbutton).toHaveValue(5);

      await user.click(spinbutton);
      expect(spinbutton).not.toHaveFocus();
    });

    it("should add the correct attributes when readOnly and prevent any changes", async () => {
      const { user, spinbutton } = setup({
        min: 0,
        max: 10,
        readOnly: true,
        defaultValue: 5,
      });

      expect(spinbutton).toHaveAttribute("aria-readonly", "true");
      expect(spinbutton).toHaveAttribute("tabIndex", "0");
      expect(spinbutton).toHaveValue(5);

      await user.click(spinbutton);
      expect(spinbutton).toHaveFocus();

      await user.keyboard("{ArrowUp}");
      expect(spinbutton).toHaveValue(5);

      await user.keyboard("3");
      expect(spinbutton).toHaveValue(5);
    });

    it("should flag the aria-required state when errored", () => {
      const { spinbutton } = setup({
        min: 0,
        max: 10,
        defaultValue: 12,
        required: true,
      });

      expect(spinbutton).toHaveAttribute("aria-required", "true");
    });

    it("should flag the aria-invalid state when errored", () => {
      const { spinbutton } = setup({
        min: 0,
        max: 10,
        defaultValue: 12,
        // this would normally be set to true only when the form is submitted
        error: true,
      });

      expect(spinbutton).toHaveAttribute("aria-invalid", "true");
    });
  });

  describe("typing", () => {
    const HOUR_RANGE: MinMaxRange = {
      min: 1,
      max: 12,
    };

    const HOUR_SETUP = {
      ...HOUR_RANGE,
      fallback: "HH",
    } satisfies Partial<SpinButtonOptions>;

    it("should ignore anything that is not a number", async () => {
      const { user, spinbutton } = setup(HOUR_SETUP);

      expect(spinbutton).toHaveTextContent("HH");
      expect(spinbutton).not.toHaveAttribute("aria-valuenow");

      await user.type(spinbutton, "hello, world!");
      expect(spinbutton).not.toHaveAttribute("aria-valuenow");
      expect(spinbutton).toHaveSelection("HH");

      await user.keyboard("1");
      expect(spinbutton).toHaveValue(1);
      expect(spinbutton).toHaveAttribute("aria-valuenow", "1");
      expect(spinbutton).toHaveSelection("01");

      // ignored keys are not counted with the keypress count
      await user.keyboard("-3");
      expect(spinbutton).toHaveValue(1);
      expect(spinbutton).toHaveAttribute("aria-valuenow", "1");
      expect(spinbutton).toHaveSelection("01");

      await user.keyboard("-3");
      expect(spinbutton).toHaveValue(3);
      expect(spinbutton).toHaveAttribute("aria-valuenow", "3");
      expect(spinbutton).toHaveSelection("03");
    });

    it("should allow for custom key mappings to support the AM/PM sort of spin buttons", async () => {
      const { user, spinbutton } = setup({
        min: 0,
        max: 1,
        mappings: { a: 0, p: 1 },
      });

      expect(spinbutton).not.toHaveAttribute("aria-valuenow");

      await user.type(spinbutton, "a");
      expect(spinbutton).toHaveValue(0);
      expect(spinbutton).toHaveAttribute("aria-valuenow", "0");

      await user.keyboard("p");
      expect(spinbutton).toHaveValue(1);
      expect(spinbutton).toHaveAttribute("aria-valuenow", "1");

      await user.keyboard("aaaaaafjdks");
      expect(spinbutton).toHaveValue(0);
      expect(spinbutton).toHaveAttribute("aria-valuenow", "0");
    });
  });

  describe("onValueChange", () => {
    it("should call onValueChange when typing", async () => {
      const onValueChange = vi.fn();
      const { user, spinbutton } = setup({
        onValueChange,
        min: 0,
        max: 10,
        defaultValue: 5,
      });

      await user.type(spinbutton, "1");
      expect(onValueChange).toHaveBeenCalledWith({
        event: expect.any(Object),
        reason: "type",
        value: 1,
      });

      await user.keyboard("1");
      expect(onValueChange).toHaveBeenCalledWith({
        event: expect.any(Object),
        reason: "typed-to-completion",
        // see resolveInputEvent tests for why this is 1
        value: 1,
      });
      expect(onValueChange).toHaveBeenCalledTimes(2);
    });

    it("should call onValueChange when clearing the value", async () => {
      const onValueChange = vi.fn();
      const { user, spinbutton } = setup({
        onValueChange,
        min: 0,
        max: 10,
        defaultValue: 5,
      });

      await user.type(spinbutton, "{Backspace}");
      expect(onValueChange).toHaveBeenCalledWith({
        event: expect.any(Object),
        reason: "cleared",
        value: null,
      });
    });

    it("should call onValueChange for keyboard jumps", async () => {
      const onValueChange = vi.fn();
      const { user, spinbutton } = setup({
        onValueChange,
        min: 0,
        max: 10,
        defaultValue: 5,
      });

      expect(spinbutton).toHaveValue(5);
      expect(onValueChange).not.toHaveBeenCalled();

      await user.type(spinbutton, "{ArrowUp}");
      expect(onValueChange).toHaveBeenCalledWith({
        event: expect.any(Object),
        reason: "change",
        value: 6,
      });

      await user.keyboard("{ArrowDown}");
      expect(onValueChange).toHaveBeenCalledWith({
        event: expect.any(Object),
        reason: "change",
        value: 5,
      });

      await user.keyboard("{Home}");
      expect(onValueChange).toHaveBeenCalledWith({
        event: expect.any(Object),
        reason: "change",
        value: 0,
      });

      await user.keyboard("{End}");
      expect(onValueChange).toHaveBeenCalledWith({
        event: expect.any(Object),
        reason: "change",
        value: 10,
      });
    });

    it("should not call the onValueChange for ignored events", async () => {
      const onValueChange = vi.fn();
      const { user, spinbutton } = setup({
        onValueChange,
        min: 0,
        max: 10,
        defaultValue: 5,
      });

      await user.type(spinbutton, "hello, world! let's type some stuff");
      expect(onValueChange).not.toHaveBeenCalled();
    });

    it("should not call the onValueChange for placeholder digits", async () => {
      const onValueChange = vi.fn();
      const { user, spinbutton } = setup({
        onValueChange,
        min: 1900,
        max: 2100,
      });

      await user.type(spinbutton, "190");
      expect(onValueChange).not.toHaveBeenCalled();

      await user.keyboard("1");
      expect(onValueChange).toHaveBeenCalledWith({
        event: expect.any(Object),
        reason: "typed-to-completion",
        value: 1901,
      });
    });
  });
});
