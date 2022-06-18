import lodash from "lodash";
import { optimize } from "svgo";
import { existsSync, mkdirSync } from "node:fs";
import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

import { COPY_BANNER, MATERIAL_ICONS_SRC } from "../constants.js";
import { format } from "../utils/format.js";
import type { IconCollection, IconType } from "./types";

const END_SVG = "</svg>";

interface Options {
  category: string;
  iconType: IconType;
  componentName: string;
}

interface CreateOptions extends Options {
  children: string;
}

const fixStyle = (children: string): string =>
  children.replace(/style="([^"]+)"/g, (_match, styleString: string) => {
    const parts = styleString.split(";");

    const updated = parts.reduce((s, part) => {
      const [property, value] = part.split(":");

      return `${s}${s ? "," : ""}${lodash.camelCase(property)}: "${value}"`;
    }, "");

    return `style={{ ${updated} }}`;
  });

const removeClass = (children: string): string =>
  children.replace(/class="[^"]+"/g, "");
const camelCaseProps = (children: string): string =>
  children.replace(/-([a-z])/g, (_, letter: string) => letter.toUpperCase());

/**
 * Creates the icon component file for either a `FontIcon` or `SVGIcon` and
 * returns the full component name once copied.
 *
 * @returns The full component name with either the `SVGIcon` or `FontIcon` suffix
 */
async function create(options: CreateOptions): Promise<void> {
  const { category, iconType, componentName, children } = options;

  const folder = join(MATERIAL_ICONS_SRC, iconType, category);
  if (!existsSync(folder)) {
    mkdirSync(folder, { recursive: true });
  }

  const reactSafeChildren = camelCaseProps(removeClass(fixStyle(children)));

  const IconName = `${componentName}Icon`;

  const contents = format(
    `${COPY_BANNER}
import { forwardRef } from "react";
import type { SVGIconProps} from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export const ${IconName} = forwardRef<SVGSVGElement, SVGIconProps>(
  function ${IconName}(props, ref) {
    return <SVGIcon {...props} ref={ref}>${reactSafeChildren}</SVGIcon>;
  }
);
`,
    "typescript"
  );

  const componentPath = join(folder, `${IconName}.tsx`);

  await writeFile(componentPath, contents);
}

interface SvgIconOptions extends Options {
  sourceFilePath: string;
}

/**
 * Creates the SVGIcon component for the current icon.
 */
export async function createSvgIcon(options: SvgIconOptions): Promise<void> {
  const { sourceFilePath, ...createOptions } = options;

  const buffer = await readFile(sourceFilePath);
  const svgContents = buffer.toString();

  const optimized = optimize(svgContents, {
    path: sourceFilePath,
    plugins: ["preset-default"],
    multipass: true,
  });
  if (!("data" in optimized)) {
    throw new Error(optimized.error);
  }

  const contents = optimized.data;

  // this is a bit hacky and I should look into a better way of doing this at
  // some point... since this is rendered in the `SVGIcon` component, want to
  // remove the `<svg (...attributes)>` and `</svg>` so that it only includes
  // the `<path>`, `<circle>`, or other children
  const startIndex = contents.indexOf(">") + 1;
  const endIndex = contents.length - END_SVG.length;

  return create({
    ...createOptions,
    children: contents.substring(startIndex, endIndex),
  });
}

async function createIndexFile(
  folder: string,
  exports: readonly string[],
  suffix: "" | "Icon"
): Promise<void> {
  const sorted = exports.slice().sort();
  const contents = format(`${COPY_BANNER}
${sorted.map((name) => `export * from "./${name}${suffix}"`).join("\n")}
`);

  const fileName = join(folder, "index.ts");
  return writeFile(fileName, contents);
}

/**
 * Creates all the `index.ts` files based on the generated icon component files
 * so that all the icons can be imported without needing to specify a folder and
 * can just be:
 *
 * ```ts
 * import { Rotation3DFilledSVGIcon } from "@react-md/material-icons";
 * ```
 */
export async function createIndexFiles(
  collection: IconCollection
): Promise<void> {
  console.log("Creating the index files...");
  await Promise.all(
    Object.entries(collection).map(async ([iconType, category]) => {
      const categories: string[] = [];
      const iconTypeFolder = join(MATERIAL_ICONS_SRC, iconType);

      await Promise.all(
        Object.entries(category).map(([group, components]) => {
          if (!components.length) {
            return;
          }

          categories.push(group);
          return createIndexFile(
            join(iconTypeFolder, group),
            components,
            "Icon"
          );
        })
      );

      await createIndexFile(iconTypeFolder, categories, "");
    })
  );
  // await Promise.all(
  //   Object.entries(collection).map(async ([category, iconTypeComponents]) => {
  //     const iconTypes: IconType[] = [];
  //     const categoryFolder = join(MATERIAL_ICONS_SRC, category);

  //     await Promise.all(
  //       ICON_TYPES.map((iconType) => {
  //         const components = iconTypeComponents[iconType];
  //         if (!components.length) {
  //           return;
  //         }

  //         iconTypes.push(iconType);
  //         return createIndexFile(join(categoryFolder, iconType), components);
  //       })
  //     );

  //     return createIndexFile(categoryFolder, iconTypes);
  //   })
  // );

  // return createIndexFile(RMD_ICON_SRC, Object.keys(collection));
}
