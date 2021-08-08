import { existsSync, readFileSync, writeFileSync } from "fs";
import { ensureDirSync } from "fs-extra";
import { difference } from "lodash";
import log from "loglevel";
import { join, sep } from "path";

import {
  everythingScss,
  packagesRoot,
  reactMdDist,
  src,
} from "../../constants";
import { format } from "../format";
import { getPackages } from "../packages";

const getFileOrder = (packageName: string): readonly string[] => {
  switch (packageName) {
    case "theme":
      return [
        "color-palette",
        "color-a11y",
        "variables",
        "helpers",
        "functions",
        "mixins",
      ];
    case "icon":
      return ["variables", "functions", "mixins", "material-icons"];
    case "media":
    case "transition":
      return ["variables", "mixins"];
    case "form":
      return [
        join("label", "variables"),
        join("text-field", "variables"),
        join("select", "variables"),
        join("toggle", "variables"),
        join("slider", "variables"),
        "variables",
        "functions",
        join("slider", "functions"),
        join("file-input", "mixins"),
        join("label", "mixins"),
        join("toggle", "mixins"),
        join("slider", "mixins"),
        join("text-field", "mixins"),
        join("select", "mixins"),
        "mixins",
      ];
    default:
      return ["variables", "functions", "mixins"];
  }
};

const IMPORT_STATEMENT_REGEXP = /^.+('|")(.+)('|");(.*)$/;

const PACKAGE_ORDER = [
  "utils",
  "theme",
  "transition",
  "typography",
  "elevation",
  "divider",
  "media",
  "icon",
  "states",
  "overlay",
  "tooltip",
  "avatar",
  "button",
  "alert",
  "app-bar",
  "badge",
  "card",
  "chip",
  "link",
  "list",
  "expansion-panel",
  "dialog",
  "sheet",
  "menu",
  "progress",
  "tree",
  "table",
  "tabs",
  "form",
  "layout",
];

function assertAllPackages(): void {
  const packages = getPackages("scss");
  const diff = difference(packages, PACKAGE_ORDER);
  if (diff.length) {
    process.exit(1);
  }
}

const imported: Record<string, boolean> = {};

export function combineAllFiles(): void {
  assertAllPackages();
  const uses = new Set<string>();
  const files: string[] = [];
  PACKAGE_ORDER.forEach((packageName) => {
    getFileOrder(packageName).forEach((fileName) => {
      const packageRoot = join(packagesRoot, packageName, src);
      if (fileName.includes(sep)) {
        fileName = fileName.replace(sep, `${sep}_`);
      } else {
        fileName = `_${fileName}`;
      }
      const filePath = join(packageRoot, `${fileName}.scss`);

      imported[filePath] = true;
      if (!existsSync(filePath)) {
        log.error(`${filePath} does not exist`);
        process.exit(1);
      }

      const contents = readFileSync(filePath, "utf8");

      const fileUses = contents.match(/^@use "(.+)";/gm);
      const imports = contents.match(/^@import.+$/gm);
      files.push(
        contents
          // remove import and use statements
          .replace(/^@(use|import).+$/gm, "")
          // remove all comments
          .replace(/^\s*\/\/.+$/gm, "")
      );

      if (fileUses) {
        fileUses.forEach((use) => {
          uses.add(use);
        });
      }

      if (imports) {
        imports.forEach((imp) => {
          let importName = imp.replace(IMPORT_STATEMENT_REGEXP, "$2.scss");
          if (importName.startsWith("./")) {
            importName = join(packageRoot, importName);
          } else if (importName.startsWith("../")) {
            const [folder] = fileName.split(sep);
            importName = join(packageRoot, folder, importName);
          }

          importName = importName
            .replace(/\/([a-z0-9-]+\.scss)/, "/_$1")
            .replace(
              /~@react-md\/([a-z-]+)\/dist/,
              join(packagesRoot, "$1", src)
            );

          if (!imported[importName]) {
            log.error(`imp: "${imp}"`);
            log.error(`${importName} needs to be imported before ${filePath}`);
            const sorted = Object.keys(imported)
              .map((name) => name.replace(packagesRoot, ""))
              .sort();
            log.error(JSON.stringify(sorted, null, 2));
            process.exit(1);
          }
        });
      }
    });
  });

  const contents = `${Array.from(uses).join("\n")}

${files.join("\n")}
`;
  const formatted = format(contents, "scss")
    // remove extra spaces between variables after comments were removed
    .replace(/(\r?\n)+\$/g, "\n$");

  ensureDirSync(reactMdDist);
  writeFileSync(everythingScss, formatted);
}

let cachedColorVariables = "";

export function getColorVariables(): string {
  if (!cachedColorVariables) {
    cachedColorVariables = readFileSync(
      join(packagesRoot, "theme", "src", "_color-palette.scss"),
      "utf8"
    );
  }

  return cachedColorVariables;
}

let cachedEverythingScss = "";

/**
 * Lazy loads the `packages/react-md/dist/_everything.scss` file contents which
 * should be used in all the `renderSync` `data` calls to increase build
 * performance.
 */
export function getEverythingScss(): string {
  if (!cachedEverythingScss) {
    cachedEverythingScss = readFileSync(everythingScss, "utf8");
  }

  return cachedEverythingScss;
}
