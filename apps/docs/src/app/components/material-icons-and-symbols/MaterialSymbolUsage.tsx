import { type ReactElement } from "react";
import { IconImportAndUsage } from "./IconImportAndUsage.jsx";
import { useMaterialIconsAndSymbols } from "./MaterialIconsAndSymbolsProvider.jsx";
import { AdditionalChanges } from "./AdditionalChanges.jsx";

export function MaterialSymbolUsage(): ReactElement {
  const {
    isSymbolCustomizationChanged,
    isFontFamilyChanged,
    selectedIconName,
  } = useMaterialIconsAndSymbols();
  return (
    <>
      <IconImportAndUsage />
      {(isSymbolCustomizationChanged || isFontFamilyChanged) &&
        selectedIconName && <AdditionalChanges icon={selectedIconName} />}
    </>
  );
}
