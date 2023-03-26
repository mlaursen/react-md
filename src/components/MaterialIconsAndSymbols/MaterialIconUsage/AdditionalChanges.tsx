import { Typography } from "@react-md/core";
import type { ReactElement } from "react";
import { FormattedCodeBlock } from "src/components/Code/FormattedCodeBlock";
import { InlineCode } from "src/components/Code/InlineCode";
import { useMaterialIconsAndSymbols } from "../MaterialIconsAndSymbolsProvider";

function getProviderCode(root: boolean, iconFamily: string): string {
  return `import { ${
    root ? "CoreProviders, " : ""
  }MaterialIconsProvider } from "@react-md/core";
import type { ReactElement } from "react";

import RestOfTheApp from "./RestOfTheApp";

export default function ${root ? "App" : "Example"}(): ReactElement {
  return (
    ${root ? "<CoreProviders>" : ""}
      <MaterialIconsProvider family="${iconFamily}">
        <RestOfTheApp />
      </MaterialIconsProvider>
    ${root ? "</CoreProviders>" : ""}
  );
}
`;
}

export function AdditionalChanges(): ReactElement {
  const { iconFamily } = useMaterialIconsAndSymbols();

  return (
    <>
      <Typography type="headline-4" margin="top">
        Additional Changes
      </Typography>
      <Typography type="headline-5" margin="none">
        Global Settings
      </Typography>
      <Typography>
        If this icon family should apply to your entire app, update the{" "}
        <InlineCode>MaterialIconsProvider</InlineCode> at the root of your app:
      </Typography>
      <FormattedCodeBlock language="tsx" lineWrap>
        {getProviderCode(true, iconFamily)}
      </FormattedCodeBlock>
      <Typography type="headline-5" margin="top">
        Partial Settings
      </Typography>
      <Typography>
        If this customization should apply to only a section of your app, wrap
        that section in the <InlineCode>MaterialIconsProvider</InlineCode> with
        the following props:
      </Typography>
      <FormattedCodeBlock language="tsx" lineWrap>
        {getProviderCode(false, iconFamily)}
      </FormattedCodeBlock>
    </>
  );
}
