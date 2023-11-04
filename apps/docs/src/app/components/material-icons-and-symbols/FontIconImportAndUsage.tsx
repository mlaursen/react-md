import { Typography } from "@react-md/core";
import { type ReactElement } from "react";
import { CopyCode } from "./CopyCode.jsx";
import { FontIconAdditionalChanges } from "./FontIconAdditionalChanges.jsx";
import { IconImportAndUsage } from "./IconImportAndUsage.jsx";
import { useMaterialIconsAndSymbols } from "./MaterialIconsAndSymbolsProvider.jsx";
import { TwoToneIconWarning } from "./TwoToneIconWarning.jsx";
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
      {iconFamily === "two-tone" && <TwoToneIconWarning />}
      <Typography type="headline-5" margin="top">
        Stylesheet
      </Typography>
      <Typography>Add the font stylesheet request to your head tag.</Typography>
      <CopyCode lang="html">
        {`<link rel="stylesheet" href="${href}" />`}
      </CopyCode>
      {isFontFamilyChanged && <FontIconAdditionalChanges />}
    </>
  );
}
