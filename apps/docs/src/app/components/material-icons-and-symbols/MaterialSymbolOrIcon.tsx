import { MaterialIcon, MaterialSymbol } from "@react-md/core";
import { type ReactElement } from "react";
import { useMaterialIconsAndSymbols } from "./MaterialIconsAndSymbolsProvider.jsx";
import { type MaterialIconAndSymbolName } from "./metadata.js";
import { isMaterialSymbol } from "./utils.js";

export interface MaterialSymbolOrIconProps {
  iconName: MaterialIconAndSymbolName | null;
}

export function MaterialSymbolOrIcon(
  props: MaterialSymbolOrIconProps
): ReactElement | null {
  const { iconName } = props;
  const { iconType, fill, weight, grade, opticalSize } =
    useMaterialIconsAndSymbols();
  if (!iconName) {
    return null;
  }

  if (isMaterialSymbol(iconName, iconType)) {
    return (
      <MaterialSymbol
        name={iconName}
        fill={fill}
        weight={weight}
        grade={grade}
        opticalSize={opticalSize}
      />
    );
  }

  return <MaterialIcon name={iconName} />;
}
