"use client";
import {
  DropdownMenu,
  MenuItemRadio,
  Typography,
  useRadioGroup,
  type TextDecoration,
} from "react-md";
import { type ReactElement } from "react";

const decorations = [
  "none",
  "underline",
  "overline",
  "strike-through",
] as const;
type Decoration = (typeof decorations)[number];

const getDecoration = (decoration: Decoration): TextDecoration | undefined => {
  if (decoration == "none") {
    return undefined;
  }

  return decoration === "strike-through" ? "line-through" : decoration;
};

export default function MenuItemRadioExample(): ReactElement {
  const { getRadioProps } = useRadioGroup<Decoration>({
    menu: true,
    defaultValue: "none",
  });

  return (
    <DropdownMenu buttonChildren="Radio" themeType="outline">
      {decorations.map((decoration) => (
        <MenuItemRadio
          key={decoration}
          {...getRadioProps(decoration)}
          // preventMenuHideOnClick
        >
          <Typography textDecoration={getDecoration(decoration)} as="span">
            {decoration}
          </Typography>
        </MenuItemRadio>
      ))}
      <MenuItemRadio disabled checked={false} onCheckedChange={() => {}}>
        Disabled
      </MenuItemRadio>
    </DropdownMenu>
  );
}
