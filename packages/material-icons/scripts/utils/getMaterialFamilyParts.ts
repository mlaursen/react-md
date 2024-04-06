import { type MaterialIconFamily } from "@react-md/core/icon/material";
import { type MaterialIconType } from "./converters.js";

export interface MaterialFamilyParts {
  iconType: MaterialIconType;
  iconFamily: MaterialIconFamily;
}

export function getMaterialFamilyParts(family: string): MaterialFamilyParts {
  const [_material, iconType, ...names] = family.toLowerCase().split(" ");

  const name = names.join("-") || "filled";

  return {
    iconType: iconType === "icons" ? "icon" : "symbol",
    iconFamily: name === "round" ? "rounded" : (name as MaterialIconFamily),
  };
}
