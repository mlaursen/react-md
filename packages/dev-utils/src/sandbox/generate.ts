import fs from "fs-extra";
import log from "loglevel";
import path from "path";

import { dist, documentationRoot, projectRoot } from "../constants";
import format from "../utils/format";
import glob from "../utils/glob";
import list from "../utils/list";
import {
  ALWAYS_REQUIRED_DEPENDENCIES,
  ALWAYS_REQUIRED_DEV_DEPENDENCIES,
  DEMO_INDEX,
  DEMO_INDEX_HTML,
  NON_STYLEABLE_RMD_PACKAGES,
  SANDBOXES_FILE,
  SANDBOXES_PATH,
  VARIABLES_SCSS_FILE,
  PHONE_INDEX_FILE,
} from "./constants";
import { isSvg } from "./matchers";

function toUrlId(s: string): string {
  return s
    .split(/(?=[A-Z][a-z])/)
    .map((s) => s.toLowerCase())
    .join("-")
    .replace(/\..+$/, "");
}

function toTitle(s: string): string {
  return s
    .split(/(?=[A-Z][a-z])/)
    .join(" ")
    .replace(/\..+$/, "");
}

function toDependencyJson(dependencies: string[]): Record<string, string> {
  const filtered = dependencies.filter((n) => !n.startsWith(path.sep));
  filtered.sort();

  return filtered.reduce(
    (json, dependency) => ({
      ...json,
      [dependency]: dependency.startsWith("@react-md")
        ? "{{RMD_VERSION}}"
        : "latest",
    }),
    {}
  );
}

export async function findGeneratedSandboxes(): Promise<string[]> {
  const newSandboxes = await glob(`${SANDBOXES_PATH}/**/*.json`);
  const oldSandboxes = await glob("components/Demos/**/*Sandbox.json");
  return [...newSandboxes, ...oldSandboxes];
}

export async function createSandboxesLookup(): Promise<void> {
  log.info("Generating the main sandbox lookup file...");
  const sandboxes = await findGeneratedSandboxes();
  log.debug("Found the following sandboxes to add:");
  log.debug(list(sandboxes));
  log.debug();

  const packages = new Set<string>();
  const lookups = sandboxes.reduce((lookups, pathname) => {
    const [pkg, fileName] = pathname
      .substring(pathname.lastIndexOf("/") + 1)
      .split("-");

    packages.add(`"${pkg}"`);
    lookups[pkg] = lookups[pkg] || {};
    lookups[pkg][
      fileName.replace(".json", "")
    ] = `() => resolve(import('./${pkg}-${fileName}'))`;

    return lookups;
  }, {});

  const stringified = JSON.stringify(lookups, null, 2).replace(
    /"(\(.+)"/g,
    "$1"
  );

  const code = SANDBOXES_FILE.replace(
    "{{SANDBOXES_JSON}}",
    stringified
  ).replace("{{PACKAGE_UNION}}", Array.from(packages).join(" | "));

  const formatted = format(code, "typescript");
  await fs.ensureDir(SANDBOXES_PATH);
  await fs.writeFile(path.join(SANDBOXES_PATH, "index.ts"), formatted);
}

interface GenerateSandboxConfig {
  aliased: string[];
  aliases: string[];
  dependencies: string[];
  demoPath: string;
  demoName: string;
  packageName: string;
}

function createDemoStyles(dependencies: string[]): string {
  const rmd = dependencies.filter(
    (name) =>
      name.startsWith("@react-md") && !NON_STYLEABLE_RMD_PACKAGES.includes(name)
  );

  const imports = [
    ...rmd,
    ...ALWAYS_REQUIRED_DEPENDENCIES.filter(
      (name) => !dependencies.includes(name)
    ),
  ].map((name) => `@import "~${name}/${dist}/mixins";`);
  imports.sort();

  return format(
    `@import "variables";
${imports.join("\n")}

@include react-md-utils;
`,
    "scss"
  );
}

export function getSandboxFileName(demoPath: string): string {
  let fileName = "";
  const i = demoPath.indexOf(`${path.sep}.${path.sep}`);
  if (i !== -1) {
    fileName = `${demoPath.substring(0, i)}.json`;
  } else {
    fileName = demoPath.replace(/\.tsx$/, ".json");
  }

  const [name, pkg] = fileName.split(path.sep).reverse();
  return `${SANDBOXES_PATH}/${pkg}-${name}`;
}

export default async function generate({
  demoPath,
  demoName,
  dependencies,
  packageName,
  aliases,
  aliased,
}: GenerateSandboxConfig): Promise<void> {
  const sandboxPath = getSandboxFileName(demoPath);
  log.debug("Creating sandbox at:");
  log.debug(list([sandboxPath]));
  log.debug();

  const homepage = (await fs.readJson(path.join(projectRoot, "package.json")))
    .homepage as string;
  const demoTitle = `${packageName} Example - ${toTitle(demoName)}`;
  const packageDependencies = Array.from(
    new Set([
      ...dependencies,
      ...ALWAYS_REQUIRED_DEPENDENCIES,
      "react",
      "react-dom",
    ])
  );

  const packageJson = {
    title: demoTitle,
    description: `Example from ${homepage}/packages/${toUrlId(
      packageName
    )}/demos#${toUrlId(demoName)}`,
    main: "src/index.tsx",
    dependencies: toDependencyJson(packageDependencies),
    devDependencies: toDependencyJson(ALWAYS_REQUIRED_DEV_DEPENDENCIES),
    scripts: {
      start: "react-scripts start",
    },
  };

  const aliasRegExp = new RegExp(
    `"(${aliases.join("|").replace(/src\//g, "")}).*/(?=[A-z]+(.[a-z]+)?")`,
    "g"
  );

  const baseFiles = {
    "public/index.html": {
      content: DEMO_INDEX_HTML.replace("{{DEMO_TITLE}}", demoTitle),
      isBinary: false,
    },
    "src/index.tsx": {
      content: DEMO_INDEX,
      isBinary: false,
    },
    "src/styles.scss": {
      content: createDemoStyles(dependencies),
      isBinary: false,
    },
    "src/_variables.scss": {
      content: VARIABLES_SCSS_FILE,
      isBinary: false,
    },
    "package.json": {
      content: packageJson,
      isBinary: false,
    },
  };

  if (
    aliased.find((path) => path.includes("/Phone/")) &&
    !aliased.find((path) => path.includes("Phone/index.ts"))
  ) {
    baseFiles["src/Phone/index.ts"] = {
      content: PHONE_INDEX_FILE,
      isBinary: false,
    };
  }

  const files = (
    await Promise.all(
      [demoPath, ...aliased].map(async (filePath) => {
        let pathname = filePath;
        if (filePath === demoPath) {
          pathname = "Demo.tsx";
        } else if (pathname.includes("Demos")) {
          pathname = filePath.substring(filePath.lastIndexOf("/") + 1);
        } else {
          const regexp = new RegExp(`^(${aliases.join("|")})${path.sep}`);
          pathname = filePath.replace(regexp, "");
        }

        const fileName = `src/${pathname}`;

        let content = await fs.readFile(
          path.join(documentationRoot, filePath),
          "utf8"
        );

        if (!isSvg(filePath)) {
          const parentFolders = pathname.split("/").length;
          let aliasReplacement = "./";
          if (parentFolders > 1) {
            aliasReplacement = Array.from(
              { length: parentFolders - 1 },
              () => "../"
            ).join("");
          }

          content = format(
            content
              .replace(/^import Code(Block)?.+;$/gm, "")
              .replace(/<CodeBlock[^>]*>/g, "<pre><code>")
              .replace(/<\/CodeBlock>/g, "</code></pre>")
              .replace(/<(\/)?Code/g, "<$1code")
              .replace(aliasRegExp, `"${aliasReplacement}`),
            filePath.endsWith(".scss") ? "scss" : "typescript"
          );
        }

        if (demoPath === filePath) {
          const name = demoName.replace(".tsx", "");
          content = content
            .replace(`${name}: FC`, "Demo: FC")
            .replace(`default ${name};`, "default Demo;");
        }

        return {
          [fileName]: {
            content,
            isBinary: false,
          },
        };
      })
    )
  ).reduce((json, value) => {
    const key = Object.keys(value)[0];
    if (json[key]) {
      log.error(
        "Sandbox rules need to be updated. Found multiple files with the same name."
      );
      log.error("Current file path: ", demoPath);
      log.error("Current file name: ", key);
      log.error("Current files:");
      log.error(list(Object.keys(json)));
      log.error();
      process.exit(1);
    }

    return { ...json, ...value };
  }, baseFiles);

  await fs.writeJson(sandboxPath, files, { spaces: 2 });
}
