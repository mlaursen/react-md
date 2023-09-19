import lodash from "lodash";

export const pascalCase = (s: string): string =>
  lodash.upperFirst(lodash.camelCase(s));
