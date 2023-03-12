import type { TextThemeColor, ThemeColor } from "@react-md/core";
import {
  Box,
  Button,
  Checkbox,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Fieldset,
  Legend,
  MaterialIcon,
  MaterialSymbol,
  Option,
  Select,
} from "@react-md/core";
import CloseIcon from "@react-md/material-icons/CloseIcon";

import type { ReactElement } from "react";
import { useState } from "react";
import { CodeBlock } from "../Code";

import { format } from "src/utils/format";
import styles from "./HowToUseIcon.module.scss";
import type { MaterialIconAndSymbolName } from "./metadata";
import { useMaterialStateContext } from "./useMaterialState";
import { getMaterialIconComponentName, isMaterialSymbol } from "./utils";

type Color = ThemeColor | TextThemeColor | "";
const COLORS: readonly Color[] = [
  "",
  "hint",
  "disabled",
  "primary",
  "secondary",
  "success",
  "warning",
  "error",
];
const FONT_SIZES: readonly string[] = [
  "",
  "1rem",
  "1.5rem",
  "2rem",
  "2.5rem",
  "3rem",
  "3.5rem",
  "4rem",
];

export interface HowToUseIconProps {
  iconName: MaterialIconAndSymbolName;
  onRequestClose(): void;
}

export function HowToUseIcon(props: HowToUseIconProps): ReactElement {
  const { iconName, onRequestClose } = props;
  const { iconType, iconFamily } = useMaterialStateContext();
  const [color, setColor] = useState<Color>("");
  const [dense, setDense] = useState(false);

  let componentName: string;
  let importName: string;
  let packageName: string;
  switch (iconType) {
    case "icon":
      componentName = getMaterialIconComponentName({
        iconName,
        iconFamily,
      });
      importName = `${componentName}`;
      packageName = `material-icons/${importName}`;
      break;
    case "symbol":
      componentName = "MaterialSymbol";
      importName = `{ ${componentName} }`;
      packageName = "core";
      break;
  }
  const [fontSize, setFontSize] = useState("");

  const iconProps = {
    color: color || undefined,
    dense: dense && !fontSize,
    style: fontSize ? { fontSize } : undefined,
  };
  const iconPropString = Object.entries(iconProps).reduce(
    (s, [name, value]) => {
      let prop = "";
      if (value) {
        if (typeof value === "boolean" && value) {
          prop = name;
        } else if (typeof value === "object") {
          prop = `${name}={${JSON.stringify(value)}}`;
        } else {
          prop = `${name}="${value}"`;
        }
      }

      return `${s}${s && prop ? " " : ""}${prop}`;
    },
    iconType === "symbol" ? ` name="${iconName}"` : " "
  );

  return (
    <>
      <DialogHeader className={styles.header}>
        <DialogTitle className={styles.title}>
          {iconName.replace(/_/g, " ")} {iconType} Usage
        </DialogTitle>
        <Button aria-label="Close" buttonType="icon" onClick={onRequestClose}>
          <CloseIcon />
        </Button>
      </DialogHeader>
      <CodeBlock language="ts">
        {format(`import ${importName} from "@react-md/${packageName}";`, {
          printWidth: 60,
        })}
      </CodeBlock>
      <DialogContent disablePadding>
        <Box justify="center" className={styles.preview}>
          {isMaterialSymbol(iconName, iconType) ? (
            <MaterialSymbol name={iconName} {...iconProps} />
          ) : (
            <MaterialIcon name={iconName} {...iconProps} />
          )}
        </Box>
        <Fieldset className={styles.fieldset}>
          <Box>
            <Legend className={styles.legend}>Props</Legend>
            <Select
              dense
              value={color}
              onChange={(event) => setColor(event.currentTarget.value)}
              label="Color"
            >
              {COLORS.map((color) => (
                <Option key={color} value={color}>
                  {color}
                </Option>
              ))}
            </Select>
            <Select
              dense
              label="Font Size"
              value={fontSize}
              onChange={(event) => setFontSize(event.currentTarget.value)}
            >
              {FONT_SIZES.map((fontSize) => (
                <Option key={fontSize} value={fontSize}>
                  {fontSize}
                </Option>
              ))}
            </Select>
            <Checkbox
              label="Dense"
              checked={dense}
              onChange={(event) => setDense(event.currentTarget.checked)}
              disabled={!!fontSize}
            />
          </Box>
        </Fieldset>
        <CodeBlock
          language="tsx"
          containerProps={{ className: styles.code }}
          minLines={5}
          lineNumbers
        >
          {format(`<${componentName}${iconPropString} />`, {
            printWidth: 60,
          }).replace(/;/g, "")}
        </CodeBlock>
      </DialogContent>
    </>
  );
}
