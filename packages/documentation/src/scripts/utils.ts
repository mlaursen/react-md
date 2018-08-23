import * as _ from "lodash";

export function toPascalCase(s: string) {
  return _.upperFirst(s)
    .split("-")
    .map(part => _.upperFirst(part))
    .join("");
}
