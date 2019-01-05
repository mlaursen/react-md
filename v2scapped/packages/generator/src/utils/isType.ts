import { Type } from "typedoc/dist/lib/models";

export function isReferenceType(type: Type) {
  return type.type === "reference";
}

export function isUnionType(type: Type) {
  return type.type === "union";
}

export function isReflectionType(type: Type) {
  return type.type === "reflection";
}
