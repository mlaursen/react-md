import type { MaterialIconFamily, MaterialSymbolFamily } from "@react-md/core";
import { upperFirst } from "lodash";
import { useEffect } from "react";
import type { MaterialIconType } from "./metadata";

export function useMaterialFontLoader(
  iconFamily: MaterialIconFamily | MaterialSymbolFamily,
  iconType: MaterialIconType
): void {
  useEffect(() => {
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
      specs = ":opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200";
    }

    const suffix = `${upperFirst(iconType)}s${
      familyName ? `+${familyName}` : ""
    }${specs}`;

    const href = `https://fonts.googleapis.com/css2?family=Material+${suffix}`;

    const link = document.createElement("link");
    link.id = `material-icon-font-${iconType}-${iconFamily}`;
    link.href = href;
    link.rel = "stylesheet";

    // prepend so rmd styles override material-icons/material-symbols
    document.head.prepend(link);
    return () => {
      document.head.removeChild(link);
    };
  }, [iconFamily, iconType]);
}
