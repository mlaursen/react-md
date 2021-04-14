import { JSONObject } from "../constants";
import { toId } from "../utils";
import { DEV_DEPENDENCIES } from "./constants";
import { ReferencedDependencies } from "./getAllDependencies";

function toDependencyJson(
  dependencies: readonly string[]
): Record<string, string> {
  const sorted = Array.from(dependencies).sort();

  return sorted.reduce(
    (json, dep) => ({
      ...json,
      [dep]: "latest",
    }),
    {}
  );
}

const SIMPLE_AT_TYPES = [
  "qs",
  "react-router",
  "react-router-dom",
  "react-transition-group",
  "react-virtualized",
];

function getTypesPackage(packageName: string): string | null {
  if (SIMPLE_AT_TYPES.includes(packageName)) {
    return `@types/${packageName}`;
  }

  return null;
}

function toDevDependencyJson(
  dependencies: readonly string[],
  devDependencies: readonly string[]
): Record<string, string> {
  const deps = [...devDependencies];
  dependencies.forEach((depName) => {
    const types = getTypesPackage(depName);
    if (types) {
      deps.push(types);
    }
  });

  return toDependencyJson(deps);
}

export function createPackageJson(
  demoTitle: string,
  fullDemoTitle: string,
  packageName: string,
  dependencies: ReferencedDependencies
): JSONObject {
  const allDeps = Array.from(dependencies);

  const packageJson: JSONObject = {
    title: fullDemoTitle,
    description: `Example from https://react-md.dev/packages/${toId(
      packageName
    )}/demos#${toId(demoTitle)}`,
    main: "src/index.tsx",
    dependencies: toDependencyJson(allDeps),
    devDependencies: toDevDependencyJson(allDeps, DEV_DEPENDENCIES),
    scripts: {
      start: "react-scripts start",
    },
  };

  return { content: packageJson };
}
