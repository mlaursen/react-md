import { writeFile } from "fs-extra";
import { join } from "path";

import {
  COPY_BANNER,
  JSONObject,
  JSONValue,
  packagesRoot,
  scssVariables,
  src,
} from "../../constants";
import { format } from "../format";
import { getSassdoc } from "./getSassdoc";
import { isPublic, isVariableItem } from "./helpers";
import { getCompiledValue, isPrimitive, VariableValue } from "./variable";

type PackageVariables = Record<string, JSONObject>;

function toJSONValue(value: VariableValue): JSONValue {
  if (isPrimitive(value)) {
    return value;
  }

  if (!Array.isArray(value)) {
    return { ...value } as JSONObject;
  }

  return value.reduce<JSONObject>((obj, variable) => {
    obj[variable.name] = toJSONValue(variable.value);
    return obj;
  }, {});
}

export async function createScssVariables(): Promise<void> {
  const items = await getSassdoc();
  const variables = items.reduce<PackageVariables>(
    (collection, variable, i) => {
      if (isVariableItem(variable) && isPublic(variable)) {
        const group = variable.group[0].replace(/^(form)-.+$/, "$1");
        collection[group] = collection[group] || {};

        const { name, value } = getCompiledValue(variable, i);
        collection[group][name] = toJSONValue(value);
      }

      return collection;
    },
    {}
  );

  const promises = Object.entries(variables).map(([packageName, json]) => {
    const contents = format(
      `${COPY_BANNER}
export default ${JSON.stringify(json)}
`,
      "typescript"
    );

    const filePath = join(packagesRoot, packageName, src, scssVariables);
    return writeFile(filePath, contents);
  });

  await Promise.all(promises);
}
