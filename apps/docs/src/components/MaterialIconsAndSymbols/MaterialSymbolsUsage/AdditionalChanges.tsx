import { Typography } from "@react-md/core";
import type { ReactElement } from "react";
import { FormattedCodeBlock } from "src/components/Code/FormattedCodeBlock";
import { InlineCode } from "src/components/Code/InlineCode";
import { useMaterialIconsAndSymbols } from "../MaterialIconsAndSymbolsProvider";
import {
  getEverythingScss,
  getPartialSettingsSCSS,
  getProviderCode,
  getSymbolCode,
  getSymbolProps,
} from "./utils";

export function AdditionalChanges(): ReactElement {
  const context = useMaterialIconsAndSymbols();
  const { selectedIconName, isSymbolCustomizationChanged: isSCSSChange } =
    context;

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
        <FormattedCodeBlock language="scss" lineWrap>
          {getEverythingScss(context)}
        </FormattedCodeBlock>
      )}
      <FormattedCodeBlock language="tsx" lineWrap>
        {getProviderCode({
          type: "global",
          symbolProps,
        })}
      </FormattedCodeBlock>
      <Typography type="headline-5" margin="top">
        Partial Settings
      </Typography>
      <Typography>
        If this customization should apply to only a section of your app, update
        the {isSCSSChange ? " sass configuration and " : " "}
        <InlineCode>MaterialSymbolsProvider</InlineCode> as follows:
      </Typography>
      {isSCSSChange && (
        <FormattedCodeBlock language="scss" lineWrap>
          {getPartialSettingsSCSS(context)}
        </FormattedCodeBlock>
      )}
      <FormattedCodeBlock language="tsx" lineWrap>
        {getProviderCode({
          type: isSCSSChange ? "partial-styled" : "partial",
          symbolProps,
        })}
      </FormattedCodeBlock>
      <Typography type="headline-5" margin="top">
        Single Icon Settings
      </Typography>
      <Typography>
        If this customization should apply to only a single icon, you can
        override the settings with inline styles by passing the configuration as
        props.
      </Typography>
      <FormattedCodeBlock language="tsx" lineWrap stripTrailingSemi>
        {getSymbolCode(selectedIconName, symbolProps)}
      </FormattedCodeBlock>
    </>
  );
}
