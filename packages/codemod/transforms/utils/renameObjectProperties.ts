import {
  type Collection,
  type JSCodeshift,
  type ObjectExpression,
  type ObjectPattern,
} from "jscodeshift";
import { getObjectPropertyName } from "./getObjectPropertyName";
import { renameObjectProperty } from "./renameObjectProperty";

export interface RenameObjectPropertiesOptions {
  j: JSCodeshift;
  props: Record<string, string>;
  object: Collection<ObjectPattern> | Collection<ObjectExpression>;
}

export function renameObjectProperties(
  options: RenameObjectPropertiesOptions
): void {
  const { j, props, object } = options;
  object.find(j.ObjectProperty).forEach((prop) => {
    const name = getObjectPropertyName(prop);
    const rename = props[name];
    if (rename) {
      renameObjectProperty({
        name: rename,
        prop,
      });
    }
  });
}
