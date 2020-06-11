import React, { useState } from "react";
import { render, fireEvent } from "@testing-library/react";

import Select from "../Select";

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

describe("Select", () => {
  it("should render correctly", () => {
    const { container, rerender } = render(<Select {...PROPS} />);

    expect(container).toMatchSnapshot();

    rerender(<Select {...PROPS} placeholder="Choose..." />);
    expect(container).toMatchSnapshot();

    rerender(<Select {...PROPS} placeholder="Choose..." label="Label" />);
    expect(container).toMatchSnapshot();
  });

  it("should update the label and select class names when focused as well as hiding the placeholder text", () => {
    const { container } = render(
      <Select {...PROPS} label="Label" placeholder="Choose..." />
    );

    const select = getSelect();
    expect(container).toMatchSnapshot();

    fireEvent.focus(select);
    expect(container).toMatchSnapshot();
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
});
