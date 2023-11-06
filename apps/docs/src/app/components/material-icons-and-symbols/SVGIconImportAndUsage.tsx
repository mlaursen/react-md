import { Blockquote } from "@/components/Blockquote.jsx";
import { PackageManagerCodeBlock } from "@/components/PackageManagerCodeBlock.jsx";
import { highlightCode } from "@/utils/highlightCode.js";
import { Typography } from "@react-md/core";
import { type ReactElement } from "react";
import { CopyCode } from "./CopyCode.js";
import { useMaterialIconsAndSymbols } from "./MaterialIconsAndSymbolsProvider.js";
import { TwoToneIconWarning } from "./TwoToneIconWarning.jsx";
import { getMaterialIconComponentName } from "./utils.js";
import styles from "./SVGIconImportAndUsage.module.scss";
import { cnb } from "cnbuilder";
import { AdditionalChanges } from "./AdditionalChanges.jsx";

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
      <Typography
        type="headline-5"
        margin="top"
        className={cnb(styles.heading, styles.noMarginTop)}
      >
        Import and usage
      </Typography>
      <CopyCode>{importCode}</CopyCode>
      <CopyCode>{usageCode}</CopyCode>
      <AdditionalChanges isSvg />
      <Typography type="headline-5" className={styles.heading}>
        Installation
      </Typography>
      <Blockquote theme="info">
        <Typography>
          If you use a lot of icons in your app, you might be able to reduce
          your bundle size and dependencies by using the font icons instead.
        </Typography>
      </Blockquote>
      <PackageManagerCodeBlock
        lineWrap
        npm={highlightCode("npm install @react-md/material-icons", "shell")}
        pnpm={highlightCode("pnpm add @react-md/material-icons", "shell")}
        yarn={highlightCode("yarn add @react-md/material-icons", "shell")}
      />
      {iconFamily === "two-tone" && <TwoToneIconWarning />}
    </>
  );
}
