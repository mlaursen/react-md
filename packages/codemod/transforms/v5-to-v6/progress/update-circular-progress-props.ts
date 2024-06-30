import { type API, type FileInfo, type Options } from "jscodeshift";
import { getPropName } from "../../utils/getPropName";
import { isPropEnabled } from "../../utils/isPropEnabled";
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
    name: "CircularProgress",
  }).forEach((name) => {
    root
      .find(j.JSXOpeningElement, { name: { name } })
      .forEach((jsxOpeningElement) => {
        j(jsxOpeningElement)
          .find(j.JSXAttribute)
          .forEach((jsxAttribute) => {
            const { node } = jsxAttribute;
            const name = getPropName(node);
            switch (name) {
              case "small":
                if (isPropEnabled(node)) {
                  node.name.name = "dense";
                } else {
                  j(jsxAttribute).remove();
                }
                break;
              case "centered":
                if (!isPropEnabled(node)) {
                  j(jsxAttribute).replaceWith(
                    j.jsxAttribute(
                      {
                        name: "disableCentered",
                        type: "JSXIdentifier",
                        comments: node.comments || null,
                      },
                      null
                    )
                  );
                } else {
                  j(jsxAttribute).remove();
                }
                break;
              case "maxRotation":
                j(jsxAttribute).remove();
                break;
            }
          });
      });
  });

  return root.toSource(printOptions);
}
