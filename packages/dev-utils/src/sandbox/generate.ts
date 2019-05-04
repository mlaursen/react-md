import fs from "fs-extra";
import path from "path";

import { documentationRoot, projectRoot } from "../paths";
import { format, glob, list, log } from "../utils";

import {
  ALWAYS_REQUIRED_DEPENDENCIES,
  ALWAYS_REQUIRED_DEV_DEPENDENCIES,
  DEMOS_FOLDER,
  DEMO_INDEX,
  DEMO_INDEX_HTML,
  NON_STYLEABLE_RMD_PACKAGES,
} from "./constants";
import { isSvg } from "./matchers";
import { getFileSource } from "./formatters";

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

import { upperFirst, toTitle } from "utils/toTitle";

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
    const msgStart = \`Unable to find a sandbox import for \\\`\${demoName}\\\`\`;
    let message = msgStart;
    if (typeof window !== "undefined") {
      const { pathname } = window.location;
      const expected = toTitle(pathname.replace(/.+\\/([a-z-]+)\\/.+$/, "$1"));
      if (expected !== packageName) {
        message = \`\${message}.

Got \\\`\${packageName}\\\` as the current package name, but based on the url it
should probably be \\\`\${expected}\\\`. Make sure the \\\`index.tsx\\\` file has the
correct \\\`pakageName\\\` prop set on the \\\`DemosPage\\\` component.\`;
      }
    }

    if (message === msgStart) {
      message = \`\${message} in the \\\`\${packageName}\\\` demo section.\`;
    }

    message = \`$\{message}
Please run the \\\`sandbox\\\` command again in the documentation package to generate the sandbox.\`;

    console.error(message);
    return dummy;
  }

  return sandboxer;
}
`;

  const formatted = format(code, "typescript");
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

function createDemoStyles(dependencies: string[]) {
  const rmd = dependencies.filter(
    name =>
      name.startsWith("@react-md") && !NON_STYLEABLE_RMD_PACKAGES.includes(name)
  );

  const imports = [
    ...rmd,
    ...ALWAYS_REQUIRED_DEPENDENCIES.filter(
      name => !dependencies.includes(name)
    ),
  ]
    .map(name => `@import '${name}/dist/mixins';`)
    .join("\n");

  return `${imports}

@include react-md-utils;
`;
}

export function getSandboxFileName(demoPath: string) {
  return demoPath.replace(".tsx", "Sandbox.json");
}

export default async function generate({
  demoPath,
  demoName,
  dependencies,
  packageName,
  aliases,
  aliased,
}: GenerateSandboxConfig) {
  const sandboxPath = getSandboxFileName(demoPath);
  log("Creaing sandbox at:");
  log(list([sandboxPath]));

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

      if (/\.tsx?$/.test(filePath)) {
        content = getFileSource(content);
      }

      if (!isSvg(filePath)) {
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
