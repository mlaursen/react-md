import type {
  MaterialIconFamily,
  MaterialSymbolConfiguration,
} from "@react-md/core";
import { upperFirst } from "lodash";
import { useEffect } from "react";
import type { MaterialIconType } from "./metadata";

type DefinedSpecs = Omit<MaterialSymbolConfiguration, "family">;

interface FontStylesheetOptions {
  iconType: MaterialIconType;
  iconFamily: MaterialIconFamily;
}

export function getFontStylesheet(options: FontStylesheetOptions): string;
export function getFontStylesheet(
  options: FontStylesheetOptions & DefinedSpecs
): string;
export function getFontStylesheet(
  options: FontStylesheetOptions & Partial<DefinedSpecs>
): string {
  const {
    iconType,
    iconFamily,
    opticalSize = "20..48",
    weight = "100..700",
    fill = "0..1",
    grade = "-50..200",
  } = options;

  let specs = "";
  let familyName = iconFamily
    .split("-")
    .map((part) => upperFirst(part))
    .join("+");

  if (iconType === "icon") {
    familyName =
      familyName === "Rounded"
        ? "Round"
        : familyName === "Filled"
        ? ""
        : familyName;
  } else {
    specs = `:opsz,wght,FILL,GRAD@${opticalSize},${weight},${fill},${grade}`;
  }

  const suffix = `${upperFirst(iconType)}s${
    familyName ? `+${familyName}` : ""
  }${specs}`;

  return `https://fonts.googleapis.com/css2?family=Material+${suffix}`;
}

export function useMaterialFontLoader(
  iconFamily: MaterialIconFamily,
  iconType: MaterialIconType
): void {
  useEffect(() => {
    const id = `material-icon-font-${iconType}-${iconFamily}`;
    // dynamically load the fonts, but don't remove them so the stylesheets
    // don't need to be re-downloaded when swapping or returning to this page
    if (document.getElementById(id)) {
      return;
    }

    const link = document.createElement("link");
    link.id = id;
    link.href = getFontStylesheet({ iconType, iconFamily });
    link.rel = "stylesheet";

    // prepend so rmd styles override material-icons/material-symbols
    document.head.prepend(link);
  }, [iconFamily, iconType]);
}
