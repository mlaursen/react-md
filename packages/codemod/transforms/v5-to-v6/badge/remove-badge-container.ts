import { type API, type FileInfo, type Options } from "jscodeshift";
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
    name: "BadgeContainer",
    remove: true,
  }).forEach((name) => {
    root.findJSXElements(name).forEach((jsxElement) => {
      const props = [...(jsxElement.node.openingElement.attributes ?? [])];
      let isStyleFound = false;
      j(jsxElement)
        .find(j.JSXAttribute, { name: { name: "style" } })
        .forEach((style) => {
          isStyleFound = true;
        });
      if (!isStyleFound) {
        props.push(
          j.jsxAttribute(
            j.jsxIdentifier("style"),
            j.jsxExpressionContainer(
              j.objectExpression([
                j.objectProperty(
                  j.identifier("display"),
                  j.stringLiteral("inline-flex")
                ),
                j.objectProperty(
                  j.identifier("position"),
                  j.stringLiteral("relative")
                ),
              ])
            )
          )
        );
      }

      j(jsxElement).replaceWith(
        j.jsxElement.from({
          ...jsxElement.node,
          openingElement: j.jsxOpeningElement(j.jsxIdentifier("span"), props),
          closingElement: j.jsxClosingElement(j.jsxIdentifier("span")),
        })
      );
    });
  });

  return root.toSource(printOptions);
}
