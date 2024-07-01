import { type ASTPath, type ObjectProperty } from "jscodeshift";

export function renameObjectProperty(
  name: string,
  objectProperty: ObjectProperty | ASTPath<ObjectProperty>
): void {
  const node = "node" in objectProperty ? objectProperty.node : objectProperty;
  switch (node.key.type) {
    case "Literal":
      node.key.value = name;
      break;
    case "StringLiteral":
      node.key.value = name;
      break;
    case "Identifier":
      node.key.name = name;
      break;
  }
}
