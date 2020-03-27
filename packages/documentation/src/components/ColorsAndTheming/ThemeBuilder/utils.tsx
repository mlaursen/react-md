import React, { ReactNode } from "react";
import { ListboxOption } from "@react-md/form";

import {
  accents,
  ColorAccent,
  DEFAULT_ACCENT,
  DEFAULT_PRIMARY,
  DEFAULT_SECONDARY,
  PrimaryColor,
  SecondaryColor,
} from "components/Theme";

import CustomLabel from "./CustomLabel";

interface ColorOption {
  name: PrimaryColor | SecondaryColor;
  label: ReactNode;
  disabled: boolean;
  [labelKey: string]: ReactNode;
}

interface AccentOption {
  name: ColorAccent;
  label: ReactNode;
  [labelKey: string]: ReactNode;
}

export function getOptions(
  colors: (PrimaryColor | SecondaryColor)[],
  invalid: PrimaryColor | SecondaryColor,
  isPrimary: boolean
): ColorOption[] {
  return colors.map(color => ({
    name: color,
    label: (
      <CustomLabel
        isDefault={color === (isPrimary ? DEFAULT_PRIMARY : DEFAULT_SECONDARY)}
      >
        {color}
      </CustomLabel>
    ),
    disabled: color === invalid,
  }));
}

export function getAccents(secondary: SecondaryColor): AccentOption[] {
  return accents.map(accent => ({
    name: accent,
    label: (
      <CustomLabel
        isDefault={accent === DEFAULT_ACCENT && secondary === DEFAULT_SECONDARY}
      >
        {accent}
      </CustomLabel>
    ),
  }));
}

export function getOptionLabel(option: ListboxOption): ReactNode {
  return (option as ColorOption).label;
}
