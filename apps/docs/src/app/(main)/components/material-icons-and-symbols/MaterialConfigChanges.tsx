import { CodeBlockAppBar } from "@react-md/code/CodeBlockAppBar";
import { CodeBlockFileName } from "@react-md/code/CodeBlockFileName";
import { type ReactElement } from "react";

import { CopyCode } from "./CopyCode.js";
import { useMaterialIconsAndSymbols } from "./MaterialIconsAndSymbolsProvider.js";

export function MaterialConfigChanges(): ReactElement {
  const {
    fill,
    grade,
    weight,
    opticalSize,
    iconFamily,
    iconType,
    isFillChanged,
    isGradeChanged,
    isWeightChanged,
    isOpticalSizeChanged,
    isFontFamilyChanged,
  } = useMaterialIconsAndSymbols();

  const changes: [string, string | number][] = [];
  if (iconType === "symbol") {
    if (isFillChanged) {
      changes.push(["fill", fill]);
    }
    if (isGradeChanged) {
      changes.push(["grade", grade]);
    }
    if (isWeightChanged) {
      changes.push(["weight", weight]);
    }
    if (isOpticalSizeChanged) {
      changes.push(["opticalSize", opticalSize]);
    }
  }
  if (isFontFamilyChanged) {
    changes.push([`${iconType}Family`, iconFamily]);
  }

  const code = `import { MATERIAL_CONFIG } from "react-md";

${changes
  .map(([name, value]) => {
    const setValue = typeof value === "string" ? `"${value}"` : value;
    return `MATERIAL_CONFIG.${name} = ${setValue};`;
  })
  .join("\n")}
`;
  return (
    <>
      <CodeBlockAppBar>
        <CodeBlockFileName>src/rmdConfig.tsx</CodeBlockFileName>
      </CodeBlockAppBar>
      <CopyCode disableMarginTop>{code}</CopyCode>
    </>
  );
}
