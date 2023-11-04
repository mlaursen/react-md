import {
  Chip,
  cssUtils,
  useAppSize,
  type ProvidedExpansionPanelProps,
} from "@react-md/core";
import CategoryOutlinedIcon from "@react-md/material-icons/CategoryOutlinedIcon";
import { type ReactElement } from "react";
import { FilterPanel } from "./FilterPanel.jsx";
import { useMaterialIconsAndSymbols } from "./MaterialIconsAndSymbolsProvider.jsx";
import {
  MATERIAL_ICON_CATEGORIES,
  MATERIAL_SYMBOL_CATEGORIES,
} from "./metadata.js";

export function FilterCategoryPanel(
  props: ProvidedExpansionPanelProps
): ReactElement {
  const { isDesktop } = useAppSize();
  const { iconType, iconCategory, setIconCategory } =
    useMaterialIconsAndSymbols();
  const iconCategories =
    iconType === "icon" ? MATERIAL_ICON_CATEGORIES : MATERIAL_SYMBOL_CATEGORIES;

  return (
    <FilterPanel
      {...props}
      icon={<CategoryOutlinedIcon />}
      name="Category"
      inline
    >
      {iconCategories.map((category) => (
        <Chip
          key={category}
          theme={isDesktop ? "solid" : "outline"}
          className={cssUtils({ textTransform: "capitalize" })}
          selected={iconCategory === category}
          onClick={(event) => {
            const sheet = event.currentTarget.offsetParent;
            if (sheet instanceof HTMLElement) {
              sheet.scrollTop = sheet.offsetHeight;
            }
            setIconCategory(iconCategory === category ? "" : category);
          }}
        >
          {category}
        </Chip>
      ))}
    </FilterPanel>
  );
}
