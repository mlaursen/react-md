import {
  type ASTPath,
  type ObjectMethod,
  type ObjectProperty,
} from "jscodeshift";

export function getObjectPropertyName(
  objectProperty:
    | ObjectProperty
    | ObjectMethod
    | ASTPath<ObjectProperty | ObjectMethod>,
  local = false
): string {
  const node = "node" in objectProperty ? objectProperty.node : objectProperty;
  switch (node.key.type) {
    case "Literal":
      return typeof node.key.value === "string" ? node.key.value : "";
    case "StringLiteral":
      return node.key.value;
    case "Identifier":
      return local &&
        node.type === "ObjectProperty" &&
        node.value.type === "Identifier"
        ? node.value.name
        : node.key.name;
    default:
      return "";
  }
}
