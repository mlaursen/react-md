import { cssUtils } from "@react-md/core/cssUtils";
import { type ProvidedExpansionPanelProps } from "@react-md/core/expansion-panel/useExpansionPanels";
import { Option } from "@react-md/core/form/Option";
import { Select } from "@react-md/core/form/Select";
import StyleOutlinedIcon from "@react-md/material-icons/StyleOutlinedIcon";
import { type ReactElement } from "react";
import { FilterPanel } from "./FilterPanel.jsx";
import { useMaterialIconsAndSymbols } from "./MaterialIconsAndSymbolsProvider.jsx";
import {
  MATERIAL_ICON_FAMILY_TYPES,
  MATERIAL_SYMBOL_FAMILY_TYPES,
} from "./metadata.js";
import { isMaterialIconType } from "./searchParams.js";

export function FilterStylePanel(
  props: ProvidedExpansionPanelProps
): ReactElement {
  const { iconType, iconFamily, setIconType, setIconFamily } =
    useMaterialIconsAndSymbols();

  const iconFamilies = isMaterialIconType(iconType)
    ? MATERIAL_ICON_FAMILY_TYPES
    : MATERIAL_SYMBOL_FAMILY_TYPES;

  return (
    <FilterPanel {...props} icon={<StyleOutlinedIcon />} name="Style">
      <Select
        label="Icon Type"
        value={iconType}
        stretch
        onChange={(event) => setIconType(event.currentTarget.value)}
      >
        <Option value="symbol">Material Symbols</Option>
        <Option value="icon">Material Icons (SVG)</Option>
        <Option value="icon-font">Material Icons (Font)</Option>
      </Select>
      <Select
        label="Icon Family"
        value={iconFamily}
        stretch
        onChange={(event) => setIconFamily(event.currentTarget.value)}
        className={cssUtils({ textTransform: "capitalize" })}
      >
        {iconFamilies.map((family) => (
          <Option
            key={family}
            value={family}
            className={cssUtils({ textTransform: "capitalize" })}
          >
            {family}
          </Option>
        ))}
      </Select>
    </FilterPanel>
  );
}
