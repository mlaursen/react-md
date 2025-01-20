import { type ReactElement } from "react";

import { AdditionalChanges } from "./AdditionalChanges.jsx";
import { IconImportAndUsage } from "./IconImportAndUsage.jsx";
import { useMaterialIconsAndSymbols } from "./MaterialIconsAndSymbolsProvider.jsx";

export function MaterialSymbolUsage(): ReactElement {
  const { isFontFamilyChanged, isSymbolCustomizationChanged } =
    useMaterialIconsAndSymbols();
  return (
    <>
      <IconImportAndUsage />
      {(isSymbolCustomizationChanged || isFontFamilyChanged) && (
        <AdditionalChanges />
      )}
    </>
  );
}
