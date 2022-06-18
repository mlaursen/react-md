// import { camelCase, upperFirst } from "lodash";

// export const pascalCase = (s: string): string => upperFirst(camelCase(s));
import lodash from "lodash";

export const pascalCase = (s: string): string =>
  lodash.upperFirst(lodash.camelCase(s));
