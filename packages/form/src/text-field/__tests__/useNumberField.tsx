import React, { ReactElement } from "react";
import userEvent from "@testing-library/user-event";
import { fireEvent, render } from "@testing-library/react";
import { TextField } from "../TextField";

import { NumberFieldHookOptions, useNumberField } from "../useNumberField";

function NumberField({
  id = "field-id",
  disableMessage = true,
  ...options
}: Partial<NumberFieldHookOptions>): ReactElement {
  const [, props] = useNumberField({
    ...options,
    id,
    disableMessage,
  });

  return <TextField {...props} label="Label" placeholder="Placeholder" />;
}

describe("useNumberField", () => {
  it("should still call the onBlur function", () => {
    const onBlur = jest.fn();
    const { getByRole } = render(<NumberField onBlur={onBlur} />);
    expect(onBlur).not.toBeCalled();

    const field = getByRole("spinbutton");
    fireEvent.blur(field);
    expect(onBlur).toBeCalledTimes(1);
  });

  it("should still call the onChange function", () => {
    const onChange = jest.fn();
    const { getByRole } = render(<NumberField onChange={onChange} />);
    expect(onChange).not.toBeCalled();

    const field = getByRole("spinbutton");
    fireEvent.change(field, { target: { value: "1" } });
    expect(onChange).toBeCalledTimes(1);
  });

  it("should set the default value to the empty string when the default value is undefined", () => {
    let { getByRole, unmount } = render(<NumberField />);
    let field = getByRole("spinbutton");
    expect(field).toHaveValue(null);

    unmount();

    ({ getByRole, unmount } = render(
      <NumberField defaultValue={() => undefined} />
    ));
    field = getByRole("spinbutton");
    expect(field).toHaveValue(null);
  });

  it("should set the default value to the stringified default value", () => {
    let { getByRole, unmount } = render(<NumberField defaultValue={10} />);
    let field = getByRole("spinbutton");
    expect(field).toHaveValue(10);

    unmount();

    ({ getByRole, unmount } = render(<NumberField defaultValue={() => 1} />));
    field = getByRole("spinbutton");
    expect(field).toHaveValue(1);
  });

  describe("blur behavior", () => {
    it('should fix the value to be greater than or equal to the min value when fixOnBlur is true or "min"', () => {
      const { getByRole, rerender } = render(<NumberField min={0} />);
      const field = getByRole("spinbutton") as HTMLInputElement;

      expect(field.value).toBe("");

      fireEvent.change(field, { target: { value: "-1" } });
      expect(field.value).toBe("-1");
      fireEvent.blur(field);
      expect(field.value).toBe("0");

      rerender(<NumberField min={0} fixOnBlur="min" />);
      expect(field.value).toBe("0");

      fireEvent.change(field, { target: { value: "-1" } });
      expect(field.value).toBe("-1");
      fireEvent.blur(field);
      expect(field.value).toBe("0");

      rerender(<NumberField min={0} fixOnBlur="max" />);
      expect(field.value).toBe("0");

      fireEvent.change(field, { target: { value: "-1" } });
      expect(field.value).toBe("-1");
      fireEvent.blur(field);
      expect(field.value).toBe("-1");

      rerender(<NumberField min={0} fixOnBlur={false} />);
      expect(field.value).toBe("-1");
      fireEvent.change(field, { target: { value: "10" } });
      expect(field.value).toBe("10");

      fireEvent.change(field, { target: { value: "-1" } });
      expect(field.value).toBe("-1");
      fireEvent.blur(field);
      expect(field.value).toBe("-1");
    });

    it('should fix the value to be less than or equal to the max value when fixOnBlur is true or "max"', () => {
      const { getByRole, rerender } = render(<NumberField max={10} />);
      const field = getByRole("spinbutton") as HTMLInputElement;
      expect(field.value).toBe("");

      fireEvent.change(field, { target: { value: "11" } });
      expect(field.value).toBe("11");
      fireEvent.blur(field);
      expect(field.value).toBe("10");

      rerender(<NumberField max={10} fixOnBlur="min" />);
      expect(field.value).toBe("10");

      fireEvent.change(field, { target: { value: "11" } });
      expect(field.value).toBe("11");
      fireEvent.blur(field);
      expect(field.value).toBe("11");

      rerender(<NumberField max={10} fixOnBlur="max" />);
      expect(field.value).toBe("11");
      fireEvent.change(field, { target: { value: "1" } });
      expect(field.value).toBe("1");

      fireEvent.change(field, { target: { value: "11" } });
      expect(field.value).toBe("11");
      fireEvent.blur(field);
      expect(field.value).toBe("10");

      rerender(<NumberField max={10} fixOnBlur={false} />);
      expect(field.value).toBe("10");
      fireEvent.change(field, { target: { value: "1" } });
      expect(field.value).toBe("1");

      fireEvent.change(field, { target: { value: "15" } });
      expect(field.value).toBe("15");
      fireEvent.blur(field);
      expect(field.value).toBe("15");
    });

    it("should not fix the value on blur when the onBlur event stops propagation", () => {
      const { getByRole } = render(
        <NumberField
          min={0}
          max={1}
          onBlur={(event) => {
            event.stopPropagation();
          }}
        />
      );
      const field = getByRole("spinbutton") as HTMLInputElement;
      expect(field.value).toBe("");

      userEvent.type(field, "100");
      expect(field.value).toBe("100");
      fireEvent.blur(field);
      expect(field.value).toBe("100");
    });

    it("should set the value to the min or defaultValue on blur if there is no value in the text field", () => {
      const { getByRole, rerender } = render(<NumberField defaultValue={1} />);
      const field = getByRole("spinbutton") as HTMLInputElement;
      expect(field.value).toBe("1");

      fireEvent.focus(field);
      fireEvent.blur(field);
      expect(field.value).toBe("1");

      userEvent.type(field, "00");
      expect(field.value).toBe("100");

      userEvent.clear(field);
      fireEvent.blur(field);
      expect(field.value).toBe("1");

      rerender(<NumberField min={0} defaultValue={1} />);
      expect(field.value).toBe("1");

      fireEvent.focus(field);
      fireEvent.blur(field);
      expect(field.value).toBe("1");

      userEvent.clear(field);
      userEvent.type(field, "100");
      expect(field.value).toBe("100");

      userEvent.clear(field);
      fireEvent.blur(field);
      expect(field.value).toBe("0");
    });
  });

  describe("number change behavior", () => {
    function Test({
      min,
      max,
      step,
      defaultValue,
      updateOnChange,
    }: Partial<NumberFieldHookOptions>): ReactElement {
      const [value, props] = useNumberField({
        id: "field-id",
        min,
        max,
        step,
        defaultValue,
        disableMessage: true,
        updateOnChange,
      });

      return (
        <>
          <div data-testid="value">{`${value}`}</div>
          <TextField {...props} label="Label" />
        </>
      );
    }

    it("should default to updating the number value onChange and fixing the number value on blur", () => {
      const { getByRole, getByTestId } = render(<Test defaultValue={0} />);
      const value = getByTestId("value");
      const field = getByRole("spinbutton") as HTMLInputElement;

      expect(field).toHaveValue(0);
      expect(field.value).toBe("0");
      expect(value.textContent).toBe("0");

      userEvent.type(field, "100");
      expect(field).toHaveValue(100);
      expect(field.value).toBe("0100");
      expect(value.textContent).toBe("100");

      fireEvent.blur(field);
      expect(field.value).toBe("100");
      expect(field).toHaveValue(100);
      expect(value.textContent).toBe("100");
    });

    it("should set the number to undefined if the field is cleared and the defaultValue is undefined", () => {
      const { getByRole, getByTestId } = render(<Test />);
      const value = getByTestId("value");
      const field = getByRole("spinbutton") as HTMLInputElement;

      expect(field.value).toBe("");
      expect(value.textContent).toBe("undefined");

      userEvent.type(field, "100");
      expect(field).toHaveValue(100);
      expect(field.value).toBe("100");
      expect(value.textContent).toBe("100");

      userEvent.clear(field);
      expect(field).toHaveValue(null);
      expect(field.value).toBe("");
      expect(value.textContent).toBe("undefined");
    });

    it("should set the value to the min value for rangeUnderflow errors", () => {
      const { getByRole, getByTestId } = render(
        <Test min={0} max={10} defaultValue={0} />
      );
      const value = getByTestId("value");
      const field = getByRole("spinbutton") as HTMLInputElement;

      expect(field.value).toBe("0");
      expect(value.textContent).toBe("0");

      userEvent.type(field, "1");
      expect(field.value).toBe("01");
      expect(value.textContent).toBe("1");

      fireEvent.change(field, { target: { value: "-1" } });
      expect(field.value).toBe("-1");
      expect(value.textContent).toBe("0");
    });

    it("should set the value to the max value for rangeOverflow errors", () => {
      const { getByRole, getByTestId } = render(<Test min={0} max={10} />);
      const value = getByTestId("value");
      const field = getByRole("spinbutton") as HTMLInputElement;

      expect(field.value).toBe("");
      expect(value.textContent).toBe("undefined");

      userEvent.type(field, "1");
      expect(field.value).toBe("1");
      expect(value.textContent).toBe("1");

      userEvent.type(field, "1");
      expect(field.value).toBe("11");
      expect(value.textContent).toBe("10");
    });

    it("should not update the value for other error types", () => {
      const { getByRole, getByTestId } = render(
        <Test min={0} max={10} step={2} />
      );
      const value = getByTestId("value");
      const field = getByRole("spinbutton") as HTMLInputElement;

      expect(field.value).toBe("");
      expect(value.textContent).toBe("undefined");

      userEvent.type(field, "1");
      expect(field.value).toBe("1");
      expect(value.textContent).toBe("undefined");

      userEvent.type(field, "0");
      expect(field.value).toBe("10");
      expect(value.textContent).toBe("10");
    });

    it("should not update the value on change if updateOnChange is false", () => {
      const { getByRole, getByTestId } = render(
        <Test updateOnChange={false} />
      );
      const value = getByTestId("value");
      const field = getByRole("spinbutton") as HTMLInputElement;

      expect(field.value).toBe("");
      expect(value.textContent).toBe("undefined");

      userEvent.type(field, "1");
      expect(field.value).toBe("1");
      expect(value.textContent).toBe("undefined");

      fireEvent.blur(field);
      expect(field.value).toBe("1");
      expect(value.textContent).toBe("1");
    });
  });

  describe("setNumber controls", () => {
    it("should work when provided with a number", () => {
      function Test(): ReactElement {
        const [, props, { setNumber }] = useNumberField({
          id: "field-id",
          disableMessage: true,
        });

        return (
          <>
            <button type="button" onClick={() => setNumber(10)}>
              Button
            </button>
            <TextField {...props} label="Label" />
          </>
        );
      }

      const { getByRole } = render(<Test />);
      const button = getByRole("button");
      const field = getByRole("spinbutton");
      expect(field).toHaveValue(null);

      fireEvent.click(button);
      expect(field).toHaveValue(10);

      userEvent.type(field, "00");
      expect(field).toHaveValue(1000);

      fireEvent.click(button);
      expect(field).toHaveValue(10);
    });

    it("should work when provided with a callback function", () => {
      function Test(): ReactElement {
        const [, props, { setNumber }] = useNumberField({
          id: "field-id",
          disableMessage: true,
        });

        return (
          <>
            <button
              type="button"
              onClick={() => setNumber((prev) => (prev ?? 0) + 1)}
            >
              Button
            </button>
            <TextField {...props} label="Label" />
          </>
        );
      }

      const { getByRole } = render(<Test />);
      const button = getByRole("button");
      const field = getByRole("spinbutton");
      expect(field).toHaveValue(null);

      fireEvent.click(button);
      expect(field).toHaveValue(1);

      userEvent.type(field, "00");
      expect(field).toHaveValue(100);

      fireEvent.click(button);
      expect(field).toHaveValue(101);
    });
  });

  describe("reset controls", () => {
    function Test({
      defaultValue,
    }: Partial<NumberFieldHookOptions>): ReactElement {
      const [, props, { reset }] = useNumberField({
        id: "field-id",
        defaultValue,
        disableMessage: true,
      });

      return (
        <>
          <button type="button" onClick={() => reset()}>
            Button
          </button>
          <TextField {...props} label="Label" />
        </>
      );
    }

    it("should reset the field completely when there is no defaultValue", () => {
      const { getByRole } = render(<Test />);
      const button = getByRole("button");
      const field = getByRole("spinbutton") as HTMLInputElement;

      expect(field.value).toBe("");
      expect(field).toHaveValue(null);

      userEvent.type(field, "15");
      expect(field.value).toBe("15");
      expect(field).toHaveValue(15);

      fireEvent.click(button);
      expect(field.value).toBe("");
      expect(field).toHaveValue(null);
    });

    it("should reset the field to the defaultValue", () => {
      // the main use-case for this is setting it back to 0 though
      const { getByRole } = render(<Test defaultValue={1} />);
      const button = getByRole("button");
      const field = getByRole("spinbutton") as HTMLInputElement;

      expect(field.value).toBe("1");

      userEvent.type(field, "15");
      expect(field.value).toBe("115");

      fireEvent.click(button);
      expect(field.value).toBe("1");
      expect(field).toHaveValue(1);
    });
  });
});
