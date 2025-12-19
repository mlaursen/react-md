import { type ReactElement } from "react";

import { AdditionalChanges } from "./AdditionalChanges.js";
import { IconImportAndUsage } from "./IconImportAndUsage.js";
import { useMaterialIconsAndSymbols } from "./MaterialIconsAndSymbolsProvider.js";

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
