import { type API, type FileInfo, type Options } from "jscodeshift";

import { createJsxAttributeFromBoolean } from "../../utils/createJsxAttributeFromBoolean.js";
import { getPropName } from "../../utils/getPropName.js";
import { isPropEnabled } from "../../utils/isPropEnabled.js";
import { removeProps } from "../../utils/removeProps.js";
import { traverseImportSpecifiers } from "../../utils/traverseImportSpecifiers.js";
import { RENDER_PORTAL_INTO_PROPS } from "../portal/constants.js";

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
    name: "Tooltip",
  }).forEach((name) => {
    removeProps({
      root,
      props: RENDER_PORTAL_INTO_PROPS,
      component: name,
    });

    root
      .find(j.JSXOpeningElement, { name: { name } })
      .forEach((jsxOpeningElement) => {
        j(jsxOpeningElement)
          .find(j.JSXAttribute)
          .forEach((jsxAttribute) => {
            const attr = jsxAttribute.node;
            const name = getPropName(jsxAttribute);
            if (name === "portal") {
              if (!isPropEnabled(attr)) {
                j(jsxAttribute).replaceWith(
                  j.jsxAttribute(
                    {
                      name: "disablePortal",
                      type: "JSXIdentifier",
                    },
                    null
                  )
                );
              } else {
                j(jsxAttribute).remove();
              }
            } else if (name === "lineWrap") {
              const jsxAttr = createJsxAttributeFromBoolean({
                j,
                attr,
                name: "textOverflow",
                value: "nowrap",
                fallback: "allow",
                reversed: true,
              });
              if (jsxAttr) {
                j(jsxAttribute).replaceWith(jsxAttr);
              } else {
                j(jsxAttribute).remove();
              }
            }
          });
      });
  });

  return root.toSource(printOptions);
}
