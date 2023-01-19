import type { TextDecoration } from "@react-md/core";
import { DropdownMenu, Typography } from "@react-md/core";
import { MenuItemRadio, useRadioGroup } from "@react-md/form";
import type { ReactElement } from "react";

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

export function RadioMenuItemExample(): ReactElement {
  const { getRadioProps } = useRadioGroup({
    menu: true,
  });

  return (
    <DropdownMenu buttonChildren="Radio" themeType="outline">
      {decorations.map((decoration) => (
        <MenuItemRadio key={decoration} {...getRadioProps(decoration)}>
          <Typography decoration={getDecoration(decoration)} as="span">
            {decoration}
          </Typography>
        </MenuItemRadio>
      ))}
    </DropdownMenu>
  );
}
