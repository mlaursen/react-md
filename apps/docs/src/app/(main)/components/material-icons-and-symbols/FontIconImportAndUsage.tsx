import { Typography } from "@react-md/core/typography/Typography";
import { type ReactElement } from "react";

import { AdditionalChanges } from "./AdditionalChanges.js";
import { CopyCode } from "./CopyCode.js";
import { IconImportAndUsage } from "./IconImportAndUsage.js";
import { useMaterialIconsAndSymbols } from "./MaterialIconsAndSymbolsProvider.js";
import { TwoToneIconWarning } from "./TwoToneIconWarning.js";
import { getFontStylesheet } from "./utils.js";

export function FontIconImportAndUsage(): ReactElement {
  const { iconFamily, isFontFamilyChanged } = useMaterialIconsAndSymbols();
  const href = getFontStylesheet({
    iconType: "icon",
    iconFamily,
  });
  return (
    <>
      <IconImportAndUsage />
      {isFontFamilyChanged && <AdditionalChanges />}
      {iconFamily === "two-tone" && <TwoToneIconWarning />}
      <Typography type="headline-5" margin="top">
        Stylesheet
      </Typography>
      <Typography>Add the font stylesheet request to your head tag.</Typography>
      <CopyCode lang="html">
        {`<link rel="stylesheet" href="${href}" />`}
      </CopyCode>
    </>
  );
}
