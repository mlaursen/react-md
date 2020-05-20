import React from "react";
import { render } from "@testing-library/react";

import NativeSelect from "../NativeSelect";

const options = Array.from({ length: 3 }, (_, i) => `Option ${i + 1}`);
const PROPS = {
  id: "select",
  children: options.map((option) => (
    <option key={option} value={option}>
      Option
    </option>
  )),
};

const getIcon = (container: HTMLElement) =>
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
});
