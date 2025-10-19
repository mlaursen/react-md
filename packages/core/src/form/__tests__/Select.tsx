import { type ReactElement, createRef, useState } from "react";
import { describe, expect, it, vi } from "vitest";

import { Avatar } from "../../avatar/Avatar.js";
import { Button } from "../../button/Button.js";
import { FontIcon } from "../../icon/FontIcon.js";
import { CircularProgress } from "../../progress/CircularProgress.js";
import {
  act,
  getSelectTestElements,
  rmdRender,
  screen,
  userEvent,
  waitFor,
  waitForElementToBeRemoved,
  within,
} from "../../test-utils/index.js";
import { TRANSITION_CONFIG } from "../../transition/config.js";
import { Form } from "../Form.js";
import { OptGroup } from "../OptGroup.js";
import { Option } from "../Option.js";
import { Select, type SelectProps } from "../Select.js";

function Test<Value extends string = string>(
  props: Partial<SelectProps<Value>>
): ReactElement {
  return (
    <Select
      label="Select"
      {...props}
      selectedOptionProps={{ "data-testid": "selected" }}
    >
      <Option value="a">Option 1</Option>
      <Option value="b">Option 2</Option>
      <Option value="c">Option 3</Option>
      <Option value="d">Option 4</Option>
    </Select>
  );
}

function render<Value extends string = string>(
  props: Partial<SelectProps<Value>> = {}
) {
  const user = userEvent.setup();
  const { rerender } = rmdRender(<Test {...props} />);
  const { select, selectInput, selectedOption } = getSelectTestElements({
    name: "Select",
  });

  return {
    rerender: (props: Partial<SelectProps<Value>>) => {
      rerender(<Test {...props} />);
    },
    user,
    select,
    selectInput,
    selectedOption,
  };
}

describe("Select", () => {
  it("should apply the correct styling, HTMLAttributes, and allow a ref", () => {
    const inputRef = createRef<HTMLInputElement>();
    const { rerender, select, selectInput } = render({ inputRef });

    expect(inputRef.current).toBeInstanceOf(HTMLInputElement);
    expect(inputRef.current).toBe(selectInput);
    expect(select).toMatchSnapshot();

    rerender({
      inputRef,
      style: { color: "white" },
      className: "custom-class-name",
    });
    expect(select).toMatchSnapshot();
  });

  it("should automatically pull options from the children and update when selected", async () => {
    const { user, select, selectInput } = render();
    expect(selectInput).toHaveValue("");

    await user.click(select);

    let listbox = screen.getByRole("listbox", { name: "Select" });
    expect(() => screen.getByRole("option", { checked: true })).toThrow();
    expect(listbox).toMatchSnapshot();

    await user.click(screen.getByRole("option", { name: "Option 1" }));
    expect(listbox).not.toBeInTheDocument();
    expect(selectInput).toHaveValue("a");
    expect(select).toHaveTextContent(/Option 1/);

    await user.click(select);
    listbox = screen.getByRole("listbox", { name: "Select" });
    expect(() =>
      screen.getByRole("option", { name: "Option 1", selected: true })
    ).not.toThrow();
    expect(listbox).toMatchSnapshot();

    await user.click(screen.getByRole("option", { name: "Option 2" }));
    expect(listbox).not.toBeInTheDocument();
    expect(selectInput).toHaveValue("b");
    expect(select).toHaveTextContent(/Option 2/);
  });

  it("should allow for a default value", async () => {
    const { user, select, selectInput } = render({ defaultValue: "c" });
    expect(selectInput).toHaveValue("c");

    await user.click(select);
    expect(() =>
      screen.getByRole("option", { name: "Option 3", checked: true })
    ).toThrow();
  });

  it("should allow the value to be controlled", async () => {
    type Value = "a" | "b" | "c" | "d";
    function ControlledTest(): ReactElement {
      const [value, setValue] = useState<Value | "">("");

      return (
        <>
          <div data-testid="value">{value}</div>
          <Test
            value={value}
            // this should be correctly typed to `Value | ""`
            onChange={(event) => {
              setValue(event.currentTarget.value);
            }}
          />
        </>
      );
    }

    const user = userEvent.setup();
    rmdRender(<ControlledTest />);
    const select = screen.getByRole("combobox", { name: "Select" });
    const selectValue = screen.getByRole("textbox", { hidden: true });
    const value = screen.getByTestId("value");
    expect(selectValue).toHaveValue("");
    expect(value).toHaveTextContent("");

    await user.click(select);
    expect(() => screen.getByRole("option", { checked: true })).toThrow();
    await user.click(screen.getByRole("option", { name: "Option 4" }));
    expect(selectValue).toHaveValue("d");
    expect(value).toHaveTextContent("d");
  });

  it("should allow for the OptGroup to be used", async () => {
    function Test(): ReactElement {
      return (
        <Select label="Select a fruit">
          <OptGroup label="A">
            <Option value="apple">Apple</Option>
            <Option value="apricot">Apricot</Option>
            <Option value="avocado">Avocado</Option>
          </OptGroup>
          <OptGroup label="B">
            <Option value="blueberry">Blueberry</Option>
          </OptGroup>
          <OptGroup label={<span>C</span>}>
            <Option value="cranberry">Cranberry</Option>
            <Option value="currant">Currant</Option>
          </OptGroup>
        </Select>
      );
    }

    const user = userEvent.setup();
    rmdRender(<Test />);
    const select = screen.getByRole("combobox", { name: "Select a fruit" });
    const selectValue = screen.getByRole("textbox", { hidden: true });
    await user.click(select);

    const listbox = screen.getByRole("listbox", { name: "Select a fruit" });
    expect(listbox).toMatchSnapshot();

    await user.click(screen.getByRole("option", { name: "Apple" }));
    expect(listbox).not.toBeInTheDocument();
    expect(selectValue).toHaveValue("apple");
    expect(select).toHaveTextContent(/Apple/);
  });

  it("should include the leftAddon of the selected option unless disableOptionAddon is true", async () => {
    function Test(props: { disableOptionAddon?: boolean }): ReactElement {
      const { disableOptionAddon } = props;
      return (
        <Select
          label="Select"
          disableOptionAddon={disableOptionAddon}
          selectedOptionProps={{ "data-testid": "selected" }}
        >
          <Option
            value="a"
            leftAddon={
              <Avatar data-testid="avatar" size="icon">
                A
              </Avatar>
            }
          >
            Avatar
          </Option>
          <Option
            value="b"
            leftAddon={<FontIcon data-testid="icon">favorite</FontIcon>}
          >
            Icon
          </Option>
        </Select>
      );
    }

    const user = userEvent.setup();
    const { rerender } = rmdRender(<Test />);
    const select = screen.getByRole("combobox", { name: "Select" });
    const selected = screen.getByTestId("selected");
    expect(selected).toBeEmptyDOMElement();

    await user.click(select);
    await user.click(screen.getByRole("option", { name: "Avatar" }));

    expect(() => within(selected).getByTestId("avatar")).not.toThrow();
    expect(selected).toMatchSnapshot();

    await user.click(select);
    await user.click(screen.getByRole("option", { name: "Icon" }));
    expect(() => within(selected).getByTestId("icon")).not.toThrow();
    expect(selected).toMatchSnapshot();

    rerender(<Test disableOptionAddon />);
    expect(() => within(selected).getByTestId("icon")).toThrow();
  });

  it("should allow the selected icon to appear after the option instead of before", async () => {
    const { user, select, rerender } = render({ defaultValue: "a" });
    await user.click(select);

    const option1 = screen.getByRole("option", {
      name: "Option 1",
      selected: true,
    });
    expect(option1.firstElementChild).toHaveClass("rmd-icon");
    expect(option1).toMatchSnapshot();

    rerender({ defaultValue: "a", selectedIconAfter: true });
    expect(option1.lastElementChild).toHaveClass("rmd-icon");
    expect(option1).toMatchSnapshot();
  });

  it("should be able to remove the selected icon from all options", async () => {
    const { user, select } = render({
      defaultValue: "a",
      disableSelectedIcon: true,
    });
    await user.click(select);

    const option1 = screen.getByRole("option", {
      name: "Option 1",
      selected: true,
    });
    expect(option1.querySelector(".rmd-icon")).toBeNull();
  });

  it("should not be interactable while disabled", async () => {
    const { user, select } = render({ disabled: true });
    expect(select).toHaveAttribute("tabindex", "-1");
    expect(select).toHaveAttribute("aria-disabled", "true");

    await user.click(select);
    expect(() => screen.getByRole("listbox")).toThrow();

    act(() => {
      select.focus();
    });

    await user.keyboard("[Space]");
    expect(() => screen.getByRole("listbox")).toThrow();
  });

  it("should open the listbox and focus the last element when the arrow up key is pressed unless there is a value", async () => {
    const { user, select, selectInput } = render();
    act(() => {
      select.focus();
    });

    await user.keyboard("[ArrowUp]");
    const option4 = screen.getByRole("option", { name: "Option 4" });
    expect(select).toHaveAttribute("aria-activedescendant", option4.id);

    await user.keyboard("[ArrowUp][Enter]");
    expect(select).toHaveAttribute("aria-activedescendant", "");
    expect(selectInput).toHaveValue("c");

    await user.keyboard("[ArrowUp]");
    const option3 = screen.getByRole("option", { name: "Option 3" });
    expect(select).toHaveAttribute("aria-activedescendant", option3.id);
  });

  it("should not error if there are no options even though it's not worthwhile", async () => {
    function Test(): ReactElement {
      return (
        <Select label="Select">
          <CircularProgress aria-label="Loading..." />
        </Select>
      );
    }

    const user = userEvent.setup();
    rmdRender(<Test />);
    const select = screen.getByRole("combobox", { name: "Select" });

    await user.click(select);
    expect(select).toHaveAttribute("aria-activedescendant", "");
  });

  it("should update the active-descendant while mounting if transitions are not disabled", async () => {
    TRANSITION_CONFIG.disabled = false;
    const onEntering = vi.fn();
    const onEntered = vi.fn();
    const { user, select, rerender } = render({
      menuProps: { onEntering, onEntered },
    });

    await user.click(select);
    await waitFor(() => {
      expect(onEntered).toHaveBeenCalledTimes(1);
    });
    expect(onEntering).toHaveBeenCalledTimes(1);

    const listbox = screen.getByRole("listbox", { name: "Select" });
    expect(select).toHaveAttribute(
      "aria-activedescendant",
      screen.getByRole("option", { name: "Option 1" }).id
    );

    await user.keyboard("[Tab]");
    await waitForElementToBeRemoved(listbox);
    expect(select).toHaveAttribute("aria-activedescendant", "");

    rerender({
      menuProps: { onEntering, onEntered, disableTransition: true },
    });
    await user.click(select);
    await waitFor(() => {
      expect(onEntered).toHaveBeenCalledTimes(2);
    });
    expect(onEntering).toHaveBeenCalledTimes(1);
    expect(select).toHaveAttribute(
      "aria-activedescendant",
      screen.getByRole("option", { name: "Option 1" }).id
    );

    TRANSITION_CONFIG.disabled = true;
  });

  describe("keyboard behavior", () => {
    it("should open the listbox when the spacebar key is pressed and automatically focus the first element", async () => {
      const { user, select, selectInput } = render();
      act(() => {
        select.focus();
      });

      await user.keyboard("[Space]");
      let option1 = screen.getByRole("option", { name: "Option 1" });
      let option2 = screen.getByRole("option", { name: "Option 2" });
      let option3 = screen.getByRole("option", { name: "Option 3" });
      let option4 = screen.getByRole("option", { name: "Option 4" });

      expect(select).toHaveFocus();
      expect(select).toHaveAttribute("aria-activedescendant", option1.id);

      await user.keyboard("[End]");
      expect(select).toHaveFocus();
      expect(select).toHaveAttribute("aria-activedescendant", option4.id);

      await user.keyboard("[ArrowDown]");
      expect(select).toHaveAttribute("aria-activedescendant", option4.id);

      await user.keyboard("[ArrowUp]");
      expect(select).toHaveAttribute("aria-activedescendant", option3.id);

      await user.keyboard("[Home]");
      expect(select).toHaveAttribute("aria-activedescendant", option1.id);

      await user.keyboard("[ArrowUp]");
      expect(select).toHaveAttribute("aria-activedescendant", option1.id);

      await user.keyboard("[ArrowDown]");
      expect(select).toHaveAttribute("aria-activedescendant", option2.id);

      await user.keyboard("o");
      expect(select).toHaveAttribute("aria-activedescendant", option3.id);

      await user.keyboard("[Enter]");
      expect(selectInput).toHaveValue("c");
      expect(select).toHaveAttribute("aria-activedescendant", "");

      await user.keyboard("[Space]");
      option1 = screen.getByRole("option", { name: "Option 1" });
      option2 = screen.getByRole("option", { name: "Option 2" });
      option3 = screen.getByRole("option", { name: "Option 3" });
      option4 = screen.getByRole("option", { name: "Option 4" });

      expect(select).toHaveFocus();
      expect(select).toHaveAttribute("aria-activedescendant", option3.id);

      await user.keyboard("[Escape]");
      expect(select).toHaveAttribute("aria-activedescendant", "");
      expect(selectInput).toHaveValue("c");
    });

    it("should submit the form when the enter key is pressed while the listbox is not visible", async () => {
      const user = userEvent.setup();
      const onSubmit = vi.fn();
      rmdRender(
        <Form name="form" onSubmit={onSubmit}>
          <Test />
          <Button type="submit">Submit</Button>
        </Form>
      );

      const select = screen.getByRole("combobox", { name: "Select" });
      const selectValue = screen.getByRole("textbox", { hidden: true });
      act(() => {
        select.focus();
      });

      await user.keyboard("[Space]");
      expect(onSubmit).not.toHaveBeenCalled();
      expect(select).toHaveAttribute(
        "aria-activedescendant",
        screen.getByRole("option", { name: "Option 1" }).id
      );

      await user.keyboard("[Enter]");
      expect(selectValue).toHaveValue("a");

      await user.keyboard("[Enter]");
      expect(onSubmit).toHaveBeenCalledTimes(1);
    });
  });
});
