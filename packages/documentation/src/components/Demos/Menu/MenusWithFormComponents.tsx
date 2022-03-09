import type { ReactElement } from "react";
import { useState } from "react";
import {
  MenuItemCheckbox,
  MenuItemFileInput,
  MenuItemRadio,
  MenuItemSwitch,
  MenuItemTextField,
  Select,
  useIndeterminateChecked,
  useSelectState,
} from "@react-md/form";
import { SearchSVGIcon } from "@react-md/material-icons";
import type { RenderMenuAsSheet } from "@react-md/menu";
import {
  DropdownMenu,
  MenuConfigurationProvider,
  MenuItemGroup,
  MenuItemSeparator,
} from "@react-md/menu";
import type { TextDecoration } from "@react-md/typography";
import { Typography } from "@react-md/typography";

const values = ["a", "b", "c", "d"] as const;
const labels = {
  a: "Label 1",
  b: "Label 2",
  c: "Label 3",
  d: "Label 4",
} as const;

function CheckboxesDropdown(): ReactElement {
  const [bold, setBold] = useState(false);
  const [italic, setItalic] = useState(false);
  const { rootProps, getProps } = useIndeterminateChecked(values, {
    menu: true,
  });

  return (
    <DropdownMenu
      id="dropdown-menu-with-form-components-1"
      buttonChildren="Checkboxes"
      themeType="outline"
    >
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
    </DropdownMenu>
  );
}

type Decoration = "none" | "underline" | "overline" | "strike-through";

const decorations: readonly Decoration[] = [
  "none",
  "underline",
  "overline",
  "strike-through",
];

const getDecoration = (decoration: Decoration): TextDecoration | undefined => {
  if (decoration == "none") {
    return undefined;
  }

  return decoration === "strike-through" ? "line-through" : decoration;
};

function RadioAndSwitchDropdown(): ReactElement {
  const [decoration, setDecoration] = useState<Decoration>("none");
  const [checked, setChecked] = useState(false);

  return (
    <DropdownMenu
      id="dropdown-menu-with-form-components-2"
      buttonChildren="Switch/Radio"
      themeType="outline"
    >
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
    </DropdownMenu>
  );
}

function TextFieldAndFileInputDropdown(): ReactElement {
  return (
    <DropdownMenu
      id="dropdown-menu-with-form-components-3"
      buttonChildren="Inputs"
      themeType="outline"
    >
      <MenuItemTextField
        aria-label="Search"
        id="dropdown-menu-search-field"
        placeholder="Search..."
        rightChildren={<SearchSVGIcon />}
      />
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

const choices = ["phone", "true", "false"] as const;
type Choices = typeof choices[number];

export default function MenusWithFormComponents(): ReactElement {
  const [choice, handleChoiceChange] = useSelectState<Choices>("phone");
  let renderAsSheet: RenderMenuAsSheet;
  if (choice === "phone") {
    renderAsSheet = choice;
  } else {
    renderAsSheet = choice === "true";
  }
  return (
    <MenuConfigurationProvider renderAsSheet={renderAsSheet}>
      <Select
        id="menu-form-component-sheet"
        options={choices}
        value={choice}
        onChange={handleChoiceChange}
        label="renderAsSheet"
        style={{ marginBottom: "2rem" }}
      />
      <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
        <CheckboxesDropdown />
        <RadioAndSwitchDropdown />
        <TextFieldAndFileInputDropdown />
      </div>
    </MenuConfigurationProvider>
  );
}
