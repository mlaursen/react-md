import React, { ReactElement, useState } from "react";
import { fireEvent, render } from "@testing-library/react";

import { NativeSelect } from "../NativeSelect";

const options = Array.from({ length: 3 }, (_, i) => `Option ${i + 1}`);
const PROPS = {
  id: "select",
  children: options.map((option) => (
    <option key={option} value={option}>
      Option
    </option>
  )),
};

const getIcon = (container: Element) =>
  container.querySelector(".rmd-native-select__icon");

describe("NativeSelect", () => {
  it("should render correctly", () => {
    const { container, rerender } = render(<NativeSelect {...PROPS} />);

    expect(container).toMatchSnapshot();

    rerender(<NativeSelect {...PROPS} label="Label" placeholder="Choose..." />);
    expect(container).toMatchSnapshot();

    rerender(
      <NativeSelect
        {...PROPS}
        label="Label"
        placeholder="Choose..."
        defaultValue="Option 1"
      />
    );
    expect(container).toMatchSnapshot();
  });

  it("should not render an icon to the right of the select when the multiple prop is enabled since it renders as an inline listbox instead of a dropdown select", () => {
    const { container, rerender } = render(<NativeSelect {...PROPS} />);
    expect(getIcon(container)).not.toBeNull();

    rerender(<NativeSelect {...PROPS} multiple />);
    expect(getIcon(container)).toBe(null);
  });

  it("should handle the floating label state correctly for controlled values", () => {
    function Test(): ReactElement {
      const [value, setValue] = useState("");

      return (
        <>
          <button type="button" onClick={() => setValue(options[2])}>
            Set
          </button>
          <button type="button" onClick={() => setValue("")}>
            Reset
          </button>
          <NativeSelect
            id="field-id"
            label="Label"
            value={value}
            onChange={(event) => setValue(event.currentTarget.value)}
          >
            {options.map((opt) => (
              <option key={opt}>{opt}</option>
            ))}
          </NativeSelect>
        </>
      );
    }

    const { getByRole, getByText } = render(<Test />);

    const setButton = getByRole("button", { name: "Set" });
    const resetButton = getByRole("button", { name: "Reset" });
    const field = getByRole("combobox") as HTMLSelectElement;
    const label = getByText("Label");
    expect(label.className).not.toContain("rmd-floating-label--active");
    expect(label.className).not.toContain("rmd-floating-label--inactive");

    fireEvent.click(setButton);
    expect(label.className).toContain("rmd-floating-label--active");
    expect(label.className).toContain("rmd-floating-label--inactive");

    fireEvent.focus(field);
    fireEvent.change(field, { target: { value: options[1] } });
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
