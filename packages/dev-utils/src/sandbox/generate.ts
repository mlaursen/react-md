import fs from "fs-extra";
import path from "path";
import { documentationRoot, projectRoot } from "../paths.js";
import { isSvg } from "./matchers.js";
import { DEMO_INDEX_HTML, DEMO_INDEX, DEMOS_FOLDER } from "./constants.js";
import { log, list, glob, format } from "../utils.js";

function toUrlId(s: string) {
  return s
    .split(/(?=[A-Z][a-z])/)
    .map(s => s.toLowerCase())
    .join("-")
    .replace(/\..+$/, "");
}

function toTitle(s: string) {
  return s
    .split(/(?=[A-Z][a-z])/)
    .join(" ")
    .replace(/\..+$/, "");
}

function toDependencyJson(dependencies: string[]) {
  return dependencies.reduce(
    (json, dependency) => ({
      ...json,
      [dependency]: dependency.startsWith("@react-md") ? "next" : "latest",
    }),
    {}
  );
}

export async function createSandboxesLookup() {
  log("Generating the main sandbox lookup file...");
  const sandboxes = await glob(`${DEMOS_FOLDER}/*/*Sandbox.json`);
  log("Found the following sandboxes to add:");
  log(list(sandboxes));
  log();

  const lookups = sandboxes.reduce((collected, sandboxPath) => {
    const [fileName, packageName] = sandboxPath.split("/").reverse();
    const demoName = fileName.replace("Sandbox.json", "");
    const key = `${packageName}/${demoName}`;
    collected[key] = `() => resolve(import('./${packageName}/${fileName}'))`;

    return collected;
  }, {});

  const stringified = JSON.stringify(lookups, null, 2).replace(
    /"(\(.+)"/g,
    "$1"
  );

  const code = `/** this is a generated file from \`dev-utils sandbox\` */
import { IFiles } from "codesandbox-import-utils/lib/api/define";

import { upperFirst } from "utils/toTitle";

interface SandboxesRecord {
  [key: string]: () => Promise<IFiles>;
}

const resolve = (importer: Promise<any>) => importer.then(content => content.default as IFiles);

const sandboxes: SandboxesRecord = ${stringified};

const dummy = () => Promise.resolve<IFiles>({
  "package.json": {
    isBinary: false,
    content: JSON.stringify({
      dependencies: {
        react: "latest",
        "react-dom": "latest",
      },
    }),
  },
  "src/index.tsx": { content: "", isBinary: false },
  "src/Demo.tsx": { content: "", isBinary: false },
});

export default function getSandboxer(packageName: string, demoName: string) {
  packageName = packageName.replace(/ /g, "");
  demoName = demoName.split(" ").map(upperFirst).join("");
  const sandboxer = sandboxes[\`\${packageName}/\${demoName}\`];
  if (!sandboxer) {
    console.error("Unable to find a sandbox import for the following package and demo name");
    console.error("packageName: ", packageName);
    console.error("demoName: ", demoName);
    return dummy;
  }

  return sandboxer;
}
`;

  const formatted = await format(
    code,
    path.join(documentationRoot, "pages", "index.ts"),
    "typescript"
  );

  await fs.writeFile(path.join(DEMOS_FOLDER, "sandboxes.ts"), formatted);
}

interface GenerateSandboxConfig {
  aliased: string[];
  aliases: string[];
  dependencies: string[];
  demoPath: string;
  demoName: string;
  packageName: string;
}

const alwaysRequired = [
  "@react-md/states",
  "@react-md/theme",
  "@react-md/typography",
  "@react-md/utils",
];

const devDependencies = [
  "react-scripts",
  "node-sass",
  "typescript",
  "@types/node",
  "@types/react",
  "@types/react-dom",
  "@types/jest",
];

const nonStyleable = [
  "@react-md/elevation",
  "@react-md/portal",
  "@react-md/material-icons",
  "@react-md/wia-aria",
];

function createDemoStyles(dependencies: string[]) {
  const rmd = dependencies.filter(
    name => name.startsWith("@react-md") && !nonStyleable.includes(name)
  );

  const imports = [
    ...rmd,
    ...alwaysRequired.filter(name => !dependencies.includes(name)),
  ]
    .map(name => `@import '${name}/dist/mixins';`)
    .join("\n");

  return `${imports};

@include react-md-utils;
`;
}

export default async function generate({
  demoPath,
  demoName,
  dependencies,
  packageName,
  aliases,
  aliased,
}: GenerateSandboxConfig) {
  const sandboxPath = demoPath.replace(".tsx", "Sandbox.json");
  log("Creaing sandbox at:");
  log(list([sandboxPath]));

  const homepage = (await fs.readJson(path.join(projectRoot, "package.json")))
    .homepage as string;
  const demoTitle = `${packageName} Example - ${toTitle(demoName)}`;
  const packageDependencies = Array.from(
    new Set([...dependencies, ...alwaysRequired, "react", "react-dom"])
  );

  const packageJson = {
    title: demoTitle,
    description: `Example from ${homepage}/packages/${toUrlId(
      packageName
    )}/demos#${toUrlId(demoName)}`,
    main: "src/index.tsx",
    dependencies: toDependencyJson(packageDependencies),
    devDependencies: toDependencyJson(devDependencies),
    scripts: {
      start: "react-scripts start",
    },
  };

  const aliasRegExp = new RegExp(
    `(${aliases.join("|")}).*\/(?=[A-z]+(\.[a-z]+)?")`,
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
    "package.json": {
      content: packageJson,
      isBinary: false,
    },
    ".env": {
      content: "SASS_PATH=node_modules:src",
      isBinary: false,
    },
  };

  const files = (await Promise.all(
    [demoPath, ...aliased].map(async filePath => {
      const fileName = `src/${
        filePath === demoPath
          ? "Demo.tsx"
          : filePath.substring(filePath.lastIndexOf("/") + 1)
      }`;

      let content = await fs.readFile(
        path.join(documentationRoot, filePath),
        "utf8"
      );
      if (!isSvg(content)) {
        content = content.replace(aliasRegExp, "./");
      }

      return {
        [fileName]: {
          content,
          isBinary: false,
        },
      };
    })
  )).reduce((json, value) => {
    const key = Object.keys(value)[0];
    if (json[key]) {
      console.error(
        "Sandbox rules need to be updated. Found multiple files with the same name."
      );
      console.error("Current file path: ", demoPath);
      console.error();
      process.exit(1);
    }

    return { ...json, ...value };
  }, baseFiles);

  await fs.writeJson(sandboxPath, files, { spaces: 2 });
}
