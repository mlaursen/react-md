import React, { ReactElement, useState } from "react";
import { fireEvent, render } from "@testing-library/react";

import { TextField } from "../TextField";

describe("TextField", () => {
  it("should render correctly", () => {
    const props = { id: "field" };
    const { container, rerender } = render(<TextField {...props} />);

    expect(container).toMatchSnapshot();

    rerender(<TextField {...props} label="Label" placeholder="Placeholder" />);
    expect(container).toMatchSnapshot();

    rerender(
      <TextField {...props} label="Label" placeholder="Placeholder" disabled />
    );
    expect(container).toMatchSnapshot();
    expect(document.getElementById("field")).toHaveAttribute("disabled");
  });

  it("should correctly call the onChange event", () => {
    const onChange = jest.fn();
    const { getByRole } = render(
      <TextField id="field" label="Label" onChange={onChange} />
    );
    const field = getByRole("textbox");
    expect(onChange).not.toBeCalled();

    fireEvent.change(field, { target: { value: "2" } });
    expect(onChange).toBeCalledTimes(1);
  });

  it("should add the inactive floating label state when a number text field is blurred while containing an invalid value", () => {
    const { getByRole, getByText } = render(
      <TextField id="text-field" label="Label" type="number" defaultValue="" />
    );

    const field = getByRole("spinbutton") as HTMLInputElement;
    const label = getByText("Label");
    expect(field).toHaveAttribute("value", "");
    expect(label.className).not.toContain("rmd-floating-label--active");
    expect(label.className).not.toContain("rmd-floating-label--inactive");

    fireEvent.focus(field);
    expect(label.className).toContain("rmd-floating-label--active");
    expect(label.className).not.toContain("rmd-floating-label--inactive");

    fireEvent.change(field, { target: { value: "123" } });
    expect(label.className).toContain("rmd-floating-label--active");
    expect(label.className).not.toContain("rmd-floating-label--inactive");

    // TODO: Look into writing real browser tests since this isn't implemented in JSDOM
    Object.defineProperty(field.validity, "badInput", {
      writable: true,
      value: true,
    });
    expect(field.validity.badInput).toBe(true);
    fireEvent.change(field, {
      target: { value: "123-" },
    });
    expect(field.validity.badInput).toBe(true);
    expect(label.className).toContain("rmd-floating-label--active");
    expect(label.className).not.toContain("rmd-floating-label--inactive");

    fireEvent.blur(field);
    expect(label.className).toContain("rmd-floating-label--active");
    expect(label.className).toContain("rmd-floating-label--inactive");
  });

  it("should add the inactive floating label state when a number text field is blurred while containing an invalid value when controlled", () => {
    function Test(): ReactElement {
      const [value, setValue] = useState("");

      return (
        <TextField
          id="text-field"
          label="Label"
          type="number"
          value={value}
          onChange={(event) => setValue(event.currentTarget.value)}
        />
      );
    }
    const { getByRole, getByText } = render(<Test />);

    const field = getByRole("spinbutton") as HTMLInputElement;
    const label = getByText("Label");
    expect(field).toHaveAttribute("value", "");
    expect(label.className).not.toContain("rmd-floating-label--active");
    expect(label.className).not.toContain("rmd-floating-label--inactive");

    fireEvent.focus(field);
    expect(label.className).toContain("rmd-floating-label--active");
    expect(label.className).not.toContain("rmd-floating-label--inactive");

    fireEvent.change(field, { target: { value: "123" } });
    expect(label.className).toContain("rmd-floating-label--active");
    expect(label.className).not.toContain("rmd-floating-label--inactive");

    // TODO: Look into writing real browser tests since this isn't implemented in JSDOM
    Object.defineProperty(field.validity, "badInput", {
      writable: true,
      value: true,
    });
    expect(field.validity.badInput).toBe(true);
    fireEvent.change(field, {
      target: { value: "123-" },
    });
    expect(field.validity.badInput).toBe(true);
    expect(label.className).toContain("rmd-floating-label--active");
    expect(label.className).not.toContain("rmd-floating-label--inactive");

    fireEvent.blur(field);
    expect(label.className).toContain("rmd-floating-label--active");
    expect(label.className).toContain("rmd-floating-label--inactive");
  });

  it("should add the floating inactive state for a number field that is initially rendered with a value", () => {
    const onBlur = jest.fn();
    const onFocus = jest.fn();
    function Test(): ReactElement {
      const [value, setValue] = useState("0");

      return (
        <TextField
          id="text-field"
          label="Label"
          type="number"
          value={value}
          onBlur={onBlur}
          onFocus={onFocus}
          onChange={(event) => setValue(event.currentTarget.value)}
        />
      );
    }
    const { getByRole, getByText } = render(<Test />);

    const field = getByRole("spinbutton") as HTMLInputElement;
    const label = getByText("Label");
    expect(field).toHaveAttribute("value", "0");
    expect(label.className).toContain("rmd-floating-label--active");
    expect(label.className).toContain("rmd-floating-label--inactive");

    fireEvent.focus(field);
    expect(onFocus).toBeCalledTimes(1);

    fireEvent.change(field, { target: { value: "" } });
    fireEvent.blur(field);
    expect(onBlur).toBeCalledTimes(1);
    expect(label.className).not.toContain("rmd-floating-label--active");
    expect(label.className).not.toContain("rmd-floating-label--inactive");

    fireEvent.focus(field);
    fireEvent.change(field, { target: { value: "3" } });
    fireEvent.change(field, { target: { value: "3-" } });
    fireEvent.change(field, { target: { value: "3" } });
    fireEvent.blur(field);
    expect(onBlur).toBeCalledTimes(2);
    expect(label.className).toContain("rmd-floating-label--active");
    expect(label.className).toContain("rmd-floating-label--inactive");
  });

  it("should add the inactive floating label state on blur if the change event never really got fired", () => {
    function Test(): ReactElement {
      return <TextField id="text-field" label="Label" type="number" />;
    }
    const { getByRole, getByText } = render(<Test />);

    const field = getByRole("spinbutton") as HTMLInputElement;
    const label = getByText("Label");
    expect(field.value).toBe("");
    expect(label.className).not.toContain("rmd-floating-label--active");
    expect(label.className).not.toContain("rmd-floating-label--inactive");

    fireEvent.change(field, { target: { value: "-" } });
    expect(label.className).not.toContain("rmd-floating-label--active");
    expect(label.className).not.toContain("rmd-floating-label--inactive");

    // TODO: Look into writing real browser tests since this isn't implemented in JSDOM
    Object.defineProperty(field.validity, "badInput", {
      writable: true,
      value: true,
    });
    fireEvent.blur(field);
    expect(label.className).toContain("rmd-floating-label--active");
    expect(label.className).toContain("rmd-floating-label--inactive");
  });

  it("should not add the inactive floating label state when a non-number type has a badInput validity", () => {
    const { getByRole, getByText } = render(
      <TextField id="text-field" label="Label" type="url" defaultValue="" />
    );

    const field = getByRole("textbox") as HTMLInputElement;
    const label = getByText("Label");
    expect(field).toHaveAttribute("value", "");
    expect(label.className).not.toContain("rmd-floating-label--active");
    expect(label.className).not.toContain("rmd-floating-label--inactive");

    fireEvent.focus(field);
    expect(label.className).toContain("rmd-floating-label--active");
    expect(label.className).not.toContain("rmd-floating-label--inactive");

    // TODO: Look into writing real browser tests since this isn't implemented in JSDOM
    Object.defineProperty(field.validity, "badInput", {
      writable: true,
      value: true,
    });
    fireEvent.change(field, { target: { value: "123" } });
    expect(field.validity.badInput).toBe(true);
    expect(label.className).toContain("rmd-floating-label--active");
    expect(label.className).not.toContain("rmd-floating-label--inactive");

    fireEvent.blur(field);
    expect(field.validity.badInput).toBe(true);
    expect(label.className).toContain("rmd-floating-label--active");
    expect(label.className).toContain("rmd-floating-label--inactive");

    fireEvent.focus(field);
    expect(label.className).toContain("rmd-floating-label--active");
    expect(label.className).not.toContain("rmd-floating-label--inactive");

    fireEvent.change(field, { target: { value: "" } });
    fireEvent.blur(field);
    expect(label.className).not.toContain("rmd-floating-label--active");
    expect(label.className).not.toContain("rmd-floating-label--inactive");
  });

  it("should not add the inactive floating label state when a non-number type has a badInput validity when controlled", () => {
    function Test(): ReactElement {
      const [value, setValue] = useState("");

      return (
        <TextField
          id="text-field"
          label="Label"
          type="url"
          value={value}
          onChange={(event) => setValue(event.currentTarget.value)}
        />
      );
    }
    const { getByRole, getByText } = render(<Test />);

    const field = getByRole("textbox") as HTMLInputElement;
    const label = getByText("Label");
    expect(field).toHaveAttribute("value", "");
    expect(label.className).not.toContain("rmd-floating-label--active");
    expect(label.className).not.toContain("rmd-floating-label--inactive");

    fireEvent.focus(field);
    expect(label.className).toContain("rmd-floating-label--active");
    expect(label.className).not.toContain("rmd-floating-label--inactive");

    // TODO: Look into writing real browser tests since this isn't implemented in JSDOM
    Object.defineProperty(field.validity, "badInput", {
      writable: true,
      value: true,
    });
    fireEvent.change(field, { target: { value: "123" } });
    expect(field.validity.badInput).toBe(true);
    expect(label.className).toContain("rmd-floating-label--active");
    expect(label.className).not.toContain("rmd-floating-label--inactive");

    fireEvent.blur(field);
    expect(field.validity.badInput).toBe(true);
    expect(label.className).toContain("rmd-floating-label--active");
    expect(label.className).toContain("rmd-floating-label--inactive");

    fireEvent.focus(field);
    expect(label.className).toContain("rmd-floating-label--active");
    expect(label.className).not.toContain("rmd-floating-label--inactive");

    fireEvent.change(field, { target: { value: "" } });
    fireEvent.blur(field);
    expect(label.className).not.toContain("rmd-floating-label--active");
    expect(label.className).not.toContain("rmd-floating-label--inactive");
  });

  it("should correctly update the floating state if the controlled TextField value changes outside of a change event", () => {
    function Test(): ReactElement {
      const [value, setValue] = useState("");

      return (
        <>
          <button type="button" onClick={() => setValue("100")}>
            Set
          </button>
          <button type="button" onClick={() => setValue("")}>
            Reset
          </button>
          <TextField
            id="field-id"
            label="Label"
            value={value}
            onChange={(event) => setValue(event.currentTarget.value)}
          />
        </>
      );
    }

    const { getByRole, getByText } = render(<Test />);

    const setButton = getByRole("button", { name: "Set" });
    const resetButton = getByRole("button", { name: "Reset" });
    const field = getByRole("textbox") as HTMLInputElement;
    const label = getByText("Label");
    expect(label.className).not.toContain("rmd-floating-label--active");
    expect(label.className).not.toContain("rmd-floating-label--inactive");

    fireEvent.click(setButton);
    expect(label.className).toContain("rmd-floating-label--active");
    expect(label.className).toContain("rmd-floating-label--inactive");

    fireEvent.focus(field);
    fireEvent.change(field, { target: { value: "100-" } });
    expect(label.className).toContain("rmd-floating-label--active");
    expect(label.className).not.toContain("rmd-floating-label--inactive");

    fireEvent.blur(field);
    expect(label.className).toContain("rmd-floating-label--active");
    expect(label.className).toContain("rmd-floating-label--inactive");

    fireEvent.click(resetButton);
    expect(label.className).not.toContain("rmd-floating-label--active");
    expect(label.className).not.toContain("rmd-floating-label--inactive");
  });
});
