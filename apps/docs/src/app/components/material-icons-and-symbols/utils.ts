import { pascalCase } from "@/utils/strings.js";
import {
  type MaterialIconFamily,
  type MaterialSymbolConfiguration,
  type MaterialSymbolName,
} from "@react-md/core";
import lodash from "lodash";
import {
  ICON_NAME_FIXES,
  MATERIAL_ICONS,
  MATERIAL_SYMBOLS,
  type IconsByCategory,
  type MaterialIconAndSymbolName,
  type MaterialIconType,
} from "./metadata.js";
import {
  type IconCategoryFilter,
  type MaterialIconsAndSymbolsContext,
} from "./types.js";

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

  if (isWeightChanged) {
    changes.push(`$icon-symbol-weight: ${weight}`);
  }

  if (isGradeChanged) {
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

export function getCategoryName(category: string): string {
  if (category.includes("&")) {
    return category
      .split("&")
      .map((part) => lodash.upperFirst(part))
      .join(" & ");
  }

  if (category.includes(" ")) {
    return category
      .split(" ")
      .map((part) =>
        part === "ui" ? part.toUpperCase() : lodash.upperFirst(part)
      )
      .join(" ");
  }

  return lodash.upperFirst(category);
}

export function isMaterialSymbol(
  iconName: MaterialIconAndSymbolName,
  iconType: MaterialIconType
): iconName is MaterialSymbolName {
  return iconType === "symbol";
}

export interface IconsByCategoryOptions {
  iconType: MaterialIconType;
  iconFamily: MaterialIconFamily;
  iconCategory: IconCategoryFilter;
}

export function getIconsByCategory(
  options: IconsByCategoryOptions
): IconsByCategory {
  const { iconType, iconFamily, iconCategory } = options;

  const icon = MATERIAL_ICONS[iconFamily];
  const symbol = MATERIAL_SYMBOLS[iconFamily];
  let iconsByCategory = iconType === "icon" ? icon : symbol;
  // TODO: Revert this (?) once the swc minifier no longer considers this
  // "dead code" for the `MATERIAL_SYMBOLS` and `MATERIAL_ICONS` constants.
  // let iconsByCategory = (
  //   iconType === "icon" ? MATERIAL_ICONS : MATERIAL_SYMBOLS
  // )[iconFamily];

  if (iconCategory) {
    iconsByCategory = {
      [iconCategory]: iconsByCategory[iconCategory],
    };
  }

  return iconsByCategory;
}

export function getIconFontName(type: MaterialIconFamily): string {
  switch (type) {
    case "two-tone":
      return "Two Tone";
    case "rounded":
      return "Round";
    case "filled":
      return "";
    default:
      return lodash.upperFirst(type);
  }
}

export interface MaterialIconComponentNameOptions {
  // use string instead of giant type union to improve performance. I also don't _need_
  // to know it is a MaterialIconAndSymbolName for this to work
  iconName: string;
  iconFamily: MaterialIconFamily;
}

export function getMaterialIconComponentName(
  options: MaterialIconComponentNameOptions
): string {
  const { iconFamily } = options;

  const iconName = ICON_NAME_FIXES[options.iconName] || options.iconName;
  const suffix = `${iconFamily === "filled" ? "" : `_${iconFamily}`}_icon`;

  return pascalCase(`${iconName}${suffix}`);
}

type DefinedSpecs = Omit<MaterialSymbolConfiguration, "family">;

interface FontStylesheetOptions {
  iconType: MaterialIconType;
  iconFamily: MaterialIconFamily;
}

export function getFontStylesheet(options: FontStylesheetOptions): string;
export function getFontStylesheet(
  options: FontStylesheetOptions & DefinedSpecs
): string;
export function getFontStylesheet(
  options: FontStylesheetOptions & Partial<DefinedSpecs>
): string {
  const {
    iconType,
    iconFamily,
    opticalSize = "20..48",
    weight = "100..700",
    fill = "0..1",
    grade = "-50..200",
  } = options;

  let specs = "";
  let familyName = iconFamily
    .split("-")
    .map((part) => lodash.upperFirst(part))
    .join("+");

  if (iconType === "icon") {
    familyName =
      familyName === "Rounded"
        ? "Round"
        : familyName === "Filled"
        ? ""
        : familyName;
  } else {
    specs = `:opsz,wght,FILL,GRAD@${opticalSize},${weight},${fill},${grade}`;
  }

  const suffix = `${lodash.upperFirst(iconType)}s${
    familyName ? `+${familyName}` : ""
  }${specs}`;

  return `https://fonts.googleapis.com/css2?family=Material+${suffix}`;
}
