import { type ReactElement } from "react";
import { CopyCode } from "./CopyCode.jsx";
import { useMaterialIconsAndSymbols } from "./MaterialIconsAndSymbolsProvider.jsx";
import { getMaterialIconComponentName } from "./utils.js";

export function IconImportAndUsage(): ReactElement | null {
  const { iconFamily, selectedIconName, iconType } =
    useMaterialIconsAndSymbols();
  if (!selectedIconName) {
    return null;
  }

  const importCode = `import { Material${
    iconType === "symbol" ? "Symbol" : "Icon"
  } } from "@react-md/core"`;
  const usageCode = `<${getMaterialIconComponentName({
    iconName: selectedIconName,
    iconFamily,
  })} name="${selectedIconName}" />`;

  return (
    <>
      <CopyCode>{importCode}</CopyCode>
      <CopyCode>{usageCode}</CopyCode>
    </>
  );
}
