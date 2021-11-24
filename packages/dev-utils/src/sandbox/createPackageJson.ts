import { JSONObject } from "../constants";
import { toId } from "../utils";
import { DEV_DEPENDENCIES, FORM_PARTS } from "./constants";
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

const SIMPLE_AT_TYPES = ["qs", "react-virtualized"];

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

interface CreatePackageJsonOptions {
  demoTitle: string;
  formPart: typeof FORM_PARTS[number] | undefined;
  packageName: string;
  dependencies: ReferencedDependencies;
  fullDemoTitle: string;
}

export function createPackageJson({
  demoTitle,
  formPart,
  packageName,
  dependencies,
  fullDemoTitle,
}: CreatePackageJsonOptions): JSONObject {
  const allDeps = Array.from(dependencies);
  let demoPrefix = `${toId(packageName)}/demos`;
  if (formPart) {
    demoPrefix = demoPrefix.replace("/demos", `/${toId(formPart)}-demos`);
  }

  const demoId = toId(demoTitle);
  const packageDemoUrl = `https://react-md.dev/packages/${demoPrefix}#${demoId}`;

  const packageJson: JSONObject = {
    title: fullDemoTitle,
    description: `Example from ${packageDemoUrl}`,
    main: "src/index.tsx",
    dependencies: toDependencyJson(allDeps),
    devDependencies: toDevDependencyJson(allDeps, DEV_DEPENDENCIES),
    scripts: {
      start: "react-scripts start",
    },
  };

  return { content: packageJson };
}
