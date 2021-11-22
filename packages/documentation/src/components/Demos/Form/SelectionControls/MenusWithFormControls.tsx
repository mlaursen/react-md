/* eslint-disable react/jsx-key */
import { DropdownMenu, MenuItem, MenuItemSeparator } from "@react-md/menu";
import {
  MenuItemCheckbox,
  MenuItemRadio,
  MenuItemSwitch,
  useIndeterminateChecked,
} from "@react-md/form";
import { ReactElement, useState } from "react";

type Decoration = "none" | "underline" | "overline" | "strike-through";

const decorations: readonly Decoration[] = [
  "none",
  "underline",
  "overline",
  "strike-through",
];

const values = ["a", "b", "c", "d"] as const;
const labels = {
  a: "Label 1",
  b: "Label 2",
  c: "Label 3",
  d: "Label 4",
} as const;

export default function MenusWithFormControls(): ReactElement | null {
  const [bold, setBold] = useState(false);
  const [italic, setItalic] = useState(false);
  const [decoration, setDecoration] = useState<Decoration>("none");
  const [checked, setChecked] = useState(false);
  const { rootProps, getProps } = useIndeterminateChecked(values, {
    menu: true,
  });

  return (
    <DropdownMenu
      id="some-id"
      items={[
        <MenuItem id="item-1">Item 1</MenuItem>,
        <MenuItemCheckbox id="some-group-id-root" {...rootProps}>
          Toggle All
        </MenuItemCheckbox>,
        ...values.map((value, i) => (
          <MenuItemCheckbox
            id={`some-group-id-${i + 1}`}
            {...getProps(value)}
            key={value}
          >
            {labels[value]}
          </MenuItemCheckbox>
        )),
        <MenuItemSeparator />,
        <MenuItemCheckbox
          id="font-bold"
          checked={bold}
          onCheckedChange={(checked) => setBold(checked)}
        >
          Bold
        </MenuItemCheckbox>,
        <MenuItemCheckbox
          id="font-italic"
          checked={italic}
          onCheckedChange={(checked) => setItalic(checked)}
        >
          Italic
        </MenuItemCheckbox>,
        <MenuItemSeparator />,
        // see https://www.w3.org/TR/wai-aria-1.1/#menuitemradio why this is
        // wrapped in a group
        <div role="group" aria-label="Font Decoration">
          {decorations.map((dec) => (
            <MenuItemRadio
              key={dec}
              id={`decoration-${dec}`}
              checked={decoration === dec}
              onCheckedChange={() => setDecoration(dec)}
            >
              {dec}
            </MenuItemRadio>
          ))}
        </div>,
        <MenuItemSwitch
          id="toggle-thing"
          checked={checked}
          onCheckedChange={(checked) => setChecked(checked)}
        >
          Do Stuff?
        </MenuItemSwitch>,
      ]}
    >
      Menu
    </DropdownMenu>
  );
}
