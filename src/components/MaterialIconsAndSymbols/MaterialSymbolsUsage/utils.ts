import type { MaterialIconsAndSymbolsContext } from "../MaterialIconsAndSymbolsProvider";

export function getSymbolCode(name: string, symbolProps = ""): string {
  return `<MaterialSymbol name="${name}" ${symbolProps}/>`;
}

export function getSymbolProps(
  context: MaterialIconsAndSymbolsContext
): string {
  const {
    fill,
    weight,
    grade,
    opticalSize,
    iconFamily,
    isFillChanged,
    isGradeChanged,
    isWeightChanged,
    isFontFamilyChanged,
    isOpticalSizeChanged,
  } = context;

  const changes: string[] = [];
  if (isFontFamilyChanged) {
    changes.push(`family="${iconFamily}"`);
  }

  if (isFillChanged) {
    changes.push(`fill={${fill}}`);
  }

  if (isGradeChanged) {
    changes.push(`grade={${grade}}`);
  }

  if (isWeightChanged) {
    changes.push(`weight={${weight}}`);
  }

  if (isOpticalSizeChanged) {
    changes.push(`opticalSize={${opticalSize}}`);
  }

  return changes.join(" ");
}

interface ProviderCodeOptions {
  type: "global" | "partial" | "partial-styled";
  symbolProps: string;
}

export function getProviderCode(options: ProviderCodeOptions): string {
  const { type, symbolProps } = options;

  const isGlobal = type === "global";
  const isStyled = type === "partial-styled";
  let children = "<RestOfTheApp />";
  if (isStyled) {
    children = `<div className={styles.container}>\n${children}\n</div>`;
  }

  return `import { MaterialSymbolsProvider } from "@react-md/core";
import type { ReactElement } from "react";

${isStyled ? 'import styles from "./Example.module.scss"' : ""}
import RestOfTheApp from "./RestOfTheApp";

export default function ${isGlobal ? "App" : "Example"}(): ReactElement {
  return (
    <MaterialSymbolsProvider ${symbolProps}>
      ${children}
    </MaterialSymbolsProvider>
  );
}
`;
}

export function getEverythingScss(
  context: MaterialIconsAndSymbolsContext
): string {
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

  if (isGradeChanged) {
    changes.push(`$icon-symbol-weight: ${weight}`);
  }

  if (isWeightChanged) {
    changes.push(`$icon-symbol-grade: ${grade}`);
  }

  if (isOpticalSizeChanged) {
    changes.push(`$icon-symbol-optical-size: ${opticalSize}`);
  }

  return `// _everything.scss
@forward "@react-md/core" with (${changes.join(",\n")});
`;
}

export function getPartialSettingsSCSS(
  context: MaterialIconsAndSymbolsContext
): string {
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
  const parts: [name: string, value: number][] = [];
  if (isFillChanged) {
    parts.push(["fill", fill]);
  }
  if (isWeightChanged) {
    parts.push(["weight", weight]);
  }
  if (isGradeChanged) {
    parts.push(["grade", grade]);
  }
  if (isOpticalSizeChanged) {
    parts.push(["optical-size", opticalSize]);
  }

  const includes = parts.map(
    ([name, value]) =>
      `@include everything.icon-set-var(symbol-${name}, ${value})\n;`
  );

  return `// Example.module.scss
@use "everything";

.container {
  ${includes.join("")}
}
`;
}
