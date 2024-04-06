"use client";
import {
  DropdownMenu,
  MenuItemCheckbox,
  MenuItemSeparator,
  useCheckboxGroup,
} from "react-md";
import { useState, type ReactElement } from "react";

const values = ["a", "b", "c", "d"] as const;
const labels = {
  a: "Label 1",
  b: "Label 2",
  c: "Label 3",
  d: "Label 4",
} as const;

export default function MenuItemCheckboxExample(): ReactElement {
  const [bold, setBold] = useState(false);
  const [italic, setItalic] = useState(false);
  const { getCheckboxProps, getIndeterminateProps } = useCheckboxGroup({
    values,
    menu: true,
  });

  return (
    <DropdownMenu buttonChildren="Checkboxes" themeType="outline">
      <MenuItemCheckbox {...getIndeterminateProps()} preventMenuHideOnClick>
        Toggle All
      </MenuItemCheckbox>
      {values.map((value) => (
        <MenuItemCheckbox
          key={value}
          {...getCheckboxProps(value)}
          preventMenuHideOnClick
        >
          {labels[value]}
        </MenuItemCheckbox>
      ))}
      <MenuItemSeparator />
      <MenuItemCheckbox disabled checked={false} onCheckedChange={() => {}}>
        Disabled
      </MenuItemCheckbox>
      <MenuItemCheckbox
        checked={bold}
        onCheckedChange={(checked) => setBold(checked)}
      >
        Bold
      </MenuItemCheckbox>
      <MenuItemCheckbox
        checked={italic}
        onCheckedChange={(checked) => setItalic(checked)}
      >
        Italic
      </MenuItemCheckbox>
    </DropdownMenu>
  );
}
