import { type ReactElement } from "react";

import { FrameworkCodeSwap } from "../FrameworkCodeSwap.jsx";

const DEFAULT_CODE = `
import { describe, expect, it } from "{FRAMEWORK}";
import { useCheckboxGroup } from "@react-md/core/form/useCheckboxGroup";
import { DropdownMenu } from "@react-md/core/menu/DropdownMenu";
import { MenuItemCheckbox } from "@react-md/core/menu/MenuItemCheckbox";
import { rmdRender, screen, userEvent } from "@react-md/core/test-utils";

const values = ["a", "b", "c", "d"];
const labels = {
  a: "Label 1",
  b: "Label 2",
  c: "Label 3",
  d: "Label 4",
};

function Test() {
  const { getCheckboxProps, getIndeterminateProps } = useCheckboxGroup({
    menu: true,
    values,
  });

  return (
    <DropdownMenu buttonChildren="Checkboxes">
      <MenuItemCheckbox {...getIndeterminateProps()}>
        Toggle All
      </MenuItemCheckbox>
      {values.map((value) => (
        <MenuItemCheckbox key={value} {...getCheckboxProps(value)}>
          {labels[value]}
        </MenuItemCheckbox>
      ))}
    </DropdownMenu>
  );
}

describe("Test", () => {
  it("should be able to change the checked state", async () => {
    const user = userEvent.setup();
    rmdRender(<Test />);

    const toggle = screen.getByRole("button", { name: "Checkboxes" });

    await user.click(toggle);
    let toggleAll = screen.getByRole("menuitemcheckbox", {
      name: "Toggle All",
    });
    let label1 = screen.getByRole("menuitemcheckbox", {
      name: "Label 1",
    });
    let label2 = screen.getByRole("menuitemcheckbox", {
      name: "Label 2",
    });
    let label3 = screen.getByRole("menuitemcheckbox", {
      name: "Label 3",
    });
    let label4 = screen.getByRole("menuitemcheckbox", {
      name: "Label 4",
    });

    expect(toggleAll).not.toBeChecked();
    expect(label1).not.toBeChecked();
    expect(label2).not.toBeChecked();
    expect(label3).not.toBeChecked();
    expect(label4).not.toBeChecked();

    await user.click(label1);
    // the menu closed
    expect(toggleAll).not.toBeInTheDocument();
    expect(label1).not.toBeInTheDocument();
    expect(label2).not.toBeInTheDocument();
    expect(label3).not.toBeInTheDocument();
    expect(label4).not.toBeInTheDocument();

    await user.click(toggle);
    // can also use \`getAllByRole\` since the order is known
    [toggleAll, label1, label2, label3, label4] =
      screen.getAllByRole("menuitemcheckbox");

    expect(toggleAll).not.toBeChecked();
    expect(toggleAll).toHaveAttribute("aria-checked", "mixed");
    expect(label1).toBeChecked();
    expect(label2).not.toBeChecked();
    expect(label3).not.toBeChecked();
    expect(label4).not.toBeChecked();
  });
});
`;

export default function MenuOpenAndClickAMenuItem(): ReactElement {
  return (
    <FrameworkCodeSwap
      code={DEFAULT_CODE}
      lang="tsx"
      replacement={{ jest: "@jest/globals" }}
    />
  );
}
