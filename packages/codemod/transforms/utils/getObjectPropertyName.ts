import { type ASTPath, type ObjectProperty } from "jscodeshift";

export function getObjectPropertyName(
  objectProperty: ObjectProperty | ASTPath<ObjectProperty>
): string {
  const node = "node" in objectProperty ? objectProperty.node : objectProperty;
  switch (node.key.type) {
    case "Literal":
      return typeof node.key.value === "string" ? node.key.value : "";
    case "StringLiteral":
      return node.key.value;
    case "Identifier":
      return node.key.name;
    default:
      return "";
  }
}
