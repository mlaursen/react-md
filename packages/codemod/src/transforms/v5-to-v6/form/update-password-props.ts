import {
  type API,
  type FileInfo,
  type ObjectProperty,
  type Options,
} from "jscodeshift";

import { type JSXAttributes } from "../../../types.js";
import { addFileComments } from "../../utils/addFileComment.js";
import { getPropName } from "../../utils/getPropName.js";
import { traverseImportSpecifiers } from "../../utils/traverseImportSpecifiers.js";

export default function transformer(
  file: FileInfo,
  api: API,
  options: Options
): string {
  const j = api.jscodeshift;
  const root = j(file.source);
  const printOptions = options.printOptions;

  const comments = new Set<string>();
  traverseImportSpecifiers({
    j,
    root,
    name: "GetVisibilityIcon",
    replace: "GetPasswordVisibilityIcon",
    returnOriginalName: true,
  }).forEach((name) => {
    root.find(j.Identifier, { name }).forEach((ref) => {
      ref.node.name = "GetPasswordVisibilityIcon";
    });
    comments.add(
      'TOOD: Update `GetPasswordVisibilityIcon` references since it provides the `type === "password"` flag instead of the `type` now'
    );
  });

  traverseImportSpecifiers({
    j,
    root,
    name: "Password",
  }).forEach((name) => {
    root.findJSXElements(name).forEach((password) => {
      const props: JSXAttributes = [];
      const visibilityProps: ObjectProperty[] = [];
      const openingElement = password.node.openingElement;
      openingElement.attributes?.forEach((attr) => {
        if (j.JSXSpreadAttribute.check(attr)) {
          props.push(attr);
          return;
        }

        const name = getPropName(attr);
        switch (name) {
          case "visibilityStyle":
            if (
              !j.JSXExpressionContainer.check(attr.value) ||
              !(
                j.Identifier.check(attr.value.expression) ||
                j.ObjectExpression.check(attr.value.expression)
              )
            ) {
              return;
            }
            visibilityProps.push(
              j.objectProperty(j.identifier("style"), attr.value.expression)
            );

            break;
          case "visibilityClassName":
            if (j.StringLiteral.check(attr.value)) {
              visibilityProps.push(
                j.objectProperty(j.identifier("className"), attr.value)
              );
            } else if (
              j.JSXExpressionContainer.check(attr.value) &&
              !j.JSXEmptyExpression.check(attr.value.expression)
            ) {
              visibilityProps.push(
                j.objectProperty(
                  j.identifier("className"),
                  attr.value.expression
                )
              );
            }

            break;
          case "onVisibilityClick":
            if (
              !j.JSXExpressionContainer.check(attr.value) ||
              !(
                j.Identifier.check(attr.value.expression) ||
                j.ArrowFunctionExpression.check(attr.value.expression)
              )
            ) {
              return;
            }

            visibilityProps.push(
              j.objectProperty(j.identifier("onClick"), attr.value.expression)
            );
            break;
          case "getVisibilityIcon":
            if (!j.JSXExpressionContainer.check(attr.value)) {
              return;
            }

            props.push(
              j.jsxAttribute(j.jsxIdentifier("visibilityIcon"), attr.value)
            );
            break;
          default:
            props.push(attr);
        }
      });

      if (visibilityProps.length) {
        props.push(
          j.jsxAttribute(
            j.jsxIdentifier("visibilityProps"),
            j.jsxExpressionContainer(j.objectExpression(visibilityProps))
          )
        );
      }

      openingElement.attributes = props;
    });
  });

  addFileComments({
    j,
    root,
    comments,
  });

  return root.toSource(printOptions);
}
