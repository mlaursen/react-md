import { readFile, writeFile } from "fs-extra";
import log from "loglevel";
import { join } from "path";

import {
  COPY_BANNER,
  documentationRoot,
  NO_SCRIPT_PACKAGES,
  NO_STYLES_PACKAGES,
  packagesRoot,
  projectRoot,
  src,
} from "./constants";
import { markdown } from "./markdown";
import { copyFilesWithBanner, format, getPackages, list } from "./utils";

const REPLACE_TOKEN = "<!-- rmd-readme-replace -->";

const REPLACEMENT = `## Installation

react-md has been updated to use
[scoped packages](https://react-md.dev/guides/scoped-packages) starting with the
v2 release to help slowly transition to the new components and API. If you do
not need to slowly transition over this package can be used instead which is a
convenience package for exporting all the functionality from a single entry
point.

\`\`\`sh
npm install --save react-md
\`\`\`

or with \`yarn\`:

\`\`\`sh
yarn add react-md
\`\`\`

For convenience, here is a list of all the included react-md scoped packages and
a link to their demo documentation page:

#packages
`;

const toDocumentationLink = (name: string): string =>
  `[@react-md/${name}](https://react-md.dev/packages/${name}/demos)`;

async function sharedUtilsAndTypes(): Promise<void> {
  log.info("Copying shared utils and types...");
  const devUtilsSrc = join(packagesRoot, "dev-utils", src);
  const indexerTypes = join(devUtilsSrc, "indexer", "types.ts");
  const docTypesPath = join(
    documentationRoot,
    src,
    "constants",
    "meta",
    "types.ts"
  );
  const titleUtils = join(devUtilsSrc, "utils", "titles.ts");
  const docToTitle = join(documentationRoot, src, "utils", "toTitle.ts");

  await copyFilesWithBanner([
    { src: indexerTypes, dest: docTypesPath },
    { src: titleUtils, dest: docToTitle },
  ]);
}

async function rmdReadme(): Promise<void> {
  log.info("Updating the main `react-md` package's README.md...");
  const rootReadme = await readFile(join(projectRoot, "README.md"), "utf8");
  if (!rootReadme.includes(REPLACE_TOKEN)) {
    throw new Error("Unable to find the replace token in the root README.md");
  }

  const packageLinks = list(getPackages().map(toDocumentationLink));
  const readmeMarkdown = rootReadme
    .replace(
      "(./examples)",
      "(https://github.com/mlaursen/react-md/tree/master/examples)"
    )
    .replace(REPLACE_TOKEN, REPLACEMENT)
    .replace("#packages", packageLinks);

  const readmePath = join(packagesRoot, "react-md", "README.md");
  await writeFile(readmePath, format(readmeMarkdown, "markdown"));
}

async function allPackages(): Promise<void> {
  const constantsPath = join(
    documentationRoot,
    src,
    "constants",
    "packages.ts"
  );

  const contents = `
${COPY_BANNER}

export const PACKAGE_NAMES = ${JSON.stringify(getPackages())};

export const TYPESCRIPT_PACKAGES = PACKAGE_NAMES.filter(
  name => !${NO_SCRIPT_PACKAGES}.test(name)
);

export const SCSS_PACKAGES = PACKAGE_NAMES.filter(
  name => !${NO_STYLES_PACKAGES}.test(name)
);
`;

  await writeFile(constantsPath, format(contents, "typescript"));
}

const CUSTOM_START_TOKEN = "// copy-start";

async function sharedSassdoc(): Promise<void> {
  const devUtilsRoot = join(packagesRoot, "dev-utils");
  const devUtilsSrc = join(devUtilsRoot, src);
  const documentationSrc = join(documentationRoot, src);
  const sassdocDef = await readFile(
    join(devUtilsRoot, "@types", "sassdoc.d.ts"),
    "utf8"
  );
  const customDef = await readFile(
    join(devUtilsSrc, "utils", "styles", "helpers.ts"),
    "utf8"
  );

  const sassdocLines = sassdocDef.split(/\r?\n/);
  const sassdocStart = sassdocLines.findIndex((line) =>
    line.startsWith("declare module")
  );
  const sassdocEnd = sassdocLines.findIndex((line) =>
    line.startsWith("  export interface ParseOptions")
  );
  const sassdocTypes = sassdocLines
    .slice(sassdocStart + 1, sassdocEnd)
    .join("\n");

  const customLines = customDef.split(/\r?\n/);
  const customStart = customLines.findIndex((line) =>
    line.startsWith(CUSTOM_START_TOKEN)
  );
  const customContent = customLines.slice(customStart + 1).join("\n");

  const contents = format(
    `${COPY_BANNER}${sassdocTypes}${customContent}`,
    "typescript"
  );

  await writeFile(join(documentationSrc, "utils", "sassdoc.ts"), contents);
}

/**
 * Copies shared code from the dev-utils package to the documentation site.
 */
export async function shared(clean: boolean = false): Promise<void> {
  await Promise.all([
    markdown(clean),
    sharedUtilsAndTypes(),
    rmdReadme(),
    sharedSassdoc(),
    allPackages(),
  ]);
}
