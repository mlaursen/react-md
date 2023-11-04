import { InlineCode } from "@/components/InlineCode.jsx";
import { Typography } from "@react-md/core";
import type { ReactElement } from "react";
import { CopyCode } from "./CopyCode.jsx";
import { useMaterialIconsAndSymbols } from "./MaterialIconsAndSymbolsProvider.jsx";

function getProviderCode(root: boolean, iconFamily: string): string {
  return `import { ${
    root ? "CoreProviders, " : ""
  }MaterialIconsProvider } from "@react-md/core";

import RestOfTheApp from "./RestOfTheApp";

export default function ${root ? "App" : "Example"}() {
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

export function FontIconAdditionalChanges(): ReactElement {
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
      <CopyCode lang="tsx">{getProviderCode(true, iconFamily)}</CopyCode>
      <Typography type="headline-5" margin="top">
        Partial Settings
      </Typography>
      <Typography>
        If this customization should apply to only a section of your app, wrap
        that section in the <InlineCode>MaterialIconsProvider</InlineCode> with
        the following props:
      </Typography>
      <CopyCode>{getProviderCode(false, iconFamily)}</CopyCode>
    </>
  );
}
