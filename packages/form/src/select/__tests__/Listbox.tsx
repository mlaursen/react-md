import React from "react";
import { fireEvent, render } from "@testing-library/react";

import { Listbox } from "../Listbox";
import { getOptionId } from "../utils";

const options = Array.from({ length: 10 }, (_, i) => `Option ${i + 1}`);
const options2 = options.map((opt, i) => ({
  label: opt,
  value: opt,
  "data-testid": `option-${i + 1}`,
}));

const PROPS = {
  id: "listbox-1",
  "data-testid": "listbox",
  value: "",
  onChange: () => {},
  options,
};

describe("Listbox", () => {
  it("should default to rendering as a non-temporary and inline listbox", () => {
    const { getByTestId } = render(<Listbox {...PROPS} />);
    const listbox = getByTestId("listbox");

    expect(listbox).toMatchSnapshot();
  });

  it("should render each option with an id based on the index within the list and can be configured by the getOptionId prop", () => {
    const { rerender } = render(<Listbox {...PROPS} />);

    options.forEach((_, i) => {
      expect(document.getElementById(getOptionId(PROPS.id, i))).not.toBe(null);
    });

    const customGetOptionId = (baseId: string, i: number) =>
      `${baseId}-opt-${i}`;
    rerender(<Listbox {...PROPS} getOptionId={customGetOptionId} />);

    options.forEach((_, i) => {
      expect(document.getElementById(customGetOptionId(PROPS.id, i))).not.toBe(
        null
      );
    });
  });

  it("should render as null when the visible prop is set to false and the temporary prop is enabled", () => {
    const { container, getByTestId, rerender } = render(
      <Listbox {...PROPS} temporary visible={false} />
    );

    expect(container.firstChild).toBe(null);
    expect(() => getByTestId("listbox")).toThrow();

    rerender(<Listbox {...PROPS} temporary visible />);

    expect(container.firstChild).not.toBe(null);
    expect(() => getByTestId("listbox")).not.toThrow();

    rerender(<Listbox {...PROPS} temporary={false} visible={false} />);
    expect(container.firstChild).not.toBe(null);
    expect(() => getByTestId("listbox")).not.toThrow();
  });

  it("should trigger the onChange event handler when a new option is keyboard focused with the up and down arrow keys", () => {
    const onChange = jest.fn();
    const { getByTestId } = render(
      <Listbox {...PROPS} value="Option 1" onChange={onChange} />
    );
    const listbox = getByTestId("listbox");

    fireEvent.focus(listbox);
    fireEvent.keyDown(listbox, { key: "ArrowDown" });
    expect(onChange).toBeCalledWith(options[1], options[1], {
      id: PROPS.id,
      value: "Option 1",
      options: PROPS.options,
      valueKey: "value",
    });

    fireEvent.keyDown(listbox, { key: "ArrowDown" });
    expect(onChange).toBeCalledWith(options[2], options[2], {
      id: "listbox-1",
      value: "Option 1",
      options,
      valueKey: "value",
    });
  });

  it("should be able to render an option that is a string, a number, or an object", () => {
    const options = [
      "Option 1",
      0,
      1,
      { label: "Label", value: "A" },
      { value: "B", label: "Custom", children: <span>Custom</span> },
    ];

    const { getByTestId, rerender } = render(
      <Listbox {...PROPS} options={options} />
    );

    expect(getByTestId("listbox")).toMatchSnapshot();

    rerender(<Listbox {...PROPS} options={options} temporary visible />);
    expect(getByTestId("listbox")).toMatchSnapshot();
  });

  it("should not trigger the onChange event handler when a new option is keyboard focused with the up and down arrow keys if the disableMovementChange prop is enabled", () => {
    const onChange = jest.fn();
    const { getByTestId } = render(
      <Listbox
        {...PROPS}
        value="Option 1"
        onChange={onChange}
        disableMovementChange
      />
    );
    const listbox = getByTestId("listbox");

    fireEvent.focus(listbox);
    fireEvent.keyDown(listbox, { key: "ArrowDown" });
    expect(onChange).not.toBeCalled();

    fireEvent.keyDown(listbox, { key: "ArrowDown" });
    expect(onChange).not.toBeCalled();
  });

  it("should call the onChange handler when the enter or spacebar key is pressed after using the arrow keys to focus a new item when the disableMovementChange prop is enabled", () => {
    const onChange = jest.fn();
    const { getByTestId } = render(
      <Listbox
        {...PROPS}
        value="Option 1"
        onChange={onChange}
        disableMovementChange
      />
    );
    const listbox = getByTestId("listbox");

    fireEvent.focus(listbox);
    fireEvent.keyDown(listbox, { key: "ArrowDown" });
    fireEvent.keyDown(listbox, { key: "ArrowDown" });
    expect(onChange).not.toBeCalled();

    fireEvent.keyDown(listbox, { key: "Enter" });
    expect(onChange).toBeCalledWith(options[2], options[2], {
      id: "listbox-1",
      value: "Option 1",
      options: PROPS.options,
      valueKey: "value",
    });

    fireEvent.keyDown(listbox, { key: "ArrowUp" });
    expect(onChange).not.toBeCalledWith(options[1], options[1], {
      id: "listbox-1",
      value: "Option 1",
      options: PROPS.options,
      valueKey: "value",
    });
    fireEvent.keyDown(listbox, { key: " " });
    expect(onChange).toBeCalledWith(options[1], options[1], {
      id: "listbox-1",
      value: "Option 1",
      options: PROPS.options,
      valueKey: "value",
    });
  });

  it("should call the onChange handler when an option is clicked by a click event", () => {
    const onChange = jest.fn();
    const { getByTestId } = render(
      <Listbox
        {...PROPS}
        options={options2}
        value={options2[0].value}
        onChange={onChange}
      />
    );

    fireEvent.click(getByTestId("option-3"));
    expect(onChange).toBeCalledWith(options2[2].value, options2[2], {
      id: "listbox-1",
      value: "Option 1",
      options: options2,
      valueKey: "value",
    });
  });

  it("should default to having an empty aria-activedescendant if no value is provided to show that nothing is active at the time", () => {
    const { getByTestId } = render(<Listbox {...PROPS} />);
    const listbox = getByTestId("listbox");

    expect(listbox.getAttribute("tabIndex")).toBe("0");
    expect(listbox.getAttribute("aria-activedescendant")).toBe("");
  });

  it("should trigger the onRequestClose callback when the enter, spacebar or escape keys are pressed in a temporary listbox", () => {
    const onRequestClose = jest.fn();
    const { getByTestId } = render(
      <Listbox {...PROPS} temporary onRequestClose={onRequestClose} />
    );
    const listbox = getByTestId("listbox");

    fireEvent.focus(listbox);
    expect(onRequestClose).not.toBeCalled();

    fireEvent.keyDown(listbox, { key: " " });
    expect(onRequestClose).toBeCalledTimes(1);

    fireEvent.keyDown(listbox, { key: "Enter" });
    expect(onRequestClose).toBeCalledTimes(2);

    fireEvent.keyDown(listbox, { key: "Escape" });
    expect(onRequestClose).toBeCalledTimes(3);
  });

  it("should update the option that matches the current value to be selected and focused", () => {
    const props = {
      ...PROPS,
      value: options2[0].value,
      options: options2,
      temporary: true,
    };
    const { getByTestId, rerender } = render(<Listbox {...props} />);

    const option1 = getByTestId("option-1");
    const option2 = getByTestId("option-2");
    expect(option1.getAttribute("aria-selected")).toBe("true");
    expect(option2.getAttribute("aria-selected")).toBe(null);

    rerender(<Listbox {...props} value={options2[1].value} />);

    expect(option1.getAttribute("aria-selected")).toBe(null);
    expect(option2.getAttribute("aria-selected")).toBe("true");
  });

  it("should not change values when the readOnly prop is enabled", () => {
    const { getByText, getByTestId } = render(<Listbox {...PROPS} readOnly />);

    const listbox = getByTestId("listbox");
    const option1 = getByText("Option 1");
    const option2 = getByText("Option 2");
    expect(option1).not.toHaveAttribute("aria-selected");
    expect(option2).not.toHaveAttribute("aria-selected");

    listbox.focus();
    fireEvent.keyDown(listbox, { key: "ArrowDown" });
    expect(option1).not.toHaveAttribute("aria-selected");
    expect(option2).not.toHaveAttribute("aria-selected");

    fireEvent.click(option1);
    expect(option1).not.toHaveAttribute("aria-selected");
  });

  it("should correctly call the onKeyDown prop", () => {
    const onKeyDown = jest.fn();
    const { getByTestId } = render(
      <Listbox {...PROPS} onKeyDown={onKeyDown} />
    );

    const listbox = getByTestId("listbox");
    fireEvent.keyDown(listbox, { key: "ArrowDown" });
    expect(onKeyDown).toBeCalledTimes(1);
  });

  it("should correctly call the onFocus prop", () => {
    const onFocus = jest.fn();
    const { getByTestId } = render(<Listbox {...PROPS} onFocus={onFocus} />);

    const listbox = getByTestId("listbox");
    listbox.focus();
    expect(onFocus).toBeCalledTimes(1);
  });

  it("should throw a warning in a non-production NODE_ENV if there is a non-searchable value", () => {
    const { NODE_ENV } = process.env;
    process.env.NODE_ENV = "production";
    const warn = jest.spyOn(console, "warn");
    // hide warnings
    warn.mockImplementation(() => {});

    const options = [{ l: "This is something" }];
    const props = { ...PROPS, options };
    const { unmount } = render(<Listbox {...props} />);
    unmount();
    expect(warn).not.toBeCalled();

    process.env.NODE_ENV = NODE_ENV;
    render(<Listbox {...props} />);

    expect(warn).toBeCalledWith(
      `A listbox with an id of "${PROPS.id}" has an option that does not have a searchable label string. ` +
        "Users will be unable to use the typeahead feature in the Listbox component until this is fixed. " +
        "To fix this warning, you can use the `labelKey` prop on the `Listbox`/`Select` component to point " +
        "to a string on the following option:",
      options[0]
    );

    warn.mockRestore();
  });
});
