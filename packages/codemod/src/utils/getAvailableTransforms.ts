import { globSync } from "glob";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { COMPARE_ALPHA_NUMERIC } from "./sort.js";

export interface AvailableTransforms {
  transformNames: ReadonlyMap<string, string>;
  availableTransforms: ReadonlySet<string>;
  versionedTransforms: ReadonlyMap<string, ReadonlySet<string>>;
  getValidTransformFile: (transformName: string) => string;
}

export function getAvailableTransforms(baseUrl: string): AvailableTransforms {
  const transformsDir = join(dirname(fileURLToPath(baseUrl)), "transforms");
  const transformFiles = globSync("**/*.js", {
    cwd: transformsDir,
    ignore: [
      "utils/**",
      "v5-to-v6/*/constants.js",
      "v5-to-v6/coreExportMap.js",
      "v5-to-v6/scssVariables.js",
      "v5-to-v6/form/utils/**",
      "v5-to-v6/preset.js",
    ],
  });

  const sortedTransformFiles = [...transformFiles];
  sortedTransformFiles.sort((a, b) => {
    const [aVersion, aTransform] = a.split("/");
    const [bVersion, bTransform] = b.split("/");
    if (aVersion !== bVersion) {
      return -1 * COMPARE_ALPHA_NUMERIC(a, b);
    }

    if (aTransform?.includes("preset")) {
      return -1;
    }
    if (bTransform?.includes("preset")) {
      return 1;
    }

    if (aTransform?.includes("prerequisites")) {
      return -1;
    }
    if (bTransform?.includes("prerequisites")) {
      return 1;
    }
    if (aTransform?.includes("post-optimizations")) {
      return -1;
    }
    if (bTransform?.includes("post-optimizations")) {
      return 1;
    }
    if (a.endsWith("all.js")) {
      return -1;
    }
    if (b.endsWith("all.js")) {
      return -1;
    }

    return COMPARE_ALPHA_NUMERIC(a, b);
  });
  const availableTransforms = new Set(sortedTransformFiles);
  const versionedTransforms = new Map<string, Set<string>>();
  const transformNames = new Map<string, string>();
  availableTransforms.forEach((transformPath) => {
    const transformName = transformPath.replace(/\.js$/, "");
    transformNames.set(transformName, join(transformsDir, transformPath));

    const [version, ...remaining] = transformName.split("/");
    const transforms = versionedTransforms.get(version) || new Set<string>();
    transforms.add(remaining.join("/"));
    versionedTransforms.set(version, transforms);
  });

  return {
    transformNames,
    availableTransforms,
    versionedTransforms,
    getValidTransformFile: (transformName) => {
      const transformFile = transformNames.get(transformName);
      if (!transformFile) {
        throw new Error(
          'Unable to find transform with name "' + transformName + '"'
        );
      }

      return transformFile;
    },
  };
}
