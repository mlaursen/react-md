import { getMaterialSymbolsUrl } from "@react-md/core/icon/getMaterialSymbolsUrl";
import {
  type MaterialIconFamily,
  type MaterialSymbolFamily,
} from "@react-md/core/icon/material";
import { Typography } from "@react-md/core/typography/Typography";
import { type ReactElement } from "react";

import { CopyCode } from "./CopyCode.js";
import { useMaterialIconsAndSymbols } from "./MaterialIconsAndSymbolsProvider.js";

function assertSymbol(
  iconFamily: MaterialIconFamily
): asserts iconFamily is MaterialSymbolFamily {
  if (iconFamily === "filled" || iconFamily === "two-tone") {
    throw new Error("Invalid MaterialSymbol family");
  }
}

export function MaterialSymbolStylesheets(): ReactElement {
  const { iconFamily, fill, grade, weight, opticalSize } =
    useMaterialIconsAndSymbols();

  assertSymbol(iconFamily);
  const variableHref = getMaterialSymbolsUrl({
    names: [],
    family: iconFamily,
    fill: { min: 0, max: 1 },
    grade: { min: -25, max: 200 },
    opticalSize: { min: 20, max: 48 },
    weight: { min: 100, max: 700 },
  });
  const staticHref = getMaterialSymbolsUrl({
    names: [],
    family: iconFamily,
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
