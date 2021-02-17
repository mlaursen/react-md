import React, { ReactElement, useState } from "react";
import { fireEvent, render } from "@testing-library/react";

import { RadioGroup, RadioGroupProps } from "../RadioGroup";

const ITEMS = ["Item 1", "Item 2", "Item 3"];

function Test({
  defaultValue = "",
  items = ITEMS,
  ...props
}: Partial<RadioGroupProps> & { defaultValue?: string }): ReactElement {
  const [value, setValue] = useState(defaultValue);

  return (
    <RadioGroup
      id="radio-group"
      aria-label="Radio Group"
      {...props}
      items={items}
      value={value}
      onChange={setValue}
    />
  );
}

describe("RadioGroup, RadioGroupProps", () => {
  it("should handle the roving tab index correctly and other keyboard behavior", () => {
    const { getByRole } = render(<Test />);

    const item1 = getByRole("radio", { name: "Item 1" });
    const item2 = getByRole("radio", { name: "Item 2" });
    const item3 = getByRole("radio", { name: "Item 3" });
    expect(item1).toHaveAttribute("tabIndex", "0");
    expect(item2).toHaveAttribute("tabIndex", "0");
    expect(item3).toHaveAttribute("tabIndex", "0");

    fireEvent.focus(item1);
    expect(item1).toHaveAttribute("tabIndex", "-1");
    expect(item2).toHaveAttribute("tabIndex", "-1");
    expect(item3).toHaveAttribute("tabIndex", "-1");

    fireEvent.blur(item1);
    expect(item1).toHaveAttribute("tabIndex", "0");
    expect(item2).toHaveAttribute("tabIndex", "0");
    expect(item3).toHaveAttribute("tabIndex", "0");

    fireEvent.focus(item1);
    expect(item1).toHaveAttribute("tabIndex", "-1");
    expect(item2).toHaveAttribute("tabIndex", "-1");
    expect(item3).toHaveAttribute("tabIndex", "-1");

    fireEvent.keyDown(item1, { key: " " });
    expect(document.activeElement).toBe(item1);
    expect(item1).toHaveAttribute("tabIndex", "0");
    expect(item2).toHaveAttribute("tabIndex", "-1");
    expect(item3).toHaveAttribute("tabIndex", "-1");
    expect(item1).toHaveAttribute("aria-checked", "true");
    expect(item2).toHaveAttribute("aria-checked", "false");
    expect(item3).toHaveAttribute("aria-checked", "false");

    fireEvent.keyDown(item1, { key: "ArrowDown" });
    expect(document.activeElement).toBe(item2);
    expect(item1).toHaveAttribute("tabIndex", "-1");
    expect(item2).toHaveAttribute("tabIndex", "0");
    expect(item3).toHaveAttribute("tabIndex", "-1");
    expect(item1).toHaveAttribute("aria-checked", "false");
    expect(item2).toHaveAttribute("aria-checked", "true");
    expect(item3).toHaveAttribute("aria-checked", "false");

    fireEvent.keyDown(item2, { key: "ArrowRight" });
    expect(document.activeElement).toBe(item3);
    expect(item1).toHaveAttribute("tabIndex", "-1");
    expect(item2).toHaveAttribute("tabIndex", "-1");
    expect(item3).toHaveAttribute("tabIndex", "0");
    expect(item1).toHaveAttribute("aria-checked", "false");
    expect(item2).toHaveAttribute("aria-checked", "false");
    expect(item3).toHaveAttribute("aria-checked", "true");

    // looping
    fireEvent.keyDown(item3, { key: "ArrowRight" });
    expect(document.activeElement).toBe(item1);
    expect(item1).toHaveAttribute("tabIndex", "0");
    expect(item2).toHaveAttribute("tabIndex", "-1");
    expect(item3).toHaveAttribute("tabIndex", "-1");
    expect(item1).toHaveAttribute("aria-checked", "true");
    expect(item2).toHaveAttribute("aria-checked", "false");
    expect(item3).toHaveAttribute("aria-checked", "false");

    fireEvent.keyDown(item1, { key: "ArrowUp" });
    expect(document.activeElement).toBe(item3);
    expect(item1).toHaveAttribute("tabIndex", "-1");
    expect(item2).toHaveAttribute("tabIndex", "-1");
    expect(item3).toHaveAttribute("tabIndex", "0");
    expect(item1).toHaveAttribute("aria-checked", "false");
    expect(item2).toHaveAttribute("aria-checked", "false");
    expect(item3).toHaveAttribute("aria-checked", "true");

    fireEvent.keyDown(item3, { key: "ArrowLeft" });
    expect(document.activeElement).toBe(item2);
    expect(item1).toHaveAttribute("tabIndex", "-1");
    expect(item2).toHaveAttribute("tabIndex", "0");
    expect(item3).toHaveAttribute("tabIndex", "-1");
    expect(item1).toHaveAttribute("aria-checked", "false");
    expect(item2).toHaveAttribute("aria-checked", "true");
    expect(item3).toHaveAttribute("aria-checked", "false");
  });

  it("should't have custom keyboard behavior of other keys or a radio cannot be found", () => {
    const { getByRole } = render(<Test />);

    const item1 = getByRole("radio", { name: "Item 1" });
    const group = getByRole("radiogroup");

    fireEvent.keyDown(group, { key: " " });
    fireEvent.click(group);
    expect(item1).toHaveAttribute("aria-checked", "false");
    expect(item1).toHaveAttribute("tabIndex", "0");

    fireEvent.focus(item1);
    fireEvent.keyDown(item1, { key: "A" });
    expect(item1).toHaveAttribute("aria-checked", "false");
    expect(item1).toHaveAttribute("tabIndex", "-1");
  });

  it("should try to submit a form when the enter key is pressed", () => {
    // Error: Not implemented: HTMLFormElement.prototype.submit
    const error = jest.spyOn(console, "error").mockImplementation(() => {});
    const onSubmit = jest.fn();
    const { getByRole, rerender } = render(
      <form onSubmit={onSubmit}>
        <Test />
        <button type="submit">Submit</button>
      </form>
    );

    let item1 = getByRole("radio", { name: "Item 1" });
    fireEvent.click(item1);
    expect(onSubmit).not.toBeCalled();

    fireEvent.keyDown(item1, { key: "Enter" });
    expect(onSubmit).toBeCalledTimes(1);

    onSubmit.mockClear();
    rerender(
      <>
        <form id="form-id" onSubmit={onSubmit}>
          <Test />
        </form>
        <button type="submit" form="form-id">
          Submit
        </button>
      </>
    );

    item1 = getByRole("radio", { name: "Item 1" });
    fireEvent.click(item1);
    expect(onSubmit).not.toBeCalled();

    fireEvent.keyDown(item1, { key: "Enter" });
    expect(onSubmit).toBeCalledTimes(1);
    error.mockRestore();
  });

  it("should be able to render object items", () => {
    const items = [
      { value: "Item 1" },
      { value: "Item 2" },
      { value: "Item 3" },
    ];
    const { container, rerender } = render(<Test />);

    expect(container).toMatchSnapshot();

    rerender(<Test items={items} />);
    expect(container).toMatchSnapshot();

    const items2 = [
      { value: "a", children: "Item 1" },
      { value: "b", children: <span>Item 2</span> },
      { value: "Item 3", children: null },
    ];
    rerender(<Test items={items2} />);
    expect(container).toMatchSnapshot();
  });

  it("should still call the onBlur, onFocus, onClick, and onKeyDown props", () => {
    const onBlur = jest.fn();
    const onFocus = jest.fn();
    const onClick = jest.fn();
    const onKeyDown = jest.fn();

    const { getByRole } = render(
      <Test
        onBlur={onBlur}
        onFocus={onFocus}
        onClick={onClick}
        onKeyDown={onKeyDown}
      />
    );

    const item1 = getByRole("radio", { name: "Item 1" });

    fireEvent.focus(item1);
    expect(onFocus).toBeCalledTimes(1);

    fireEvent.keyDown(item1, { key: " " });
    expect(onKeyDown).toBeCalledTimes(1);
    expect(onClick).toBeCalledTimes(1);

    fireEvent.click(item1);
    expect(onClick).toBeCalledTimes(2);

    fireEvent.blur(item1);
    expect(onBlur).toBeCalledTimes(1);
  });

  it("should default to applying any style and className found on the item objects", () => {
    const items = [
      {
        value: "a",
        children: "Item 1",
        style: { color: "red" },
      },
      {
        value: "b",
        children: "Item 2",
        className: "item--orange",
      },
      {
        value: "c",
        children: "Item 2",
        style: { backgroundColor: "purple" },
        className: "item--boop",
      },
    ];

    const { container } = render(<Test items={items} />);
    expect(container).toMatchSnapshot();
  });

  it("should allow for custom style and classes with the getRadioStyle and getRadioClassName props", () => {
    const { getByRole } = render(
      <Test
        getRadioStyle={(item) => {
          if (item.checked) {
            return { color: "red" };
          }
        }}
        getRadioClassName={(item) => `item--${item.index}`}
      />
    );

    const item1 = getByRole("radio", { name: "Item 1" });
    const item2 = getByRole("radio", { name: "Item 2" });
    const item3 = getByRole("radio", { name: "Item 3" });

    expect(item1).toHaveClass("item--0");
    expect(item2).toHaveClass("item--1");
    expect(item3).toHaveClass("item--2");
    expect(item1.style.color).toBe("");
    expect(item2.style.color).toBe("");
    expect(item3.style.color).toBe("");

    fireEvent.click(item2);
    expect(item1).toHaveClass("item--0");
    expect(item2).toHaveClass("item--1");
    expect(item3).toHaveClass("item--2");
    expect(item1.style.color).toBe("");
    expect(item2.style.color).toBe("red");
    expect(item3.style.color).toBe("");
  });
});
