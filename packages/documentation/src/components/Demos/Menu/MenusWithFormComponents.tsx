import { ReactElement, useState } from "react";
import {
  MenuItemCheckbox,
  MenuItemFileInput,
  MenuItemRadio,
  MenuItemSwitch,
  MenuItemTextField,
  useIndeterminateChecked,
} from "@react-md/form";
import { SearchSVGIcon } from "@react-md/material-icons";
import { DropdownMenu, MenuItemGroup, MenuItemSeparator } from "@react-md/menu";
import { TextDecoration, Typography } from "@react-md/typography";

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

const getDecoration = (decoration: Decoration): TextDecoration | undefined => {
  if (decoration == "none") {
    return undefined;
  }

  return decoration === "strike-through" ? "line-through" : decoration;
};

export default function MenusWithFormComponents(): ReactElement {
  const [bold, setBold] = useState(false);
  const [italic, setItalic] = useState(false);
  const [decoration, setDecoration] = useState<Decoration>("none");
  const [checked, setChecked] = useState(false);
  const { rootProps, getProps } = useIndeterminateChecked(values, {
    menu: true,
  });
  return (
    <DropdownMenu
      id="dropdown-menu-with-form-components"
      buttonChildren="Dropdown"
    >
      <MenuItemTextField
        id="dropdown-menu-text-field"
        placeholder="Search..."
        rightChildren={<SearchSVGIcon />}
      />
      <MenuItemSeparator />
      <MenuItemCheckbox id="some-group-id-root" {...rootProps}>
        Toggle All
      </MenuItemCheckbox>
      {values.map((value, i) => (
        <MenuItemCheckbox
          id={`some-group-id-${i + 1}`}
          key={value}
          {...getProps(value)}
        >
          {labels[value]}
        </MenuItemCheckbox>
      ))}
      <MenuItemSeparator />
      <MenuItemCheckbox
        id="font-bold"
        checked={bold}
        onCheckedChange={(checked) => setBold(checked)}
      >
        Bold
      </MenuItemCheckbox>
      <MenuItemCheckbox
        id="font-italic"
        checked={italic}
        onCheckedChange={(checked) => setItalic(checked)}
      >
        Italic
      </MenuItemCheckbox>
      <MenuItemSeparator />
      {/* see https://www.w3.org/TR/wai-aria-1.1/#menuitemradio why this is */}
      {/* wrapped in a group */}
      <MenuItemGroup aria-label="Font Decoration">
        {decorations.map((dec) => (
          <MenuItemRadio
            key={dec}
            id={`decoration-${dec}`}
            checked={decoration === dec}
            onCheckedChange={() => setDecoration(dec)}
          >
            <Typography decoration={getDecoration(dec)} component="span">
              {dec}
            </Typography>
          </MenuItemRadio>
        ))}
      </MenuItemGroup>
      <MenuItemSeparator />
      <MenuItemSwitch
        id="toggle-thing"
        checked={checked}
        onCheckedChange={(checked) => setChecked(checked)}
      >
        Do Stuff?
      </MenuItemSwitch>
      <MenuItemSeparator />
      <MenuItemFileInput
        id="upload-file-menu-item"
        onChange={() => {
          // I didn't feel like implementing all the the file input behavior,
          // but you can check out the Simple File Upload example for usage with
          // the useFileUpload hook.
        }}
      >
        Upload
      </MenuItemFileInput>
    </DropdownMenu>
  );
}
