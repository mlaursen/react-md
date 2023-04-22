import type { ReactElement } from "react";

import { FormattedCodeBlock } from "src/components/Code/FormattedCodeBlock";

import { useMaterialIconsAndSymbols } from "../MaterialIconsAndSymbolsProvider";
import { AdditionalChanges } from "./AdditionalChanges";
import { getSymbolCode } from "./utils";

const IMPORT_CODE = 'import { MaterialSymbol } from "@react-md/core"';

export function Usage(): ReactElement {
  const {
    isFontFamilyChanged,
    isSymbolCustomizationChanged,
    selectedIconName,
  } = useMaterialIconsAndSymbols();
  return (
    <>
      <FormattedCodeBlock language="tsx" lineWrap>
        {IMPORT_CODE}
      </FormattedCodeBlock>
      <FormattedCodeBlock language="tsx" stripTrailingSemi lineWrap>
        {getSymbolCode(selectedIconName)}
      </FormattedCodeBlock>
      {(isSymbolCustomizationChanged || isFontFamilyChanged) && (
        <AdditionalChanges />
      )}
    </>
  );
}
