import { Blockquote } from "@/components/Blockquote.jsx";
import { PackageManagerCodeBlock } from "@/components/PackageManagerCodeBlock.jsx";
import { highlightCode } from "@/utils/highlightCode.js";
import { Typography } from "react-md";
import { cnb } from "cnbuilder";
import Link from "next/link.js";
import { usePathname } from "next/navigation.js";
import { type ReactElement } from "react";
import { AdditionalChanges } from "./AdditionalChanges.jsx";
import { CopyCode } from "./CopyCode.js";
import { useMaterialIconsAndSymbols } from "./MaterialIconsAndSymbolsProvider.js";
import styles from "./SVGIconImportAndUsage.module.scss";
import { TwoToneIconWarning } from "./TwoToneIconWarning.jsx";
import { getIconUrl } from "./searchParams.js";
import { getMaterialIconComponentName } from "./utils.js";

export function SVGIconImportAndUsage(): ReactElement | null {
  const pathname = usePathname();
  const context = useMaterialIconsAndSymbols();
  const { selectedIconName, iconFamily, isFontFamilyChanged, changeSvgToFont } =
    context;
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
        SVG Icon import and usage
      </Typography>
      <CopyCode>{importCode}</CopyCode>
      <CopyCode>{usageCode}</CopyCode>
      {isFontFamilyChanged && <AdditionalChanges isSvg />}
      <Typography type="headline-5" className={styles.heading}>
        Installation
      </Typography>
      <Blockquote theme="info">
        <Typography>
          If you use a lot of icons in your app, you might be able to reduce
          your bundle size and dependencies by using the{" "}
          <Link
            onClick={changeSvgToFont}
            href={getIconUrl({
              ...context,
              pathname,
              iconType: "icon-font",
            })}
          >
            font icons
          </Link>{" "}
          instead.
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
