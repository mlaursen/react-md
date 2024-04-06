import { CodeBlockFileName } from "@/components/CodeBlockFileName.jsx";
import { CodeBlockHeader } from "@/components/CodeBlockHeader.jsx";
import {
  ExpansionPanel,
  Typography,
  cssUtils,
  useExpansionPanels,
} from "react-md";
import type { ReactElement } from "react";
import styles from "./AdditionalChangesPanels.module.scss";
import { CopyCode } from "./CopyCode.jsx";
import { MaterialConfigChanges } from "./MaterialConfigChanges.jsx";
import { useMaterialIconsAndSymbols } from "./MaterialIconsAndSymbolsProvider.jsx";
import { type MaterialIconsAndSymbolsContext } from "./types.js";

function getSymbolProps(context: MaterialIconsAndSymbolsContext): string {
  const {
    fill,
    grade,
    weight,
    iconType,
    iconFamily,
    opticalSize,
    selectedIconName,
    isFillChanged,
    isGradeChanged,
    isWeightChanged,
    isFontFamilyChanged,
    isOpticalSizeChanged,
  } = context;
  const props: string[] = [`name="${selectedIconName}"`];
  if (isFontFamilyChanged) {
    props.push(`family="${iconFamily}"`);
  }

  if (iconType === "symbol") {
    if (isFillChanged) {
      props.push(`fill={${fill}}`);
    }

    if (isGradeChanged) {
      props.push(`grade={${grade}}`);
    }

    if (isWeightChanged) {
      props.push(`weight={${weight}}`);
    }

    if (isOpticalSizeChanged) {
      props.push(`opticalSize={${opticalSize}}`);
    }
  }

  return props.join("\n  ");
}

function getEverythingScss(context: MaterialIconsAndSymbolsContext): string {
  const {
    fill,
    weight,
    grade,
    opticalSize,
    isFillChanged,
    isGradeChanged,
    isWeightChanged,
    isOpticalSizeChanged,
  } = context;

  const changes: string[] = [];
  if (isFillChanged) {
    changes.push(`$icon-symbol-fill: ${fill}`);
  }

  if (isWeightChanged) {
    changes.push(`$icon-symbol-weight: ${weight}`);
  }

  if (isGradeChanged) {
    changes.push(`$icon-symbol-grade: ${grade}`);
  }

  if (isOpticalSizeChanged) {
    changes.push(`$icon-symbol-optical-size: ${opticalSize}`);
  }

  return `@forward "react-md" with (
  ${changes.join(",\n  ")}
);
`;
}

export function AdditionalChangesPanels(): ReactElement {
  const context = useMaterialIconsAndSymbols();
  const { isSymbolCustomizationChanged, iconType } = context;
  const component = iconType === "symbol" ? "MaterialSymbol" : "MaterialIcon";

  const { getPanelProps } = useExpansionPanels();

  return (
    <>
      <ExpansionPanel
        {...getPanelProps(0)}
        className={cssUtils({
          fontStyle: "normal",
          className: styles.panel,
        })}
        headerChildren="Apply to entire app"
        headerProps={{
          headingProps: {
            type: "headline-6",
          },
        }}
      >
        <Typography margin="bottom">
          If the entire app should use these material symbol customizations,
          apply the following changes.
        </Typography>
        {isSymbolCustomizationChanged && (
          <>
            <CodeBlockHeader>
              <CodeBlockFileName>_everything.scss</CodeBlockFileName>
            </CodeBlockHeader>
            <CopyCode lang="scss" disableMarginTop>
              {getEverythingScss(context)}
            </CopyCode>
          </>
        )}
        <MaterialConfigChanges />
      </ExpansionPanel>
      <ExpansionPanel
        {...getPanelProps(1)}
        className={styles.panel}
        headerChildren="Apply to this single icon"
        headerProps={{
          headingProps: {
            type: "headline-6",
          },
        }}
      >
        <Typography margin="bottom">
          If this is the only icon that should have different styles, the
          customization can be applied with inline styles using the material
          symbol props.
        </Typography>
        <CopyCode>{`<${component}\n  ${getSymbolProps(context)}\n/>`}</CopyCode>
      </ExpansionPanel>
    </>
  );
}
