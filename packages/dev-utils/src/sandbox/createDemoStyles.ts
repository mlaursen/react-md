import { ReferencedDependencies } from "./getAllDependencies";
import { getPackages, format } from "../utils";
import { dist } from "../constants";

export function createDemoStyles(dependenies: ReferencedDependencies): string {
  const styleableRmdPackages = getPackages("scss").map(
    (name) => `@react-md/${name}`
  );
  const rmdPackages = Array.from(dependenies).filter((name) =>
    styleableRmdPackages.includes(name)
  );

  const imports = rmdPackages
    .map((name) => `@import "~${name}/${dist}/mixins";`)
    .join("\n");

  return format(
    `@import "variables";
${imports}

@include react-md-utils;
`,
    "scss"
  );
}
