import log from "loglevel";
import { join } from "path";

import { packagesRoot, scssVariables, src } from "./constants";
import { isVariableItem } from "./sassdoc-custom";
import copyStyles from "./utils/copyStyles";
import format from "./utils/format";
import getCompiledScssVariable, {
  CompiledScssValue,
  isPrimitive,
} from "./utils/getCompiledScssVariable";
import getSassdoc from "./utils/getSassdoc";
import { JSONObject, JSONValue } from "./utils/json";
import { cleanTempStyles } from "./utils/moveToTempStyles";
import writeFile from "./utils/writeFile";

function toJSONValue(value: CompiledScssValue): JSONValue {
  if (isPrimitive(value)) {
    return value;
  }

  return value.reduce<JSONObject>((obj, variable) => {
    obj[variable.name] = toJSONValue(variable.value);
    return obj;
  }, {});
}

type PackageVariables = Record<string, JSONObject>;

/**
 * Creates the `src/scssVariables.ts` in each package that has a
 * `_variables.scss` file.
 *
 * @param noCopy Boolean if the styles should be copied to the dist folder. This
 * should normally left as the default value of `false` since the styles are
 * required for creating scss variables, but can be set to `true` to be a bit
 * more verbose about manually copying styles over (prepublish command).
 */
export default async function createScssVariables(
  noCopy: boolean = false
): Promise<void> {
  if (!noCopy) {
    await copyStyles();
  }

  const variables = (await getSassdoc()).reduce<PackageVariables>(
    (collection, variable) => {
      if (!isVariableItem(variable) || variable.access === "private") {
        return collection;
      }

      const group = variable.group[0].replace(/^(form)-.+$/, "$1");
      collection[group] = collection[group] || {};

      const { name, value } = getCompiledScssVariable(variable);
      collection[group][name] = toJSONValue(value);
      return collection;
    },
    {}
  );

  await Promise.all(
    Object.entries(variables).map(([packageName, json]) => {
      log.debug(
        `Creating scssVariables.ts with ${
          Object.keys(json).length
        } variables in ${packageName}`
      );
      const contents = format(
        `/** this is an auto-generated file from @react-md/dev-utils */
export default ${JSON.stringify(json)};
`
      );

      return writeFile(
        join(packagesRoot, packageName, src, scssVariables),
        contents
      );
    })
  );

  await cleanTempStyles();
}
