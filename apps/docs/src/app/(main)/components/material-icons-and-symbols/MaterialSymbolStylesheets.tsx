import { Typography } from "@react-md/core/typography/Typography";
import { type ReactElement } from "react";

import { CopyCode } from "./CopyCode.js";
import { useMaterialIconsAndSymbols } from "./MaterialIconsAndSymbolsProvider.js";
import { getFontStylesheet } from "./utils.js";

export function MaterialSymbolStylesheets(): ReactElement {
  const { iconFamily, fill, grade, weight, opticalSize } =
    useMaterialIconsAndSymbols();

  const variableHref = getFontStylesheet({
    iconType: "symbol",
    iconFamily,
  });
  const staticHref = getFontStylesheet({
    iconType: "symbol",
    iconFamily,
    fill,
    weight,
    grade,
    opticalSize,
  });

  return (
    <>
      <Typography type="headline-6" margin="none">
        Variable icon font
      </Typography>
      <Typography>
        Add the variable font stylesheet request to your head tag.
      </Typography>
      <CopyCode lang="html">
        {`<link rel="stylesheet" href="${variableHref}" />`}
      </CopyCode>
      <Typography type="headline-6" margin="top">
        Static icon font
      </Typography>
      <Typography>
        Alternatively, the current configuration can be loaded as a static font
        instead of a variable one.
      </Typography>
      <CopyCode lang="html">
        {`<link rel="stylesheet" href="${staticHref}" />`}
      </CopyCode>
    </>
  );
}
