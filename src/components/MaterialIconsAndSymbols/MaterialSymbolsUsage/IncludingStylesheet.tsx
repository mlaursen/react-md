import { Typography } from "@react-md/core";
import type { ReactElement } from "react";
import { FormattedCodeBlock } from "src/components/Code/FormattedCodeBlock";
import { useMaterialIconsAndSymbols } from "../MaterialIconsAndSymbolsProvider";
import { getFontStylesheet } from "../useMaterialFontLoader";

export function IncludingStylesheet(): ReactElement {
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
      <FormattedCodeBlock language="html" lineWrap>
        {`<link rel="stylesheet" href="${variableHref}" />`}
      </FormattedCodeBlock>
      <Typography type="headline-6" margin="top">
        Static icon font
      </Typography>
      <Typography>
        Alternatively, the current configuration can be loaded as a static font
        instead of a variable one.
      </Typography>
      <FormattedCodeBlock language="html" lineWrap>
        {`<link rel="stylesheet" href="${staticHref}" />`}
      </FormattedCodeBlock>
    </>
  );
}
