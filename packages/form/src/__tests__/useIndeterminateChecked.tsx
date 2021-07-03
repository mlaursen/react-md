import React from "react";
import { fireEvent, render } from "@testing-library/react";

import { useIndeterminateChecked } from "../useIndeterminateChecked";
import { Checkbox } from "../toggle";
import { MenuItemCheckbox } from "../menu/MenuItemCheckbox";

const values = ["a", "b", "c", "d"] as const;
const LABELS = {
  a: "Label 1",
  b: "Label 2",
  c: "Label 3",
  d: "Label 4",
} as const;

describe("useIndeterminateChecked", () => {
  it("should work with normal checkboxes", () => {
    function Test() {
      const { rootProps, getProps } = useIndeterminateChecked(values);
      return (
        <>
          <Checkbox id="checkbox-1" label="Toggle All" {...rootProps} />
          {values.map((value, i) => (
            <Checkbox
              id={`valued-checkbox-${i + 1}`}
              {...getProps(value)}
              key={value}
              label={LABELS[value]}
            />
          ))}
        </>
      );
    }
    const { getByRole } = render(<Test />);

    const root = getByRole("checkbox", {
      name: "Toggle All",
    }) as HTMLInputElement;
    const checkbox1 = getByRole("checkbox", {
      name: "Label 1",
    }) as HTMLInputElement;
    const checkbox2 = getByRole("checkbox", {
      name: "Label 2",
    }) as HTMLInputElement;
    const checkbox3 = getByRole("checkbox", {
      name: "Label 3",
    }) as HTMLInputElement;
    const checkbox4 = getByRole("checkbox", {
      name: "Label 4",
    }) as HTMLInputElement;

    expect(root.checked).toBe(false);
    expect(checkbox1.checked).toBe(false);
    expect(checkbox2.checked).toBe(false);
    expect(checkbox3.checked).toBe(false);
    expect(checkbox4.checked).toBe(false);

    fireEvent.click(root);
    expect(root.checked).toBe(true);
    expect(checkbox1.checked).toBe(true);
    expect(checkbox2.checked).toBe(true);
    expect(checkbox3.checked).toBe(true);
    expect(checkbox4.checked).toBe(true);

    fireEvent.click(checkbox1);
    expect(root.checked).toBe(true);
    expect(checkbox1.checked).toBe(false);
    expect(checkbox2.checked).toBe(true);
    expect(checkbox3.checked).toBe(true);
    expect(checkbox4.checked).toBe(true);

    fireEvent.click(root);
    expect(root.checked).toBe(true);
    expect(checkbox1.checked).toBe(true);
    expect(checkbox2.checked).toBe(true);
    expect(checkbox3.checked).toBe(true);
    expect(checkbox4.checked).toBe(true);

    fireEvent.click(root);
    expect(root.checked).toBe(false);
    expect(checkbox1.checked).toBe(false);
    expect(checkbox2.checked).toBe(false);
    expect(checkbox3.checked).toBe(false);
    expect(checkbox4.checked).toBe(false);

    fireEvent.click(checkbox2);
    expect(root.checked).toBe(true);
    expect(checkbox1.checked).toBe(false);
    expect(checkbox2.checked).toBe(true);
    expect(checkbox3.checked).toBe(false);
    expect(checkbox4.checked).toBe(false);
  });

  it("should work for MenuItemCheckbox", () => {
    function Test() {
      const { rootProps, getProps } = useIndeterminateChecked(values, {
        menu: true,
      });
      return (
        <>
          <MenuItemCheckbox id="checkbox-1" {...rootProps}>
            Toggle All
          </MenuItemCheckbox>
          {values.map((value, i) => (
            <MenuItemCheckbox
              id={`valued-checkbox-${i + 1}`}
              {...getProps(value)}
              key={value}
            >
              {LABELS[value]}
            </MenuItemCheckbox>
          ))}
        </>
      );
    }

    const { getByRole } = render(<Test />);

    const root = getByRole("menuitemcheckbox", {
      name: "Toggle All",
    }) as HTMLInputElement;
    const checkbox1 = getByRole("menuitemcheckbox", {
      name: "Label 1",
    }) as HTMLInputElement;
    const checkbox2 = getByRole("menuitemcheckbox", {
      name: "Label 2",
    }) as HTMLInputElement;
    const checkbox3 = getByRole("menuitemcheckbox", {
      name: "Label 3",
    }) as HTMLInputElement;
    const checkbox4 = getByRole("menuitemcheckbox", {
      name: "Label 4",
    }) as HTMLInputElement;

    expect(root).toHaveAttribute("aria-checked", "false");
    expect(checkbox1).toHaveAttribute("aria-checked", "false");
    expect(checkbox2).toHaveAttribute("aria-checked", "false");
    expect(checkbox3).toHaveAttribute("aria-checked", "false");
    expect(checkbox4).toHaveAttribute("aria-checked", "false");

    fireEvent.click(root);
    expect(root).toHaveAttribute("aria-checked", "true");
    expect(checkbox1).toHaveAttribute("aria-checked", "true");
    expect(checkbox2).toHaveAttribute("aria-checked", "true");
    expect(checkbox3).toHaveAttribute("aria-checked", "true");
    expect(checkbox4).toHaveAttribute("aria-checked", "true");

    fireEvent.click(checkbox1);
    expect(root).toHaveAttribute("aria-checked", "true");
    expect(checkbox1).toHaveAttribute("aria-checked", "false");
    expect(checkbox2).toHaveAttribute("aria-checked", "true");
    expect(checkbox3).toHaveAttribute("aria-checked", "true");
    expect(checkbox4).toHaveAttribute("aria-checked", "true");

    fireEvent.click(root);
    expect(root).toHaveAttribute("aria-checked", "true");
    expect(checkbox1).toHaveAttribute("aria-checked", "true");
    expect(checkbox2).toHaveAttribute("aria-checked", "true");
    expect(checkbox3).toHaveAttribute("aria-checked", "true");
    expect(checkbox4).toHaveAttribute("aria-checked", "true");

    fireEvent.click(root);
    expect(root).toHaveAttribute("aria-checked", "false");
    expect(checkbox1).toHaveAttribute("aria-checked", "false");
    expect(checkbox2).toHaveAttribute("aria-checked", "false");
    expect(checkbox3).toHaveAttribute("aria-checked", "false");
    expect(checkbox4).toHaveAttribute("aria-checked", "false");

    fireEvent.click(checkbox2);
    expect(root).toHaveAttribute("aria-checked", "true");
    expect(checkbox1).toHaveAttribute("aria-checked", "false");
    expect(checkbox2).toHaveAttribute("aria-checked", "true");
    expect(checkbox3).toHaveAttribute("aria-checked", "false");
    expect(checkbox4).toHaveAttribute("aria-checked", "false");
  });

  it("should allow for default values or another onChange handler", () => {
    const onChange = jest.fn();
    const defaultCheckedValues = ["b"] as const;
    function Test() {
      const { rootProps, getProps } = useIndeterminateChecked(
        values,
        defaultCheckedValues,
        onChange
      );
      return (
        <>
          <Checkbox id="checkbox-1" label="Toggle All" {...rootProps} />
          {values.map((value, i) => (
            <Checkbox
              id={`valued-checkbox-${i + 1}`}
              {...getProps(value)}
              key={value}
              label={LABELS[value]}
            />
          ))}
        </>
      );
    }
    const { getByRole } = render(<Test />);
    const root = getByRole("checkbox", {
      name: "Toggle All",
    }) as HTMLInputElement;
    const checkbox1 = getByRole("checkbox", {
      name: "Label 1",
    }) as HTMLInputElement;
    const checkbox2 = getByRole("checkbox", {
      name: "Label 2",
    }) as HTMLInputElement;
    const checkbox3 = getByRole("checkbox", {
      name: "Label 3",
    }) as HTMLInputElement;
    const checkbox4 = getByRole("checkbox", {
      name: "Label 4",
    }) as HTMLInputElement;

    expect(root.checked).toBe(true);
    expect(checkbox1.checked).toBe(false);
    expect(checkbox2.checked).toBe(true);
    expect(checkbox3.checked).toBe(false);
    expect(checkbox4.checked).toBe(false);

    fireEvent.click(checkbox1);
    expect(onChange).toBeCalledWith(["b", "a"]);

    expect(root.checked).toBe(true);
    expect(checkbox1.checked).toBe(true);
    expect(checkbox2.checked).toBe(true);
    expect(checkbox3.checked).toBe(false);
    expect(checkbox4.checked).toBe(false);
  });

  it("should allow for default values or another onChange handler with an options object", () => {
    const onChange = jest.fn();
    const defaultCheckedValues = ["b"] as const;
    function Test() {
      const { rootProps, getProps } = useIndeterminateChecked(values, {
        onChange,
        defaultCheckedValues,
      });

      return (
        <>
          <Checkbox id="checkbox-1" label="Toggle All" {...rootProps} />
          {values.map((value, i) => (
            <Checkbox
              id={`valued-checkbox-${i + 1}`}
              {...getProps(value)}
              key={value}
              label={LABELS[value]}
            />
          ))}
        </>
      );
    }
    const { getByRole } = render(<Test />);
    const root = getByRole("checkbox", {
      name: "Toggle All",
    }) as HTMLInputElement;
    const checkbox1 = getByRole("checkbox", {
      name: "Label 1",
    }) as HTMLInputElement;
    const checkbox2 = getByRole("checkbox", {
      name: "Label 2",
    }) as HTMLInputElement;
    const checkbox3 = getByRole("checkbox", {
      name: "Label 3",
    }) as HTMLInputElement;
    const checkbox4 = getByRole("checkbox", {
      name: "Label 4",
    }) as HTMLInputElement;

    expect(root.checked).toBe(true);
    expect(checkbox1.checked).toBe(false);
    expect(checkbox2.checked).toBe(true);
    expect(checkbox3.checked).toBe(false);
    expect(checkbox4.checked).toBe(false);

    fireEvent.click(checkbox1);
    expect(onChange).toBeCalledWith(["b", "a"]);

    expect(root.checked).toBe(true);
    expect(checkbox1.checked).toBe(true);
    expect(checkbox2.checked).toBe(true);
    expect(checkbox3.checked).toBe(false);
    expect(checkbox4.checked).toBe(false);
  });
});
