import { describe, expect, it } from "@jest/globals";
import type { ReactElement } from "react";
import { fireEvent, render } from "../../test-utils/index.js";

import { Button } from "../../button/Button.js";
import { AppSizeProvider } from "../../media-queries/AppSizeProvider.js";
import { DropdownMenu } from "../../menu/DropdownMenu.js";
import { Checkbox } from "../Checkbox.js";
import { Form } from "../Form.js";
import { MenuItemCheckbox } from "../MenuItemCheckbox.js";
import { useCheckboxGroup } from "../useCheckboxGroup.js";

describe("useCheckboxGroup", () => {
  it("should not behave as an indeterminate checkbox group and check any checkboxes by default", () => {
    function Test(): ReactElement {
      const checkboGroup = useCheckboxGroup({ name: "example" });
      const { getCheckboxProps } = checkboGroup;

      // @ts-expect-error
      checkboGroup.getIndeterminateProps;

      return (
        <Form>
          <Checkbox label="First" {...getCheckboxProps("a")} />
          <Checkbox label="Second" {...getCheckboxProps("b")} />
          <Checkbox label="Third" {...getCheckboxProps("c")} />
        </Form>
      );
    }

    const { getByRole, container } = render(<Test />);

    const checkbox1 = getByRole("checkbox", { name: "First" });
    const checkbox2 = getByRole("checkbox", { name: "Second" });
    const checkbox3 = getByRole("checkbox", { name: "Third" });

    expect(checkbox1).toHaveAttribute("name", "example");
    expect(checkbox2).toHaveAttribute("name", "example");
    expect(checkbox3).toHaveAttribute("name", "example");
    expect(checkbox1).not.toBeChecked();
    expect(checkbox2).not.toBeChecked();
    expect(checkbox3).not.toBeChecked();
    expect(container).toMatchSnapshot();

    fireEvent.click(checkbox1);
    expect(checkbox1).toBeChecked();
    expect(checkbox2).not.toBeChecked();
    expect(checkbox3).not.toBeChecked();

    fireEvent.click(checkbox2);
    expect(checkbox1).toBeChecked();
    expect(checkbox2).toBeChecked();
    expect(checkbox3).not.toBeChecked();

    fireEvent.click(checkbox3);
    expect(checkbox1).toBeChecked();
    expect(checkbox2).toBeChecked();
    expect(checkbox3).toBeChecked();

    fireEvent.click(checkbox2);
    expect(checkbox1).toBeChecked();
    expect(checkbox2).not.toBeChecked();
    expect(checkbox3).toBeChecked();
  });

  it("should allow for a list of default checked values", () => {
    function Test({
      defaultCheckedValues,
    }: {
      defaultCheckedValues: string[];
    }): ReactElement {
      const { getCheckboxProps } = useCheckboxGroup({
        name: "example",
        defaultCheckedValues,
      });
      return (
        <Form>
          <Checkbox label="First" {...getCheckboxProps("a")} />
          <Checkbox label="Second" {...getCheckboxProps("b")} />
          <Checkbox label="Third" {...getCheckboxProps("c")} />
        </Form>
      );
    }
    const { getByRole } = render(<Test defaultCheckedValues={["b", "c"]} />);

    const checkbox1 = getByRole("checkbox", { name: "First" });
    const checkbox2 = getByRole("checkbox", { name: "Second" });
    const checkbox3 = getByRole("checkbox", { name: "Third" });

    expect(checkbox1).not.toBeChecked();
    expect(checkbox2).toBeChecked();
    expect(checkbox3).toBeChecked();
  });

  it("should return a reset function that returns to the initial value", () => {
    function Test({
      defaultCheckedValues,
    }: {
      defaultCheckedValues: () => string[];
    }): ReactElement {
      const { getCheckboxProps, reset } = useCheckboxGroup({
        name: "example",
        defaultCheckedValues,
      });

      return (
        <Form onReset={reset}>
          <Checkbox label="First" {...getCheckboxProps("a")} />
          <Checkbox label="Second" {...getCheckboxProps("b")} />
          <Checkbox label="Third" {...getCheckboxProps("c")} />
          <Button type="reset">Reset</Button>
        </Form>
      );
    }
    const { getByRole } = render(
      <Test defaultCheckedValues={() => ["a", "c"]} />
    );

    const checkbox1 = getByRole("checkbox", { name: "First" });
    const checkbox2 = getByRole("checkbox", { name: "Second" });
    const checkbox3 = getByRole("checkbox", { name: "Third" });
    expect(checkbox1).toBeChecked();
    expect(checkbox2).not.toBeChecked();
    expect(checkbox3).toBeChecked();

    fireEvent.click(checkbox1);
    fireEvent.click(checkbox2);
    fireEvent.click(checkbox3);
    expect(checkbox1).not.toBeChecked();
    expect(checkbox2).toBeChecked();
    expect(checkbox3).not.toBeChecked();

    fireEvent.click(getByRole("button", { name: "Reset" }));
    expect(checkbox1).toBeChecked();
    expect(checkbox2).not.toBeChecked();
    expect(checkbox3).toBeChecked();
  });

  it("should support an indeterminate checkbox group", () => {
    const values = ["a", "b", "c"] as const;

    function Test(): ReactElement {
      const checkboGroup = useCheckboxGroup({ name: "example", values });
      const { getCheckboxProps, getIndeterminateProps } = checkboGroup;

      // some additional type-only tests since `values` was defined as a const
      // of valid choices
      // @ts-expect-error
      getCheckboxProps("d");
      // @ts-expect-error
      getCheckboxProps("A");
      // @ts-expect-error
      getCheckboxProps(3);

      return (
        <Form>
          <Checkbox label="Indeterminate" {...getIndeterminateProps()} />
          {values.map((value) => (
            <Checkbox
              key={value}
              label={value.toUpperCase()}
              {...getCheckboxProps(value)}
            />
          ))}
        </Form>
      );
    }

    const { getByRole, container } = render(<Test />);

    const indeterminate = getByRole("checkbox", { name: "Indeterminate" });
    const checkbox1 = getByRole("checkbox", { name: "A" });
    const checkbox2 = getByRole("checkbox", { name: "B" });
    const checkbox3 = getByRole("checkbox", { name: "C" });

    expect(indeterminate).not.toHaveAttribute("aria-checked");
    expect(indeterminate).not.toBeChecked();
    expect(checkbox1).not.toBeChecked();
    expect(checkbox2).not.toBeChecked();
    expect(checkbox3).not.toBeChecked();
    expect(container).toMatchSnapshot();

    fireEvent.click(indeterminate);
    expect(indeterminate).not.toHaveAttribute("aria-checked");
    expect(indeterminate).toBeChecked();
    expect(checkbox1).toBeChecked();
    expect(checkbox2).toBeChecked();
    expect(checkbox3).toBeChecked();
    expect(container).toMatchSnapshot();

    fireEvent.click(checkbox3);
    expect(indeterminate).toHaveAttribute("aria-checked");
    expect(indeterminate).toBeChecked();
    expect(checkbox1).toBeChecked();
    expect(checkbox2).toBeChecked();
    expect(checkbox3).not.toBeChecked();
    expect(container).toMatchSnapshot();

    fireEvent.click(checkbox1);
    fireEvent.click(checkbox2);
    expect(indeterminate).not.toHaveAttribute("aria-checked");
    expect(indeterminate).not.toBeChecked();
    expect(checkbox1).not.toBeChecked();
    expect(checkbox2).not.toBeChecked();
    expect(checkbox3).not.toBeChecked();

    fireEvent.click(checkbox1);
    expect(indeterminate).toHaveAttribute("aria-checked");
    expect(indeterminate).toBeChecked();
    expect(checkbox1).toBeChecked();
    expect(checkbox2).not.toBeChecked();
    expect(checkbox3).not.toBeChecked();

    // indeterminate **always** selects all first
    fireEvent.click(indeterminate);
    expect(indeterminate).not.toHaveAttribute("aria-checked");
    expect(indeterminate).toBeChecked();
    expect(checkbox1).toBeChecked();
    expect(checkbox2).toBeChecked();
    expect(checkbox3).toBeChecked();

    fireEvent.click(indeterminate);
    expect(indeterminate).not.toHaveAttribute("aria-checked");
    expect(indeterminate).not.toBeChecked();
    expect(checkbox1).not.toBeChecked();
    expect(checkbox2).not.toBeChecked();
    expect(checkbox3).not.toBeChecked();
  });

  it("should support rendering a group of MenuItemCheckbox by enabling the `menu` option", () => {
    const values = ["1", "3", "five"];
    function Test(): ReactElement {
      useCheckboxGroup({
        menu: true,
        // @ts-expect-error
        name: "should-error",
      });

      const { getCheckboxProps, getIndeterminateProps } = useCheckboxGroup({
        menu: true,
        values,
      });

      // these should be allowed since values is not defined `as const` or a
      // strict list of strings
      getCheckboxProps("any-value");

      return (
        <DropdownMenu buttonChildren="Toggle">
          <MenuItemCheckbox {...getIndeterminateProps()}>
            Indeterminate
          </MenuItemCheckbox>
          {values.map((value) => (
            <MenuItemCheckbox key={value} {...getCheckboxProps(value)}>
              {value.toUpperCase()}
            </MenuItemCheckbox>
          ))}
        </DropdownMenu>
      );
    }

    const { getByRole } = render(<Test />, { wrapper: AppSizeProvider });

    fireEvent.click(getByRole("button", { name: "Toggle" }));
    expect(getByRole("menu")).toMatchSnapshot();

    const indeterminate = getByRole("menuitemcheckbox", {
      name: "Indeterminate",
    });
    const checkbox1 = getByRole("menuitemcheckbox", { name: "1" });
    const checkbox2 = getByRole("menuitemcheckbox", { name: "3" });
    const checkbox3 = getByRole("menuitemcheckbox", { name: "FIVE" });

    expect(indeterminate).toHaveAttribute("aria-checked", "false");
    expect(checkbox1).not.toBeChecked();
    expect(checkbox2).not.toBeChecked();
    expect(checkbox3).not.toBeChecked();

    fireEvent.click(checkbox1);
    expect(indeterminate).toHaveAttribute("aria-checked", "mixed");
    expect(checkbox1).toBeChecked();
    expect(checkbox2).not.toBeChecked();
    expect(checkbox3).not.toBeChecked();

    fireEvent.click(checkbox2);
    fireEvent.click(checkbox3);
    expect(indeterminate).toHaveAttribute("aria-checked", "true");
    expect(checkbox1).toBeChecked();
    expect(checkbox2).toBeChecked();
    expect(checkbox3).toBeChecked();
  });
});
