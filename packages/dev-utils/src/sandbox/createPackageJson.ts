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
    devDependencies: toDependencyJson(DEV_DEPENDENCIES),
    scripts: {
      start: "react-scripts start",
    },
  };

  return { content: packageJson };
}
