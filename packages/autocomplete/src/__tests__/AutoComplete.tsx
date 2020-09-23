import React from "react";
import {
  render,
  fireEvent,
  waitForElementToBeRemoved,
} from "@testing-library/react";

import { AutoComplete } from "../AutoComplete";
import { AutoCompleteProps } from "../types";
import states from "../../../documentation/src/constants/states";

function getById<E extends HTMLElement>(id: string): E {
  const el = document.getElementById(id);
  if (!el) {
    throw new Error();
  }

  return el as E;
}

const PROPS: AutoCompleteProps = {
  id: "autocomplete",
  data: states,
  labelKey: "name",
  valueKey: "name",
  omitKeys: ["abbreviation"],
};

describe("AutoComplete", () => {
  it("should handle a normal filter flow", () => {
    const { container, getByRole, queryAllByRole, getByText } = render(
      <AutoComplete {...PROPS} />
    );
    const input = getById<HTMLInputElement>("autocomplete");

    expect(input.value).toBe("");
    fireEvent.focus(input);

    expect(queryAllByRole("option").length).toBe(states.length);
    states.forEach(({ name }) => {
      expect(() => getByText(name)).not.toThrow();
    });
    expect(() => getByRole("listbox")).not.toThrow();

    fireEvent.change(input, { target: { value: "alask" } });
    expect(container).toMatchSnapshot();
    expect(queryAllByRole("option").length).toBe(1);
    expect(() => getByText("Alaska")).not.toThrow();

    fireEvent.change(input, { target: { value: "ala" } });
    expect(queryAllByRole("option").length).toBe(2);
    expect(() => getByText("Alabama")).not.toThrow();
    expect(() => getByText("Alaska")).not.toThrow();

    fireEvent.click(getByText("Alaska"));
    expect(input.value).toBe("Alaska");
  });

  it("should handle keyboard movement correctly", async () => {
    const { getByRole } = render(<AutoComplete {...PROPS} />);
    const input = getById<HTMLInputElement>("autocomplete");
    const getListbox = () => getByRole("listbox");

    input.focus();
    expect(document.activeElement).toBe(input);
    expect(getListbox).not.toThrow();
    expect(input).toHaveAttribute("aria-activedescendant", "");

    fireEvent.keyDown(input, { key: "Escape" });
    await waitForElementToBeRemoved(getListbox);

    fireEvent.keyDown(input, { key: "ArrowDown", altKey: true });
    expect(getListbox).not.toThrow();
    expect(input).toHaveAttribute("aria-activedescendant", "");

    fireEvent.keyDown(input, { key: "ArrowDown" });
    expect(input).toHaveAttribute(
      "aria-activedescendant",
      "autocomplete-listbox-result-1"
    );

    fireEvent.keyDown(input, { key: "Enter" });
    await waitForElementToBeRemoved(getListbox);
    expect(input.value).toBe("Alabama");
    expect(input).toHaveAttribute("aria-activedescendant", "");

    fireEvent.change(input, { target: { value: "" } });
    fireEvent.keyDown(input, { key: "ArrowDown", altKey: true });
    expect(getListbox).not.toThrow();
    expect(input).toHaveAttribute("aria-activedescendant", "");

    fireEvent.keyDown(input, { key: "ArrowDown" });
    fireEvent.keyDown(input, { key: "ArrowDown" });
    expect(input).toHaveAttribute(
      "aria-activedescendant",
      "autocomplete-listbox-result-2"
    );
    fireEvent.keyDown(input, { key: "ArrowUp", altKey: true });
    await waitForElementToBeRemoved(getListbox);
    expect(input).toHaveAttribute("aria-activedescendant", "");
  });

  it("should close the menu or clear the value when the escape key is pressed", async () => {
    const { getByRole } = render(<AutoComplete {...PROPS} />);
    const input = getById<HTMLInputElement>("autocomplete");
    const getListbox = () => getByRole("listbox");

    input.focus();
    fireEvent.change(input, { target: { value: "con" } });
    expect(input.value).toBe("con");
    expect(getListbox).not.toThrow();

    fireEvent.keyDown(input, { key: "Escape" });
    expect(input.value).toBe("con");
    await waitForElementToBeRemoved(getListbox);

    expect(input.value).toBe("con");
    fireEvent.keyDown(input, { key: "Escape" });
    expect(input.value).toBe("");
  });

  it("should correctly call the on* props if provided", () => {
    const onFocus = jest.fn();
    const onBlur = jest.fn();
    const onChange = jest.fn();
    const onClick = jest.fn();
    const onKeyDown = jest.fn();

    render(
      <AutoComplete
        {...PROPS}
        onFocus={onFocus}
        onBlur={onBlur}
        onChange={onChange}
        onClick={onClick}
        onKeyDown={onKeyDown}
      />
    );
    const input = getById<HTMLInputElement>("autocomplete");

    fireEvent.focus(input);
    expect(onFocus).toBeCalledTimes(1);
    expect(onBlur).not.toBeCalled();
    expect(onChange).not.toBeCalled();
    expect(onClick).not.toBeCalled();
    expect(onKeyDown).not.toBeCalled();

    fireEvent.keyDown(input, { key: "h" });
    expect(onFocus).toBeCalledTimes(1);
    expect(onBlur).not.toBeCalled();
    expect(onChange).not.toBeCalled();
    expect(onClick).not.toBeCalled();
    expect(onKeyDown).toBeCalledTimes(1);

    fireEvent.change(input, { target: { value: "hello" } });
    expect(onFocus).toBeCalledTimes(1);
    expect(onBlur).not.toBeCalled();
    expect(onChange).toBeCalledTimes(1);
    expect(onClick).not.toBeCalled();
    expect(onKeyDown).toBeCalledTimes(1);

    fireEvent.blur(input);
    expect(onFocus).toBeCalledTimes(1);
    expect(onBlur).toBeCalledTimes(1);
    expect(onChange).toBeCalledTimes(1);
    expect(onClick).not.toBeCalled();
    expect(onKeyDown).toBeCalledTimes(1);

    fireEvent.click(input);
    expect(onFocus).toBeCalledTimes(1);
    expect(onBlur).toBeCalledTimes(1);
    expect(onChange).toBeCalledTimes(1);
    expect(onClick).toBeCalledTimes(1);
    expect(onKeyDown).toBeCalledTimes(1);
  });

  it("should not show the listbox on focus if the data list is empty, the autocomplete behavior is inline, or there is no data", () => {
    const { rerender, getByRole } = render(
      <AutoComplete {...PROPS} data={[]} />
    );
    const input = getById<HTMLInputElement>("autocomplete");
    const getListbox = () => getByRole("listbox");

    fireEvent.focus(input);
    expect(getListbox).toThrow();
    fireEvent.blur(input);

    rerender(<AutoComplete {...PROPS} autoComplete="inline" />);
    fireEvent.focus(input);
    expect(getListbox).toThrow();
    fireEvent.blur(input);

    rerender(<AutoComplete {...PROPS} disableShowOnFocus />);
    fireEvent.focus(input);
    expect(getListbox).toThrow();
    fireEvent.blur(input);
  });

  it("should be able to render content before and after the matching data", () => {
    const beforeResultsChildren = <div>Before Results</div>;
    const afterResultsChildren = <div>After Results</div>;
    const { getByText, getByRole } = render(
      <AutoComplete
        {...PROPS}
        data={states.slice(0, 5)}
        beforeResultsChildren={beforeResultsChildren}
        afterResultsChildren={afterResultsChildren}
      />
    );

    const input = getById<HTMLInputElement>("autocomplete");
    const getListbox = () => getByRole("listbox");
    const getBeforeResults = () => getByText("Before Results");
    const getAfterResults = () => getByText("After Results");

    expect(getBeforeResults).toThrow();
    expect(getAfterResults).toThrow();

    fireEvent.focus(input);
    expect(getBeforeResults).not.toThrow();
    expect(getAfterResults).not.toThrow();

    const listbox = getListbox();
    expect(listbox.firstChild?.textContent).toBe("Before Results");
    expect(listbox.lastChild?.textContent).toBe("After Results");
    expect(listbox).toMatchSnapshot();

    // filtered matches
    fireEvent.change(input, { value: "Am" });
    expect(listbox.firstChild?.textContent).toBe("Before Results");
    expect(listbox.lastChild?.textContent).toBe("After Results");
    expect(listbox).toMatchSnapshot();

    // no matches
    fireEvent.change(input, { value: "Aml" });
    expect(listbox.firstChild?.textContent).toBe("Before Results");
    expect(listbox.lastChild?.textContent).toBe("After Results");
    expect(listbox).toMatchSnapshot();
  });
});
