import { type ReactElement } from "react";
import { IconImportAndUsage } from "./IconImportAndUsage.jsx";
import { useMaterialIconsAndSymbols } from "./MaterialIconsAndSymbolsProvider.jsx";
import { MaterialSymbolAdditionalChanges } from "./MaterialSymbolAdditionalChanges.jsx";

export function MaterialSymbolUsage(): ReactElement {
  const { isSymbolCustomizationChanged, isFontFamilyChanged } =
    useMaterialIconsAndSymbols();
  return (
    <>
      <IconImportAndUsage />
      {(isSymbolCustomizationChanged || isFontFamilyChanged) && (
        <MaterialSymbolAdditionalChanges />
      )}
    </>
  );
}
