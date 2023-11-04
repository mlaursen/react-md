import { Blockquote } from "@/components/Blockquote.jsx";
import { PackageManagerCodeBlock } from "@/components/PackageManagerCodeBlock.jsx";
import { highlightCode } from "@/utils/highlightCode.js";
import { Typography } from "@react-md/core";
import { type ReactElement } from "react";
import { CopyCode } from "./CopyCode.js";
import { useMaterialIconsAndSymbols } from "./MaterialIconsAndSymbolsProvider.js";
import { TwoToneIconWarning } from "./TwoToneIconWarning.jsx";
import { getMaterialIconComponentName } from "./utils.js";

export function SVGIconImportAndUsage(): ReactElement | null {
  const { selectedIconName, iconFamily } = useMaterialIconsAndSymbols();
  if (!selectedIconName) {
    return null;
  }

  const componentName = getMaterialIconComponentName({
    iconName: selectedIconName,
    iconFamily,
  });
  const importCode = `import ${componentName} from "@react-md/material-icons/${componentName}"`;
  const usageCode = `<${componentName}  />`;

  return (
    <>
      <CopyCode>{importCode}</CopyCode>
      <CopyCode>{usageCode}</CopyCode>
      {iconFamily === "two-tone" && <TwoToneIconWarning />}
      <Typography type="headline-5" margin="top">
        Installation
      </Typography>
      <PackageManagerCodeBlock
        lineWrap
        npm={highlightCode("npm install @react-md/material-icons", "shell")}
        pnpm={highlightCode("pnpm add @react-md/material-icons", "shell")}
        yarn={highlightCode("yarn add @react-md/material-icons", "shell")}
      />
      <Blockquote theme="info">
        <Typography>
          If you use a lot of icons in your app, you might be able to reduce
          your bundle size and dependencies by using the font icons instead.
        </Typography>
      </Blockquote>
    </>
  );
}
