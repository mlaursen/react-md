/* eslint-disable react/button-has-type */
import React, { useState } from "react";
import { render, fireEvent } from "@testing-library/react";

import { Select } from "../Select";

const PROPS = {
  id: "select",
  options: Array.from({ length: 3 }, (_, i) => `Option ${i + 1}`),
  value: "",
  onChange: () => {},
};

const getSelect = () => {
  const select = document.getElementById("select");
  if (!select) {
    throw new Error();
  }

  return select;
};

const getListbox = () => {
  const listbox = document.getElementById("select-listbox");
  if (!listbox) {
    throw new Error();
  }

  return listbox;
};

const getValue = () => {
  const value = document.getElementById("select-value");
  if (!value) {
    throw new Error();
  }

  return value as HTMLInputElement;
};

describe("Select", () => {
  it("should render correctly", () => {
    const { container, rerender } = render(<Select {...PROPS} />);

    expect(container).toMatchSnapshot();

    rerender(<Select {...PROPS} placeholder="Choose..." />);
    expect(container).toMatchSnapshot();

    rerender(<Select {...PROPS} placeholder="Choose..." label="Label" />);
    expect(container).toMatchSnapshot();

    rerender(<Select {...PROPS} dense />);
    expect(container).toMatchSnapshot();

    rerender(<Select {...PROPS} dense label="Label" />);
    expect(container).toMatchSnapshot();

    rerender(<Select {...PROPS} dense label="Label" placeholder="Choose..." />);
    expect(container).toMatchSnapshot();
  });

  it("should update the label and select class names when focused as well as hiding the placeholder text", () => {
    const onBlur = jest.fn();
    const onFocus = jest.fn();
    const { container } = render(
      <Select
        {...PROPS}
        label="Label"
        placeholder="Choose..."
        onBlur={onBlur}
        onFocus={onFocus}
      />
    );

    const select = getSelect();
    expect(container).toMatchSnapshot();

    fireEvent.focus(select);
    expect(onFocus).toBeCalledTimes(1);
    expect(container).toMatchSnapshot();

    fireEvent.blur(select);
    expect(onBlur).toBeCalledTimes(1);
  });

  it("should show and focus the listbox when the spacebar is pressed on the select button", () => {
    render(<Select {...PROPS} />);
    expect(getListbox).toThrow();

    const select = getSelect();
    fireEvent.focus(select);
    fireEvent.keyDown(select, { key: " " });

    expect(document.activeElement).toBe(getListbox());
  });

  it("should show and focus the listbox when the ArrowUp is pressed on the select button", () => {
    render(<Select {...PROPS} />);
    expect(getListbox).toThrow();

    const select = getSelect();
    fireEvent.focus(select);
    fireEvent.keyDown(select, { key: "ArrowUp" });

    expect(document.activeElement).toBe(getListbox());
  });

  it("should show and focus the listbox when the ArrowDown is pressed on the select button", () => {
    render(<Select {...PROPS} />);
    expect(getListbox).toThrow();

    const select = getSelect();
    fireEvent.focus(select);
    fireEvent.keyDown(select, { key: "ArrowDown" });

    expect(document.activeElement).toBe(getListbox());
  });

  it("should not open the listbox when the enter key is pressed since it should submit a form instead to mimic native select functionality", () => {
    render(<Select {...PROPS} />);
    expect(getListbox).toThrow();

    const select = getSelect();
    fireEvent.focus(select);
    fireEvent.keyDown(select, { key: "Enter" });
    expect(getListbox).toThrow();
  });

  it("should set the hidden input's value correctly", () => {
    const Test = () => {
      const [value, setValue] = useState("");

      return (
        <Select
          {...PROPS}
          value={value}
          onChange={(nextValue) => setValue(nextValue)}
        />
      );
    };

    const { getByText } = render(<Test />);
    const input = document.getElementById(
      `${PROPS.id}-value`
    ) as HTMLInputElement;
    if (!input) {
      throw new Error();
    }

    expect(input.value).toBe("");
    fireEvent.click(getSelect());

    expect(input.value).toBe("");
    fireEvent.click(getByText("Option 1"));

    expect(input.value).toBe("Option 1");
  });

  it("should not open the listbox while disabled", () => {
    render(<Select {...PROPS} disabled />);
    expect(getListbox).toThrow();
    const select = getSelect();

    fireEvent.click(select);
    expect(getListbox).toThrow();

    fireEvent.focus(select);
    fireEvent.keyDown(select, { key: " " });
    expect(getListbox).toThrow();

    fireEvent.keyDown(select, { key: "ArrowDown" });
    expect(getListbox).toThrow();

    fireEvent.keyDown(select, { key: "ArrowUp" });
    expect(getListbox).toThrow();
  });

  it("should correctly call the onKeyDown prop", () => {
    const onKeyDown = jest.fn();
    const { rerender } = render(<Select {...PROPS} onKeyDown={onKeyDown} />);
    const select = getSelect();

    fireEvent.keyDown(select, { key: "Tab" });
    expect(onKeyDown).toBeCalledTimes(1);

    rerender(<Select {...PROPS} onKeyDown={onKeyDown} disabled />);
    fireEvent.keyDown(select, { key: "Tab" });
    expect(onKeyDown).toBeCalledTimes(1);
  });

  it("should correctly call the onClick prop", () => {
    const onClick = jest.fn();
    const { rerender } = render(<Select {...PROPS} onClick={onClick} />);
    const select = getSelect();

    fireEvent.click(select);
    expect(onClick).toBeCalledTimes(1);

    rerender(<Select {...PROPS} onClick={onClick} disabled />);
    fireEvent.click(select);
    expect(onClick).toBeCalledTimes(1);
  });

  it("should try to polyfill the form submit behavior when the Enter key is pressed", () => {
    const error = jest.spyOn(console, "error");
    // hide jsdom "Not implemented" error
    error.mockImplementation(() => {});
    const onSubmit = jest.fn();
    const { rerender } = render(
      <form onSubmit={onSubmit}>
        <Select {...PROPS} />
        <button type="submit">Submit</button>
      </form>
    );

    let select = getSelect();
    select.focus();
    fireEvent.keyDown(select, { key: "Enter" });
    expect(onSubmit).toBeCalledTimes(1);
    onSubmit.mockReset();

    rerender(
      <>
        <form id="my-form" onSubmit={onSubmit}>
          <Select {...PROPS} />
        </form>
        <button type="reset" form="my-form">
          Reset
        </button>
        <button type="submit" form="my-form">
          Submit
        </button>
      </>
    );

    select = getSelect();
    select.focus();
    fireEvent.keyDown(select, { key: "Enter" });
    expect(onSubmit).toBeCalledTimes(1);
    onSubmit.mockReset();

    rerender(
      <form id="my-form" onSubmit={onSubmit}>
        <Select {...PROPS} />
      </form>
    );
    select = getSelect();
    select.focus();
    fireEvent.keyDown(select, { key: "Enter" });
    // can't submit if there is no submit button
    expect(onSubmit).not.toBeCalled();
  });

  it("should refocus the select element when the listbox is closed", () => {
    render(<Select {...PROPS} />);

    const select = getSelect();
    fireEvent.focus(select);
    fireEvent.click(select);

    const listbox = getListbox();
    expect(document.activeElement).toBe(listbox);
    fireEvent.keyDown(listbox, { key: "Escape" });
    expect(document.activeElement).toBe(select);
  });

  it("should not allow the values to be changed when the readOnly prop is enabled", () => {
    const onChange = jest.fn();
    const { getByRole } = render(
      <Select {...PROPS} label="Label" readOnly onChange={onChange} />
    );

    const button = getByRole("button", { name: "Label" });
    const value = getValue();
    expect(value.value).toBe("");

    fireEvent.click(button);
    const listbox = getByRole("listbox", { name: "Label" });
    expect(document.activeElement).toBe(listbox);
    fireEvent.click(getByRole("option", { name: "Option 1" }));
    expect(onChange).not.toBeCalled();

    expect(value.value).toBe("");
  });
});
