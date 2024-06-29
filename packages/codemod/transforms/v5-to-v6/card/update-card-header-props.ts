import {
  type API,
  type FileInfo,
  type JSXAttribute,
  type JSXSpreadAttribute,
  type Options,
} from "jscodeshift";
import { getPropName } from "../../utils/getPropName";
import { traverseIdentifiers } from "../../utils/traverseIdentifiers";

export default function transformer(
  file: FileInfo,
  api: API,
  options: Options
): string {
  const j = api.jscodeshift;
  const root = j(file.source);
  const printOptions = options.printOptions;

  traverseIdentifiers({
    j,
    root,
    name: "CardHeader",
  }).forEach((name) => {
    root.find(j.JSXOpeningElement, { name: { name } }).forEach((cardHeader) => {
      const attributes: (JSXAttribute | JSXSpreadAttribute)[] = [];
      cardHeader.node.attributes?.forEach((attr) => {
        if (attr.type !== "JSXAttribute") {
          attributes.push(attr);
          return;
        }

        const name = getPropName(attr);
        switch (name) {
          case "align":
            // remove
            break;
          case "beforeChildren":
          case "afterChildren":
            attr.name.name = name.replace("Children", "Addon");
            attributes.push(attr);
            break;
          case "contentClassName":
            if (attr.value) {
              attributes.push(
                j.jsxAttribute(
                  {
                    name: "contentProps",
                    type: "JSXIdentifier",
                  },
                  j.jsxExpressionContainer(
                    j.objectExpression([
                      {
                        key: {
                          type: "Identifier",
                          name: "className",
                        },
                        type: "ObjectProperty",
                        value:
                          attr.value.type === "JSXExpressionContainer" &&
                          attr.value.expression.type !== "JSXEmptyExpression"
                            ? attr.value.expression
                            : attr.value,
                      },
                    ])
                  )
                )
              );
            }
            break;
          default:
            attributes.push(attr);
        }
      });

      cardHeader.node.attributes = attributes;
    });
  });

  return root.toSource(printOptions);
}
