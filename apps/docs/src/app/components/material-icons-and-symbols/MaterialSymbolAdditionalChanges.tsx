import { InlineCode } from "@/components/InlineCode.jsx";
import { Typography } from "@react-md/core";
import type { ReactElement } from "react";
import { CopyCode } from "./CopyCode.jsx";
import { useMaterialIconsAndSymbols } from "./MaterialIconsAndSymbolsProvider.jsx";
import {
  getEverythingScss,
  getPartialSettingsSCSS,
  getProviderCode,
  getSymbolCode,
  getSymbolProps,
} from "./utils.js";

export function MaterialSymbolAdditionalChanges(): ReactElement | null {
  const context = useMaterialIconsAndSymbols();
  const { selectedIconName, isSymbolCustomizationChanged: isSCSSChange } =
    context;
  if (!selectedIconName) {
    return null;
  }

  const symbolProps = getSymbolProps(context);

  return (
    <>
      <Typography type="headline-5" margin="top">
        Additional Changes
      </Typography>
      <Typography>
        This customization does not match the <InlineCode>react-md</InlineCode>{" "}
        defaults and will require additional changes to work.
      </Typography>
      <Typography type="headline-5" margin="top">
        Global Settings
      </Typography>
      <Typography>
        If this customization should apply to your entire app, update the
        {isSCSSChange ? " sass configuration and " : " "}
        <InlineCode>MaterialSymbolsProvider</InlineCode> as follows:
      </Typography>
      {isSCSSChange && (
        <CopyCode lang="scss">{getEverythingScss(context)}</CopyCode>
      )}
      <CopyCode lang="tsx">
        {getProviderCode({
          type: "global",
          symbolProps,
        })}
      </CopyCode>
      <Typography type="headline-5" margin="top">
        Partial Settings
      </Typography>
      <Typography>
        If this customization should apply to only a section of your app, update
        the {isSCSSChange ? " sass configuration and " : " "}
        <InlineCode>MaterialSymbolsProvider</InlineCode> as follows:
      </Typography>
      {isSCSSChange && (
        <CopyCode lang="scss">{getPartialSettingsSCSS(context)}</CopyCode>
      )}
      <CopyCode lang="tsx">
        {getProviderCode({
          type: isSCSSChange ? "partial-styled" : "partial",
          symbolProps,
        })}
      </CopyCode>
      <Typography type="headline-5" margin="top">
        Single Icon Settings
      </Typography>
      <Typography>
        If this customization should apply to only a single icon, you can
        override the settings with inline styles by passing the configuration as
        props.
      </Typography>
      <CopyCode>{getSymbolCode(selectedIconName, symbolProps)}</CopyCode>
    </>
  );
}
