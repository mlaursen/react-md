import {
  type API,
  type FileInfo,
  type ObjectProperty,
  type Options,
  type SpreadElement,
} from "jscodeshift";

import { type PatternKind } from "../../types";
import { traverseImportSpecifiers } from "../../utils/traverseImportSpecifiers";

export default function transformer(
  file: FileInfo,
  api: API,
  options: Options
): string {
  const j = api.jscodeshift;
  const root = j(file.source);
  const printOptions = options.printOptions;

  const createProperty = (
    name: string,
    value: SpreadElement | PatternKind | null
  ): ObjectProperty | null => {
    if (!j.Identifier.check(value)) {
      return null;
    }

    return j.objectProperty(j.identifier(name), value);
  };

  traverseImportSpecifiers({
    j,
    root,
    name: "useToggle",
  }).forEach((name) => {
    root
      .find(j.VariableDeclarator, {
        id: { type: "ArrayPattern" },
        init: { callee: { name } },
      })
      .forEach((variableDeclarator) => {
        const { id, init } = variableDeclarator.node;
        if (!j.ArrayPattern.check(id) || !j.CallExpression.check(init)) {
          return;
        }

        const [toggled, enable, disable, toggle, setToggled] = id.elements;

        j(variableDeclarator).replaceWith(
          j.variableDeclarator(
            j.objectPattern(
              [
                createProperty("toggled", toggled),
                createProperty("enable", enable),
                createProperty("disable", disable),
                createProperty("toggle", toggle),
                createProperty("setToggled", setToggled),
              ].filter((prop) => !!prop)
            ),
            init
          )
        );
      });
  });

  return root.toSource(printOptions);
}
