import {
  type JSCodeshift,
  type ObjectProperty,
  type RestProperty,
  type VariableDeclaration,
} from "jscodeshift";

import { type ExpressionKind } from "../../types.js";
import { createConst } from "./createConst.js";
import { createObjectProperty } from "./createObjectProperty.js";

export interface CreateDestructuredConstOptions {
  j: JSCodeshift;
  props: readonly (
    | string
    | [name: string, local: string]
    | ObjectProperty
    | RestProperty
  )[];
  value: string | ExpressionKind;
}

export function createDestructuredConst(
  options: CreateDestructuredConstOptions
): VariableDeclaration {
  const { j, props, value } = options;

  const properties: (ObjectProperty | RestProperty)[] = [];
  props.forEach((prop) => {
    if (typeof prop === "string") {
      properties.push(createObjectProperty({ j, name: prop }));
      return;
    }

    if (prop instanceof Array) {
      properties.push(
        createObjectProperty({ j, name: prop[0], local: prop[1] })
      );
      return;
    }

    properties.push(prop);
  });

  return createConst({
    j,
    id: j.objectPattern(properties),
    value: typeof value === "string" ? j.identifier(value) : value,
  });
}
