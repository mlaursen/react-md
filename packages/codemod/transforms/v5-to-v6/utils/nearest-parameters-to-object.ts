import {
  type API,
  type FileInfo,
  type Identifier,
  type NullLiteral,
  type NumericLiteral,
  type Options,
  type UnaryExpression,
} from "jscodeshift";
import { isNumericExpression } from "../../utils/isNumericExpression";
import { traverseImportSpecifiers } from "../../utils/traverseImportSpecifiers";

export default function transformer(
  file: FileInfo,
  api: API,
  options: Options
): string {
  const j = api.jscodeshift;
  const root = j(file.source);
  const printOptions = options.printOptions;

  traverseImportSpecifiers({
    j,
    root,
    name: "nearest",
  }).forEach((name) => {
    root
      .find(j.CallExpression, { callee: { name } })
      .forEach((callExpression) => {
        const args: (
          | Identifier
          | NumericLiteral
          | NullLiteral
          | UnaryExpression
        )[] = new Array(5);

        // let value, min, max, steps;
        callExpression.node.arguments.forEach((arg, i) => {
          if (j.Identifier.check(arg) || isNumericExpression(j, arg)) {
            args[i] = arg;
            return;
          }
        });

        callExpression.node.arguments = [
          j.objectExpression(
            [
              j.objectProperty(j.identifier("value"), args[0]),
              j.objectProperty(j.identifier("min"), args[1]),
              j.objectProperty(j.identifier("max"), args[2]),
              j.objectProperty(j.identifier("steps"), args[3]),
              args[4] && j.objectProperty(j.identifier("range"), args[4]),
            ].filter(Boolean)
          ),
        ];
      });
  });

  return root.toSource(printOptions);
}
