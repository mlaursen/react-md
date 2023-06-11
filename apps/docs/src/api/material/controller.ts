import type { MaterialIconFamily } from "@react-md/core";
import { wait } from "@react-md/core";
import { glob } from "glob";
import lodash from "lodash";
import { existsSync } from "node:fs";
import { readFile, rm, writeFile } from "node:fs/promises";
import { join, resolve } from "node:path";
import { optimize } from "svgo";

import { GENERATED_FILE_BANNER } from "src/constants/codegen";
import { formatInNode } from "src/utils/nodeFormat";
import { getMaterialIconComponentName } from "src/components/MaterialIconsAndSymbols/utils";
import { BadRequestError, ForbiddenError } from "src/utils/errors";
import type {
  CategoriesByFamilyType,
  CategoriesByFamilyTypeMap,
  FontMetadata,
  GeneratingStats,
  MaterialComponentMetadata,
  MaterialFamilyParts,
  MaterialIconAndSymbolMetadata,
} from "./types";
import { execSync } from "node:child_process";

export class MaterialIconController {
  private _fontMetadataPath: string;
  private _generatingStatsPath: string;
  private _materialTypesPath: string;
  private _materialMetadataPath: string;
  private _materialIconsSrc: string;

  constructor() {
    if (process.env.NODE_ENV === "production") {
      throw new ForbiddenError();
    }

    const projectRoot = execSync("git rev-parse --show-toplevel")
      .toString()
      .trim();
    const packagesRoot = join(projectRoot, "packages");

    this._fontMetadataPath = resolve(process.cwd(), "material-metadata.json");
    this._materialTypesPath = resolve(
      packagesRoot,
      "core",
      "src",
      "icon",
      "material.ts"
    );
    this._materialMetadataPath = resolve(
      process.cwd(),
      "src",
      "components",
      "MaterialIconsAndSymbols",
      "metadata.ts"
    );
    this._generatingStatsPath = resolve(process.cwd(), "generating.json");
    this._materialIconsSrc = resolve(packagesRoot, "material-icons", "src");
  }

  async updateEverything(): Promise<void> {
    const metadata = await this._generateMetadata();
    await this._createMetadataFile(metadata);
    await this._createMaterialTypesFile(metadata);
    // background process
    this._createComponents(metadata.components);
  }

  private async _createComponents(
    components: readonly MaterialComponentMetadata[]
  ): Promise<void> {
    if ((await this.getGeneratingStats()).remaining !== 0) {
      throw new BadRequestError("Components are already generating");
    }

    const existingComponents = await glob("*.tsx", {
      cwd: this._materialIconsSrc,
    });

    const startTime = Date.now();
    const total = components.length;
    let remaining = total;
    this._writeStats({ total, startTime, remaining, completed: 0 });

    const chunks = lodash.chunk(components, 50);
    const created: string[] = [];
    for (const requests of chunks) {
      const createdComponentNames = await Promise.all(
        requests.map((req) => this._generateComponent(req))
      );
      created.push(...createdComponentNames);
      remaining -= requests.length;

      await this._writeStats({
        total,
        startTime,
        completed: created.length,
        remaining,
      });
      await wait(1000);
    }

    const toRemove = lodash.difference(existingComponents, created);
    await Promise.all(
      toRemove.map((fileName) => rm(join(this._materialIconsSrc, fileName)))
    );

    const endTime = Date.now();
    this._writeStats({
      total,
      endTime,
      startTime,
      remaining: 0,
      completed: created.length,
    });
  }

  private async _generateComponent(
    component: MaterialComponentMetadata
  ): Promise<string> {
    const { name, host, version, family, iconFamily } = component;

    const group = family.toLowerCase().replace(/ /g, "");
    const url = `https://${host}/s/i/${group}/${name}/v${version}/24px.svg`;

    const response = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36",
      },
    });

    const componentName = getMaterialIconComponentName({
      iconName: name,
      iconFamily,
    });
    const rawSvg = await response.text();
    const svgContents = await this._getSvgContents(rawSvg);
    const contents = formatInNode(
      `${GENERATED_FILE_BANNER}

import { forwardRef } from "react";
import type { SVGIconProps} from "@react-md/core";
import { SVGIcon } from "@react-md/core";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function ${componentName}(props, ref) {
    return <SVGIcon {...props} ref={ref}>${svgContents}</SVGIcon>;
  }
);
`,
      "typescript"
    );
    const fileName = join(this._materialIconsSrc, `${componentName}.tsx`);
    await writeFile(fileName, contents, "utf8");

    return `${componentName}.tsx`;
  }

  private async _writeStats(stats: GeneratingStats): Promise<void> {
    await writeFile(this._generatingStatsPath, JSON.stringify(stats), "utf8");
  }

  async getGeneratingStats(): Promise<GeneratingStats> {
    if (!existsSync(this._generatingStatsPath)) {
      return { total: 0, remaining: 0, completed: 0 };
    }

    const json = JSON.parse(await readFile(this._generatingStatsPath, "utf8"));
    const completed =
      typeof json.completed === "number" ? Math.max(0, json.completed) : 0;
    const remaining =
      typeof json.remaining === "number" ? Math.max(0, json.remaining) : 0;
    const total = typeof json.total === "number" ? json.total : 0;
    const startTime =
      typeof json.startTime === "number" ? json.startTime : undefined;
    const endTime = typeof json.endTime === "number" ? json.endTime : undefined;

    return { total, remaining, completed, startTime, endTime };
  }

  private async _getFontMetadata(): Promise<FontMetadata> {
    if (existsSync(this._fontMetadataPath)) {
      return JSON.parse(await readFile(this._fontMetadataPath, "utf8"));
    }

    const response = await fetch(
      "http://fonts.google.com/metadata/icons?incomplete=1&key=material_symbols"
    );
    const text = await response.text();
    const jsonString = text.substring(5);
    const json = JSON.parse(jsonString);
    await writeFile(this._fontMetadataPath, jsonString, "utf8");

    return json;
  }

  private async _createMetadataFile(
    options: MaterialIconAndSymbolMetadata
  ): Promise<void> {
    const {
      iconsLookup,
      iconFamilyTypes,
      iconCategories,
      symbolsLookup,
      symbolFamilyTypes,
      symbolCategories,
      iconNameFixes,
    } = options;

    const generatedMetadata = formatInNode(`${GENERATED_FILE_BANNER}

import type { MaterialIconName, MaterialSymbolName } from "@react-md/core";

export type MaterialIconType = "icon" | "symbol";
export type MaterialIconAndSymbolName = MaterialIconName | MaterialSymbolName;
export type IconsByCategory = Record<string, readonly MaterialIconAndSymbolName[]>;
export type CategoriesByFamilyType = Record<string, IconsByCategory>;

${this._printConst(
  "ICON_NAME_FIXES",
  Object.fromEntries(iconNameFixes),
  "Record<string, string>"
)}

${this._printConst("MATERIAL_ICONS", iconsLookup, "CategoriesByFamilyType")}
${this._printConst("MATERIAL_ICON_FAMILY_TYPES", iconFamilyTypes)}
${this._printConst("MATERIAL_ICON_CATEGORIES", iconCategories)}
${this._printTypeUnion("MaterialIconCategory", iconCategories)}

${this._printConst("MATERIAL_SYMBOLS", symbolsLookup, "CategoriesByFamilyType")}
${this._printConst("MATERIAL_SYMBOL_FAMILY_TYPES", symbolFamilyTypes)}
${this._printConst("MATERIAL_SYMBOL_CATEGORIES", symbolCategories)}
${this._printTypeUnion("MaterialSymbolCategory", symbolCategories)}

`);
    await writeFile(this._materialMetadataPath, generatedMetadata, "utf8");
  }

  private async _createMaterialTypesFile(
    options: MaterialIconAndSymbolMetadata
  ): Promise<void> {
    const { iconNames, iconFamilyTypes, symbolNames, symbolFamilyTypes } =
      options;

    const generatedTypes = formatInNode(`${GENERATED_FILE_BANNER}

/** @remarks \\@since 6.0.0 */
${this._printTypeUnion("MaterialIconFamily", iconFamilyTypes)}

/** @remarks \\@since 6.0.0 */
${this._printTypeUnion("MaterialIconName", [...iconNames])}

/** @remarks \\@since 6.0.0 */
${this._printTypeUnion("MaterialSymbolFamily", symbolFamilyTypes)}

/** @remarks \\@since 6.0.0 */
${this._printTypeUnion("MaterialSymbolName", [...symbolNames])}

`);
    await writeFile(this._materialTypesPath, generatedTypes, "utf8");
  }

  private async _generateMetadata(): Promise<MaterialIconAndSymbolMetadata> {
    const { host, families, icons } = await this._getFontMetadata();
    const iconNames = new Set<string>();
    const symbolNames = new Set<string>();
    const iconsByFamilyType: CategoriesByFamilyTypeMap = new Map();
    const symbolsByFamilyType: CategoriesByFamilyTypeMap = new Map();
    const iconNameFixes = new Map<string, string>();
    const components: MaterialComponentMetadata[] = [];
    icons.forEach((metadata) => {
      const { name, unsupported_families, categories, sizes_px, version } =
        metadata;
      if (categories.length !== 1) {
        throw new Error(`${name} does not have exactly 1 category`);
      }
      if (!sizes_px.includes(24)) {
        throw new Error(`${name} does not support 24px size`);
      }

      const category = categories[0].toLowerCase();
      families.forEach((family) => {
        if (unsupported_families.includes(family)) {
          return;
        }
        const { iconType, iconFamily } = this._getMaterialFamilyParts(family);

        const names = iconType === "icon" ? iconNames : symbolNames;
        names.add(name);

        const lookup =
          iconType === "icon" ? iconsByFamilyType : symbolsByFamilyType;
        const iconsLookup = lookup.get(iconFamily) || new Map();
        const iconsSet = iconsLookup.get(category) || new Set();

        if (iconType === "icon") {
          if (/^[0-9]/.test(name)) {
            iconNameFixes.set(name, `${category}_${name}`);
          } else if (name === "addchart") {
            iconNameFixes.set(name, "add_chart");
          }
        }

        iconsSet.add(name);
        iconsLookup.set(category, iconsSet);
        lookup.set(iconFamily, iconsLookup);
        if (iconType === "icon") {
          components.push({
            host,
            name,
            version,
            family,
            iconFamily,
          });
        }
      });
    });

    const symbolsLookup = this._categoriesMapToObject(symbolsByFamilyType);
    const symbolFamilyTypes = Object.keys(symbolsLookup);
    const symbolCategories = this._getSortedCategories(symbolsByFamilyType);
    const iconsLookup = this._categoriesMapToObject(iconsByFamilyType);
    const iconFamilyTypes = Object.keys(iconsLookup);
    // make it so family types that exist in symbols appear first and can be reused
    iconFamilyTypes.sort((a, b) =>
      symbolFamilyTypes.includes(a) && !symbolFamilyTypes.includes(b) ? -1 : 1
    );

    const iconCategories = this._getSortedCategories(iconsByFamilyType);

    return {
      components,
      iconNameFixes,
      iconNames,
      iconsLookup,
      iconCategories,
      iconFamilyTypes,
      symbolNames,
      symbolsLookup,
      symbolCategories,
      symbolFamilyTypes,
    };
  }

  private _getMaterialFamilyParts(family: string): MaterialFamilyParts {
    const [_material, iconType, ...names] = family.toLowerCase().split(" ");

    const name = names.join("-") || "filled";

    return {
      iconType: iconType === "icons" ? "icon" : "symbol",
      iconFamily: name === "round" ? "rounded" : (name as MaterialIconFamily),
    };
  }

  private _getSortedCategories(
    lookup: CategoriesByFamilyTypeMap
  ): readonly string[] {
    const categories = new Set<string>();
    lookup.forEach((value) => {
      value.forEach((_value, category) => {
        categories.add(category);
      });
    });

    const sorted = [...categories].sort();
    return sorted;
  }

  private _categoriesMapToObject(
    categories: CategoriesByFamilyTypeMap
  ): CategoriesByFamilyType {
    const lookup: Record<string, Record<string, string[]>> = {};
    categories.forEach((categoryLookup, familyType) => {
      lookup[familyType] = {};
      categoryLookup.forEach((iconNames, category) => {
        lookup[familyType][category] = [...iconNames];
      });
    });

    return lookup;
  }

  private async _getSvgContents(rawSvg: string): Promise<string> {
    const fixStyle = (children: string): string =>
      children.replace(/style="([^"]+)"/g, (_match, styleString: string) => {
        const parts = styleString.split(";");

        const updated = parts.reduce((s, part) => {
          const [property, value] = part.split(":");

          return `${s}${s ? "," : ""}${lodash.camelCase(property)}: "${value}"`;
        }, "");

        return `style={{ ${updated} }}`;
      });

    const camelCaseProps = (children: string): string =>
      children.replace(/(-|:)([a-z])/g, (_, __, letter: string) =>
        letter.toUpperCase()
      );
    const removeClass = (children: string): string =>
      children.replace(/class="[^"]+"/g, "");
    const END_SVG = "</svg>";

    const svgContents = removeClass(rawSvg);

    const optimized = optimize(svgContents, {
      plugins: [
        {
          name: "preset-default",
          params: {
            overrides: {
              removeUselessStrokeAndFill: {
                removeNone: true,
              },
            },
          },
        },
      ],
      multipass: true,
    });

    const contents = optimized.data;

    // this is a bit hacky and I should look into a better way of doing this at
    // some point... since this is rendered in the `SVGIcon` component, want to
    // remove the `<svg (...attributes)>` and `</svg>` so that it only includes
    // the `<path>`, `<circle>`, or other children
    const startIndex = contents.indexOf(">") + 1;
    const endIndex = contents.length - END_SVG.length;

    return camelCaseProps(fixStyle(contents.substring(startIndex, endIndex)));
  }

  private _printConst(name: string, value: unknown, type?: string): string {
    const t = type ? `: ${type}` : "";
    const cast = type ? "" : " as const";

    return `export const ${name}${t} = ${JSON.stringify(value)}${cast}`;
  }

  private _printTypeUnion(name: string, values: readonly string[]): string {
    const union = values.map((value) => `| "${value}"`).join("");

    return `export type ${name} = ${union}`;
  }
}
