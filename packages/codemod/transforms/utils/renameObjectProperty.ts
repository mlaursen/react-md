import { type ASTPath, type ObjectProperty } from "jscodeshift";

export interface RenameObjectPropertyOptions {
  name: string;
  prop: ObjectProperty | ASTPath<ObjectProperty>;
}

export function renameObjectProperty(
  options: RenameObjectPropertyOptions
): void {
  const { name, prop } = options;
  const node = "node" in prop ? prop.node : prop;
  switch (node.key.type) {
    case "Literal":
      node.key.value = name;
      break;
    case "StringLiteral":
      node.key.value = name;
      break;
    case "Identifier":
      node.key.name = name;
      node.shorthand = false;
      break;
  }
}
