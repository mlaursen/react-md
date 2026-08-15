import { writeFile } from "node:fs/promises";
import { join, resolve } from "node:path";

import { glob } from "glob";
import { format } from "oxfmt";

import { alphaNumericSort } from "../src/utils/alphaNumericSort.js";
import {
  GENERATED_FILE_BANNER,
  PRIVATE_FILES,
  SYNCED_EXPORTS,
} from "./constants.js";

const write = async (filePath: string, contents: string): Promise<void> => {
  const formatted = await format(
    filePath,
    `${GENERATED_FILE_BANNER}

${contents}
`,
  );
  await writeFile(filePath, formatted.code);
  console.log(
    `Wrote ${filePath.replace(resolve("../react-md"), "packages/react-md")}`,
  );
};

const coreSrc = join(process.cwd(), "src");
const filesForBarrelFile = await glob("**/*.{ts,tsx}", {
  cwd: coreSrc,
  ignore: ["**/__tests__/**", "**/test-utils/**", ...PRIVATE_FILES],
});

const barrelFileContents = alphaNumericSort(filesForBarrelFile)
  .map(
    (name) => `export * from "@react-md/core/${name.replace(/\.tsx?$/, "")}"`,
  )
  .join(";\n");
const indexFileName = resolve("../react-md/src/index.ts");
const configureMaterialSymbols = resolve(
  "../react-md/src/configureMaterialSymbols.ts",
);
await Promise.all([
  write(indexFileName, barrelFileContents),
  ...SYNCED_EXPORTS.map((exportName) => {
    let prefix = "export * from";
    if (exportName === "test-utils/data-testid") {
      prefix = "import";
    }

    write(
      resolve(`../react-md/src/${exportName}.ts`),
      `${prefix} "@react-md/core/${exportName}"`,
    );
  }),
  write(
    configureMaterialSymbols,
    'import "@react-md/core/icon/configureMaterialSymbols"',
  ),
]);

const packageJsonPath = resolve("../react-md/package.json");
const { default: packageJson } = await import(packageJsonPath, {
  with: { type: "json" },
});

packageJson.exports = {
  "./a11y": {
    sass: "./dist/_a11y.scss",
  },
  "./colors": {
    sass: "./dist/_colors.scss",
  },
  "./configureMaterialSymbols": "./dist/configureMaterialSymbols.js",
  "./test-utils": "./dist/test-utils.js",
  "./test-utils/*": "./dist/test-utils/*.js",
  ".": {
    sass: "./dist/_react-md.scss",
    types: "./dist/index.d.ts",
    default: "./dist/index.js",
  },
  "./package.json": "./package.json",
};
const formatted = await format(packageJsonPath, JSON.stringify(packageJson));

await writeFile(packageJsonPath, formatted.code);
