import {
  type API,
  type ASTPath,
  type FileInfo,
  type JSCodeshift,
  type JSXElement,
  type Options,
} from "jscodeshift";

import { addFileComments } from "../../utils/addFileComment.js";
import { renameProps } from "../../utils/renameProps.js";
import { traverseImportSpecifiers } from "../../utils/traverseImportSpecifiers.js";

function isChildrenExpression(
  j: JSCodeshift,
  jsxElement: ASTPath<JSXElement>
): boolean {
  return (
    j(jsxElement).find(j.JSXAttribute, {
      name: { name: "children" },
      value: { type: "JSXExpressionContainer" },
    }).length > 0 ||
    !!jsxElement.node.children?.find(
      (child) =>
        child.type === "JSXExpressionContainer" &&
        ["FunctionExpression", "ArrowFunctionExpression"].includes(
          child.expression.type
        )
    )
  );
}

export default function transformer(
  file: FileInfo,
  api: API,
  options: Options
): string {
  const j = api.jscodeshift;
  const root = j(file.source);
  const printOptions = options.printOptions;

  const comments = new Set<string>();
  ["Typography", "SrOnly"].forEach((component) => {
    traverseImportSpecifiers({
      j,
      root,
      name: component,
    }).forEach((name) => {
      renameProps({
        root,
        props: {
          component: "as",
        },
        component: name,
      });

      root.findJSXElements(name).forEach((jsxElement) => {
        if (!comments.size && isChildrenExpression(j, jsxElement)) {
          comments.add(
            `TODO: Check the \`${component}\` usage to see if using the removed children function renderer behavior for getting the class name.`
          );
        }
      });
    });
  });

  addFileComments({
    j,
    root,
    comments,
  });

  return root.toSource(printOptions);
}
