import { transformFile } from "@swc/core";
import glob from "glob";
import lodash from "lodash";
import { ExecOptions } from "node:child_process";
import { existsSync } from "node:fs";
import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { optimize } from "svgo";
import {
  COPY_BANNER,
  MATERIAL_ICONS_FOLDER,
  MATERIAL_ICONS_REPO,
  MATERIAL_ICONS_SPARSE_CHECKOUT,
  MATERIAL_ICONS_VERSION,
  PACKAGES_ROOT,
} from "./constants.js";
import { format } from "./utils/format.js";
import { loggedExecSync } from "./utils/loggedExecSync.js";
import { pascalCase } from "./utils/strings.js";

const SKIP_GENERATE = false;

type IconType = "filled" | "outlined" | "rounded" | "two-tone" | "sharp";

function getIconType(type: string): IconType {
  switch (type.replace("materialicons", "")) {
    case "":
      return "filled";
    case "outlined":
      return "outlined";
    case "round":
      return "rounded";
    case "twotone":
      return "two-tone";
    case "sharp":
      return "sharp";
    default:
      throw new Error(`Unknown type: ${type}`);
  }
}

function getComponentName(
  snakeCaseName: string,
  iconType: IconType,
  category: string
): string {
  if (/^[0-9]/.test(snakeCaseName)) {
    const [first, second, ...remaining] = snakeCaseName.split("_");
    const suffix = remaining.length ? `_${remaining.join("_")}` : "";
    snakeCaseName = `${second}_${first}${suffix}`;
  }

  if (snakeCaseName === "add_cart") {
    snakeCaseName = `add_cart_${category}`;
  } else if (snakeCaseName === "addcart") {
    snakeCaseName = "add_cart";
  } else if (snakeCaseName === "add_chart") {
    snakeCaseName = `add_chart_${category}`;
  } else if (snakeCaseName === "addchart") {
    snakeCaseName = "add_chart";
  } else if (snakeCaseName.endsWith("_outlined")) {
    snakeCaseName = `Outlined${snakeCaseName.replace("_outlined", "")}`;
  } else if (snakeCaseName.endsWith("_rounded")) {
    snakeCaseName = `Rounded${snakeCaseName.replace("_rounded", "")}`;
  }

  const suffix = `${iconType === "filled" ? "" : `_${iconType}`}_icon`;

  return pascalCase(`${snakeCaseName}${suffix}`);
}

const MATERIAL_ICONS_ROOT = join(PACKAGES_ROOT, "material-icons");
const MATERIAL_ICONS_SRC = join(MATERIAL_ICONS_ROOT, "src");

const TYPE_DEFINITION_FILE = `/// <reference types="react" />
import { SVGIconProps } from "@react-md/icon"
declare const _default: import("react").ForwardRefExoticComponent<SVGIconProps & import("react").RefAttributes<SVGSVGElement>>;
export default _default;
`;

const alphaNumericSort = (list: readonly string[]): readonly string[] => {
  const compare = new Intl.Collator("en-US").compare;

  const sorted = list.slice();
  sorted.sort(compare);

  return sorted;
};

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

async function getSvgContents(sourceFilePath: string): Promise<string> {
  const buffer = await readFile(sourceFilePath);
  const svgContents = removeClass(buffer.toString());

  const optimized = optimize(svgContents, {
    path: sourceFilePath,
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

/**
 * Use the new git sparse-checkout to help speed up the update process. This
 * repo is giant and takes forever to clone and update.
 */
function sparseCheckout(): void {
  const options: ExecOptions = {
    cwd: MATERIAL_ICONS_FOLDER,
  };
  if (!existsSync(MATERIAL_ICONS_FOLDER)) {
    // clone the repo with no history and without pulling down all the files
    // immediately. still takes awhile...
    loggedExecSync(
      `git clone --depth 1 --no-checkout --branch ${MATERIAL_ICONS_VERSION} ${MATERIAL_ICONS_REPO} ${MATERIAL_ICONS_FOLDER}`
    );

    // enable the sparse checkout
    loggedExecSync("git config core.sparseCheckout true", options);
    loggedExecSync("git sparse-checkout init", options);
  }

  // force change the sparce checkout rules for the material icons only since
  // I'm planning on supporting the symbols in the future
  loggedExecSync(MATERIAL_ICONS_SPARSE_CHECKOUT, options);

  // pull down only the material icons
  loggedExecSync(`git checkout ${MATERIAL_ICONS_VERSION}`, options);
}

async function run(): Promise<void> {
  sparseCheckout();

  const svgs = glob.sync("**/24px.svg", { cwd: MATERIAL_ICONS_FOLDER });

  const chunked = lodash.chunk(svgs, 50);

  if (!SKIP_GENERATE) {
    if (existsSync(MATERIAL_ICONS_SRC)) {
      await rm(MATERIAL_ICONS_SRC, { recursive: true });
    }

    const files = glob.sync("*.{cjs,mjs,d.ts}", {
      cwd: MATERIAL_ICONS_ROOT,
    });
    await Promise.all(files.map((name) => rm(join(MATERIAL_ICONS_ROOT, name))));

    if (!existsSync(MATERIAL_ICONS_SRC)) {
      await mkdir(MATERIAL_ICONS_SRC);
    }
  }

  const collection: Record<IconType, Record<string, string[]>> = {
    filled: {},
    outlined: {},
    rounded: {},
    sharp: {},
    "two-tone": {},
  };

  // [lowerName]: sourceFilePath
  const nameLookup = new Map<string, string>();

  for (const chunk of chunked) {
    await Promise.all(
      chunk.map(async (iconPath) => {
        const sourceFilePath = join(MATERIAL_ICONS_FOLDER, iconPath);

        // the current structure of the material-icons repo is:
        // src/
        //   [category]/
        //     [snake_case_name]/
        //       materialicons[type?]/
        //         24px.svg
        const [_src, category, snakeCaseName, materialIconType] =
          iconPath.split("/");
        const iconType = getIconType(materialIconType);
        const componentName = getComponentName(
          snakeCaseName,
          iconType,
          category
        );
        const svgContents = await getSvgContents(sourceFilePath);

        const contents = format(
          `import { forwardRef } from "react";
  import type { SVGIconProps} from "@react-md/icon";
  import { SVGIcon } from "@react-md/icon";

  export default forwardRef<SVGSVGElement, SVGIconProps>(
  function ${componentName}(props, ref) {
    return <SVGIcon {...props} ref={ref}>${svgContents}</SVGIcon>;
  }
  );
  `,
          "typescript"
        );

        const lowerName = componentName.toLowerCase();
        const existingName = nameLookup.get(lowerName);
        if (existingName) {
          console.error(`Duplicate ${lowerName}...`);
          console.log("existing: ", existingName);
          console.log("sourceFilePath:", sourceFilePath);
          console.log("");
          console.log(
            "update the `getComponentName` to handle this edge case."
          );
          return;
        }
        nameLookup.set(lowerName, sourceFilePath);

        const existing = collection[iconType][category] ?? [];
        collection[iconType][category] = [...existing, componentName];

        const fileName = join(MATERIAL_ICONS_SRC, `${componentName}.tsx`);

        if (SKIP_GENERATE) {
          return;
        }

        if (existsSync(fileName)) {
          console.error(`${fileName} already exists`);
        } else {
          await writeFile(fileName, contents, "utf8");
        }

        await Promise.all([
          transformFile(fileName, {
            jsc: {
              parser: {
                syntax: "typescript",
                tsx: true,
              },
              transform: {
                react: {
                  runtime: "automatic",
                },
              },
            },
          }).then(({ code }) =>
            writeFile(
              join(MATERIAL_ICONS_SRC, "..", `${componentName}.mjs`),
              code
            )
          ),
          writeFile(
            join(MATERIAL_ICONS_ROOT, `${componentName}.d.ts`),
            TYPE_DEFINITION_FILE
          ),
        ]);
      })
    );
  }

  const categories = new Set<string>();
  await Promise.all(
    Object.entries(collection).map(async ([iconType, category]) => {
      await Promise.all(
        Object.entries(category).map(async ([categoryName, components]) => {
          const folder = join(MATERIAL_ICONS_SRC, iconType, categoryName);
          const fileName = join(folder, "index.ts");

          categories.add(categoryName);

          const exportDeclarations = alphaNumericSort(components).reduce(
            (s, component) => {
              return `${s}${
                s ? "\n" : ""
              }export { default as ${component} } from "../../${component}";`;
            },
            ""
          );

          const contents = format(
            `${COPY_BANNER}

  ${exportDeclarations}
  `,
            "typescript"
          );

          if (!existsSync(folder)) {
            await mkdir(folder, { recursive: true });
          }

          await writeFile(fileName, contents);
        })
      );
    })
  );

  const contents = format(
    `${COPY_BANNER}

  export const ICON_TYPES = ["filled", "outlined", "rounded", "two-tone", "sharp"] as const;
  export const ICON_CATEGORIES = ${JSON.stringify([...categories])} as const;

  export type IconType = typeof ICON_TYPES[number];
  export type IconCategory = typeof ICON_CATEGORIES[number];
  `,
    "typescript"
  );

  await writeFile(
    join(process.cwd(), "src", "constants", "materialIcons.ts"),
    contents
  );
}

run();
