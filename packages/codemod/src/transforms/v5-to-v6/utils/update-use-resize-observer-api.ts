import {
  type API,
  type ArrowFunctionExpression,
  type FileInfo,
  type Identifier,
  type JSCodeshift,
  type MemberExpression,
  type Options,
  type VariableDeclaration,
} from "jscodeshift";

import {
  type ComponentDefinition,
  type ObjectPropertyKind,
} from "../../../types.js";
import { addImportSpecifiers } from "../../utils/addImportSpecifiers.js";
import { createConst } from "../../utils/createConst.js";
import { createDestructuredConst } from "../../utils/createDestructuredConst.js";
import { getClosestComponentDefinition } from "../../utils/getClosestComponentDefinition.js";
import { getObjectPropertyName } from "../../utils/getObjectPropertyName.js";
import { isTypescriptFile } from "../../utils/isTypescriptFile.js";
import { mergeImportDeclarations } from "../../utils/mergeImportDeclarations.js";
import { traverseImportSpecifiers } from "../../utils/traverseImportSpecifiers.js";

const PREV_DATA_KEYS = [
  "height",
  "width",
  "scrollHeight",
  "scrollWidth",
  "element",
] as const;
type PrevDataKey = (typeof PREV_DATA_KEYS)[number];

function isPrevDataKey(
  j: JSCodeshift,
  node: unknown
): node is Identifier & { name: PrevDataKey } {
  return (
    j.Identifier.check(node) &&
    PREV_DATA_KEYS.includes(node.name as PrevDataKey)
  );
}

function convertCallbackArrowFunction(
  j: JSCodeshift,
  arrowFunction: ArrowFunctionExpression
): void {
  const [prevArg] = arrowFunction.params;

  // always enforce a single `entry` arg going forwards
  const entry = j.identifier("entry");
  arrowFunction.params = [entry];

  // when there are any destructured values from the previous
  // `ResizeObserverElementData`, track them so new const declarations can be
  // created.
  //
  // i.e.
  // ```
  // ({ height, width, element, scrollHeight, scrollWidth }) =>
  // ```
  // to
  // ```
  // (entry) => {
  //   const { height, width } = entry.contentRect;
  //   const element = entry.target;
  //   const { scrollHeight, scrollWidth } = element;
  // }
  // `
  const remaps = new Map<PrevDataKey, Identifier>();
  if (j.ObjectPattern.check(prevArg)) {
    prevArg.properties.forEach((prop) => {
      if (!j.ObjectProperty.check(prop) || !j.Identifier.check(prop.value)) {
        return;
      }

      if (isPrevDataKey(j, prop.key)) {
        remaps.set(prop.key.name, prop.value);
      }
    });
  } else if (j.Identifier.check(prevArg)) {
    // if the callback was defined as:
    // ```
    // (someArg) => ...
    // ```
    //
    // Try to convert any member expressions with their new values without
    // creating new const declarations.
    // i.e.
    // ```diff
    // -const height = someArg.height;
    // -const width = someArg.width;
    // -const element = someArg.element;
    // -const scrollHeight = someArg.scrollHeight;
    // -const scrollWidth = someArg.scrollWidth;
    // +const height = entry.contentRect.height
    // +const width = entry.contentRect.width
    // +const element = entry.target;
    // +const scrollHeight = element.scrollHeight
    // +const scrollWidth = element;
    // ```
    j(arrowFunction)
      .find(j.MemberExpression, { object: { name: prevArg.name } })
      .forEach((memberExpression) => {
        const prop = memberExpression.node.property;
        if (isPrevDataKey(j, prop)) {
          const name = prop.name;
          let replacement: MemberExpression;
          if (name === "element") {
            replacement = j.memberExpression(entry, j.identifier("target"));
          } else if (name === "height" || name === "width") {
            replacement = j.memberExpression(
              j.memberExpression(entry, j.identifier("contentRect")),
              prop
            );
          } else {
            replacement = j.memberExpression(
              j.memberExpression(entry, j.identifier("target")),
              prop
            );
          }
          j(memberExpression).replaceWith(replacement);
        }
      });

    // also check if any values were destructured and create new const
    // declarations like the inline destructuring
    j(arrowFunction)
      .find(j.VariableDeclarator, { init: { name: prevArg.name } })
      .forEach((variableDeclarator) => {
        const { id } = variableDeclarator.node;
        if (!j.ObjectPattern.check(id)) {
          return;
        }

        id.properties.forEach((prop) => {
          if (
            !j.ObjectProperty.check(prop) ||
            !j.Identifier.check(prop.value)
          ) {
            return;
          }

          if (isPrevDataKey(j, prop.key)) {
            remaps.set(prop.key.name, prop.value);
          }
        });

        j(variableDeclarator).remove();
      });
  }

  // force the content to always be a block statement
  // `() => setState(...)` -> `() => { setState(...) }`
  if (j.CallExpression.check(arrowFunction.body)) {
    arrowFunction.body = j.blockStatement([
      j.expressionStatement(arrowFunction.body),
    ]);
  }

  if (!j.BlockStatement.check(arrowFunction.body)) {
    return;
  }

  const declarations: VariableDeclaration[] = [];
  const height = remaps.get("height");
  const width = remaps.get("width");
  const scrollHeight = remaps.get("scrollHeight");
  const scrollWidth = remaps.get("scrollWidth");
  const element = remaps.get("element");
  if (height || width) {
    declarations.push(
      createDestructuredConst({
        j,
        props: [
          height && j.objectProperty(j.identifier("height"), height),
          width && j.objectProperty(j.identifier("width"), width),
        ].filter((b) => !!b),
        value: j.memberExpression(entry, j.identifier("contentRect")),
      })
    );
  }

  if (element) {
    declarations.push(
      createConst({
        j,
        id: element,
        value: j.memberExpression(entry, j.identifier("target")),
      })
    );

    if (scrollHeight || scrollWidth) {
      declarations.push(
        createDestructuredConst({
          j,
          props: [
            scrollHeight &&
              j.objectProperty(j.identifier("scrollHeight"), scrollHeight),
            scrollWidth &&
              j.objectProperty(j.identifier("scrollWidth"), scrollWidth),
          ].filter((b) => !!b),
          value: element,
        })
      );
    }
  } else if (scrollHeight || scrollWidth) {
    declarations.push(
      createDestructuredConst({
        j,
        props: [
          scrollHeight &&
            j.objectProperty(j.identifier("scrollHeight"), scrollHeight),
          scrollWidth &&
            j.objectProperty(j.identifier("scrollWidth"), scrollWidth),
        ].filter((b) => !!b),
        value: j.memberExpression(entry, j.identifier("target")),
      })
    );
  }

  arrowFunction.body.body.unshift(...declarations);
}

export default function transformer(
  file: FileInfo,
  api: API,
  options: Options
): string {
  const j = api.jscodeshift;
  const root = j(file.source);
  const printOptions = options.printOptions;

  const rmdImports = new Set<string>();
  const reactImports = new Set<string>();
  const isTypescript = isTypescriptFile(file);
  traverseImportSpecifiers({
    j,
    root,
    name: "useResizeObserver",
  }).forEach((name) => {
    root
      .find(j.VariableDeclarator, { init: { callee: { name } } })
      .forEach((variableDeclarator) => {
        const { id, init } = variableDeclarator.node;
        if (!j.CallExpression.check(init)) {
          // shouldn't be possible
          return;
        }

        // start by converting multiple args into one.
        const [handleResize, resizeOptions] = init.arguments;
        if (
          j.Identifier.check(handleResize) ||
          j.ArrowFunctionExpression.check(handleResize) ||
          j.FunctionExpression.check(handleResize) ||
          // useCallback(() => {})
          j.CallExpression.check(handleResize)
        ) {
          const onUpdate = j.objectProperty(
            j.identifier("onUpdate"),
            handleResize
          );
          const properties: ObjectPropertyKind[] = [onUpdate];
          if (j.Identifier.check(resizeOptions)) {
            properties.push(j.spreadProperty(resizeOptions));
          } else if (j.ObjectExpression.check(resizeOptions)) {
            // I don't know how to maintain innerComments here since adding
            // `onUpdate` to the properties remove them
            properties.push(...resizeOptions.properties);
          }

          init.arguments = [j.objectExpression(properties)];
        }

        const [hookOptions] = init.arguments;
        if (!j.ObjectExpression.check(hookOptions)) {
          return;
        }

        // Next, check for the refs. I only support destructuring. i.e.
        // const [ref, refCallback] = useResizeObserver(...)
        //
        // Not:
        // const something = useResizeObserver(...);
        // const ref = something[0]
        // const refCallback = something[1]
        if (!j.ArrayPattern.check(id)) {
          return;
        }

        const [ref, refHandler] = id.elements;
        if (!j.Identifier.check(refHandler)) {
          return;
        }

        variableDeclarator.node.id = refHandler;

        // if the `ref` is used, check if there are references in the same scope.
        // If there are, I need to insert either a `useEnsuredRef` or `useRef`
        let component: ComponentDefinition | undefined;
        if (
          !j.Identifier.check(ref) ||
          !(component = getClosestComponentDefinition({
            j,
            from: variableDeclarator,
          })) ||
          !j(component).find(j.Identifier, { name: ref.name }).length
        ) {
          return;
        }

        const refOption = hookOptions.properties.find((prop) => {
          if (j.ObjectProperty.check(prop)) {
            return getObjectPropertyName(prop) === "ref";
          }

          if (j.SpreadProperty.check(prop)) {
            return true;
          }
        });

        // I am not going to support this since it would come from:
        // ```
        // const [ref, refCallback] = useResizeObserver(callback, options);
        // ```
        // or
        // ```
        // const [ref, refCallback] = useResizeObserver(callback, {
        //   ...options,
        // })
        // ```
        if (j.SpreadProperty.check(refOption)) {
          return;
        }

        if (
          j.ObjectProperty.check(refOption) &&
          j.Identifier.check(refOption.value)
        ) {
          const refOptionIdentifier = refOption.value;
          // if it there is an inline `useRef` or `React.useRef`, don't need
          // to do the useEnsuredRef conversion
          if (
            j(component)
              .find(j.VariableDeclarator, {
                id: { name: refOptionIdentifier.name },
                init: { type: "CallExpression" },
              })
              .find(j.Identifier, { name: "useRef" }).length
          ) {
            return;
          }

          // otherwise, need to do a useEnsuredRef
          rmdImports.add("useEnsuredRef");
          j(component)
            .find(j.Identifier, { name: refOption.value.name })
            .at(0)
            .forEach((identifier) => {
              const { node } = identifier;
              const callbackName = `${node.name}Callback`;

              const prevName = ref.name;
              refOptionIdentifier.name = callbackName;

              j(variableDeclarator.parent).insertBefore(
                createConst({
                  j,
                  id: j.arrayPattern([
                    j.identifier(prevName),
                    j.identifier(callbackName),
                  ]),
                  value: j.callExpression(j.identifier("useEnsuredRef"), [
                    node,
                  ]),
                })
              );
            });

          return;
        }

        reactImports.add("useRef");
        const useRef = j.callExpression(j.identifier("useRef"), [
          j.nullLiteral(),
        ]);
        if (isTypescript) {
          useRef.typeArguments = j.typeParameterInstantiation([
            j.typeParameter("HTMLElement"),
          ]);
        }
        j(variableDeclarator.parent).insertBefore(
          createConst({
            j,
            id: ref,
            value: useRef,
          })
        );

        hookOptions.properties.push(j.objectProperty(j.identifier("ref"), ref));
      });

    root
      .find(j.CallExpression, { callee: { name } })
      .forEach((callExpression) => {
        const [options] = callExpression.node.arguments;
        if (!j.ObjectExpression.check(options)) {
          return;
        }

        const onUpdate = options.properties.find(
          (prop) =>
            j.ObjectProperty.check(prop) &&
            getObjectPropertyName(prop) === "onUpdate"
        );
        if (!j.ObjectProperty.check(onUpdate)) {
          return;
        }

        // most likely `onUpdate: useCallback`
        if (
          j.CallExpression.check(onUpdate.value) &&
          j.ArrowFunctionExpression.check(onUpdate.value.arguments[0])
        ) {
          convertCallbackArrowFunction(j, onUpdate.value.arguments[0]);
        }
      });
  });
  traverseImportSpecifiers({
    j,
    root,
    name: "OnResizeObserverChange",
    remove: true,
  }).forEach((name) => {
    mergeImportDeclarations({
      j,
      root,
    });

    // find `useCallback<OnResizeObserverChange>` and change to `useCallback((entry: ResizeObserverEntry) => {
    // })`
    root
      .find(j.CallExpression, {
        // @ts-expect-error For some reason this is typeArguments in the type definition?
        typeParameters: {
          type: "TSTypeParameterInstantiation",
          params: [{ typeName: { name } }],
        },
      })
      .forEach((callExpression) => {
        rmdImports.add("ResizeObserverEntryCallback");
        const { node } = callExpression;
        // @ts-expect-error For some reason this is typeArguments in the type definition?
        node.typeParameters.params[0].typeName.name =
          "ResizeObserverEntryCallback";

        const [arrowFunction] = node.arguments;
        if (!j.ArrowFunctionExpression.check(arrowFunction)) {
          return;
        }

        convertCallbackArrowFunction(j, arrowFunction);
      });
  });

  addImportSpecifiers({
    j,
    root,
    imports: reactImports,
    packageName: "react",
  });
  addImportSpecifiers({
    j,
    root,
    imports: rmdImports,
  });

  return root.toSource(printOptions);
}
