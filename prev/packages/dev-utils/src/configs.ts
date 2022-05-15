import { writeFile, writeJson as fsWriteJson } from "fs-extra";
import { flatMap, merge } from "lodash";
import { join } from "path";

import type { JSONObject, TSConfigType } from "./constants";
import {
  NO_SCRIPT_PACKAGES,
  NO_STYLES_PACKAGES,
  packagesRoot,
} from "./constants";
import { clean, getDependencies, getPackages, glob, format } from "./utils";

const NPM_IGNORE_CONTENTS = `src/**/__tests__
src/**/*.scss
tsconfig.json
tsconfig.*.json
*tsbuildinfo
CHANGELOG.md
`;

const TSCONFIG = {
  extends: "../../tsconfig.base.json",
  compilerOptions: {
    noEmit: true,
    composite: false,
  },
  include: ["src"],
};

const BASE_ESJ_CONFIG = {
  extends: "../../tsconfig.base.json",
  compilerOptions: {
    rootDir: "src",
    outDir: "es",
    declaration: true,
    declarationDir: "types",
  },
  include: ["src"],
  exclude: ["**/__tests__/*", "**/scssVariables.ts"],
};

const BASE_CJS_CONFIG = {
  ...BASE_ESJ_CONFIG,
  compilerOptions: {
    module: "commonjs",
    rootDir: "src",
    outDir: "lib",
  },
};

const SCSS_VARIABLES_CONFIG = {
  extends: "../../tsconfig.base.json",
  compilerOptions: {
    rootDir: "src",
    outDir: "dist",
    declaration: true,
    skipLibCheck: true,
    module: "commonjs",
  },
  include: ["src/scssVariables.ts"],
};

function createTSConfig(
  type: TSConfigType,
  dependencies: string[]
): JSONObject {
  if (type === "var") {
    return SCSS_VARIABLES_CONFIG;
  }

  const config = type === "ejs" ? BASE_ESJ_CONFIG : BASE_CJS_CONFIG;

  if (!dependencies.length) {
    return config;
  }

  return merge({}, config, {
    compilerOptions: {
      baseUrl: ".",
      paths: {
        "@react-md/*": ["../*"],
      },
    },
    references: dependencies.map((name) => ({
      path: `../${name.substring(name.indexOf("/") + 1)}/tsconfig.${type}.json`,
    })),
  });
}

async function writeJson(filePath: string, json: JSONObject): Promise<void> {
  return fsWriteJson(filePath, json, { spaces: 2 });
}

async function writeRoot(type: TSConfigType): Promise<void> {
  const configs = await glob(`packages/*/tsconfig.${type}.json`);
  const references = configs.map((path) => ({
    path: `./packages/${path.substring(
      path.indexOf("/") + 1,
      path.lastIndexOf("/")
    )}/tsconfig.${type}.json`,
  }));

  return writeJson(`tsconfig.${type}.json`, { files: [], references });
}

export async function configs(): Promise<void> {
  const packages = getPackages(true);
  const existingConfigs = await glob(
    `packages/!(dev-utils|documentation)/tsconfig.@(ejs|cjs|var).json`
  );
  await clean(existingConfigs);

  await Promise.all(
    flatMap(packages, async (name) => {
      const dependencies = await getDependencies(name);
      const rmdTsDependencies = dependencies.filter(
        (name) => name.startsWith("@react-md") && !NO_SCRIPT_PACKAGES.test(name)
      );

      const path = join(packagesRoot, name);
      const promises: Promise<void>[] = [];
      if (!NO_STYLES_PACKAGES.test(name) && name !== "react-md") {
        const varConfig = createTSConfig("var", []);
        promises.push(
          writeFile(
            join(path, "tsconfig.var.json"),
            format(JSON.stringify(varConfig))
          )
        );
      }

      if (!NO_SCRIPT_PACKAGES.test(name)) {
        const ejsConfig = createTSConfig("ejs", rmdTsDependencies);
        const cjsConfig = createTSConfig("cjs", rmdTsDependencies);
        promises.push(
          writeFile(
            join(path, "tsconfig.json"),
            format(JSON.stringify(TSCONFIG))
          ),
          writeFile(
            join(path, "tsconfig.ejs.json"),
            format(JSON.stringify(ejsConfig))
          ),
          writeFile(
            join(path, "tsconfig.cjs.json"),
            format(JSON.stringify(cjsConfig))
          ),
          writeFile(join(path, ".npmignore"), NPM_IGNORE_CONTENTS)
        );
      }

      return promises;
    })
  );
  await Promise.all([writeRoot("ejs"), writeRoot("cjs"), writeRoot("var")]);
}
