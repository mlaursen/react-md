import {
  type API,
  type FileInfo,
  type JSXAttribute,
  type Options,
} from "jscodeshift";

import { addFileComments } from "../../utils/addFileComment.js";
import { addImportSpecifier } from "../../utils/addImportSpecifier.js";
import { getPropName } from "../../utils/getPropName.js";
import { isPropConditionalExpression } from "../../utils/isPropConditionalExpression.js";
import { isPropEnabled } from "../../utils/isPropEnabled.js";
import { traverseImportSpecifiers } from "../../utils/traverseImportSpecifiers.js";
import { RENDER_PORTAL_PROPS } from "../portal/constants.js";

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
    name: ["ScaleTransition"],
  }).forEach((name) => {
    root
      .find(j.JSXOpeningElement, { name: { name } })
      .forEach((jsxOpeningElement) => {
        let wrapInPortal = false;

        const props: JSXAttribute[] = [];
        j(jsxOpeningElement)
          .find(j.JSXAttribute)
          .forEach((jsxAttribute) => {
            const attr = jsxAttribute.node;
            const propName = getPropName(attr);
            if (RENDER_PORTAL_PROPS.includes(propName)) {
              if (propName === "portal") {
                if (isPropConditionalExpression(attr) && !props.length) {
                  wrapInPortal = true;
                  props.push(
                    j.jsxAttribute(
                      {
                        name: "disabled",
                        type: "JSXIdentifier",
                      },
                      j.jsxExpressionContainer(
                        j.unaryExpression("!", attr.value.expression)
                      )
                    )
                  );
                }
                wrapInPortal ||= isPropEnabled(attr);
              } else {
                wrapInPortal = true;
                comments.add(
                  `TODO: The \`${propName}\` for the \`${name}\` cannot be converted automatically.`
                );
              }

              j(jsxAttribute).remove();
            }
          });

        if (wrapInPortal) {
          addImportSpecifier({
            j,
            root,
            name: "Portal",
          });
          j(jsxOpeningElement)
            .closest(j.JSXElement)
            .forEach((jsxElement) => {
              j(jsxElement).replaceWith(
                j.jsxElement(
                  j.jsxOpeningElement(
                    {
                      name: "Portal",
                      type: "JSXIdentifier",
                      comments: jsxElement.node.comments,
                    },
                    props
                  ),
                  j.jsxClosingElement({
                    name: "Portal",
                    type: "JSXIdentifier",
                  }),
                  [jsxElement.node]
                )
              );
            });
        }
      });
  });

  addFileComments({
    j,
    root,
    comments,
  });

  return root.toSource(printOptions);
}
