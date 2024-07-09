import {
  type API,
  type FileInfo,
  type Identifier,
  type NumericLiteral,
  type Options,
  type SpreadElement,
} from "jscodeshift";
import { type ExpressionKind } from "../../types";
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

  const isValid = (
    arg: SpreadElement | ExpressionKind
  ): arg is Identifier | NumericLiteral =>
    j.Identifier.check(arg) || isNumericExpression(j, arg);

  traverseImportSpecifiers({
    j,
    root,
    name: "withinRange",
  }).forEach((name) => {
    root
      .find(j.CallExpression, { callee: { name } })
      .forEach((callExpression) => {
        const [value, min, max] = callExpression.node.arguments;
        if (!isValid(value) || !isValid(min) || !isValid(max)) {
          return;
        }

        callExpression.node.arguments = [
          j.objectExpression([
            j.objectProperty(j.identifier("min"), min),
            j.objectProperty(j.identifier("max"), max),
            j.objectProperty(j.identifier("value"), value),
          ]),
        ];
      });
  });

  return root.toSource(printOptions);
}
