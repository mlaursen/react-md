import {
  type ASTPath,
  type Identifier,
  type JSCodeshift,
  type JSXElement,
} from "jscodeshift";

import { type JSXExpression } from "../../../../types";
import { getObjectPropertyName } from "../../../../utils/getObjectPropertyName";
import { createOptionsDotMap } from "./createOptionsDotMap";
import { createReturnOptionStatement } from "./createReturnObjectStatement";
import {
  isSupportedLabelReference,
  isSupportedValueReference,
} from "./isSupportedLabelValue";
import {
  type OptionsMapFunction,
  type SupportedLabelReference,
  type SupportedValueReference,
} from "./types";

interface Options {
  j: JSCodeshift;
  select: ASTPath<JSXElement>;
  options: Identifier | OptionsMapFunction | undefined;
  comments: Set<string>;
  rmdImports: Set<string>;
  reactImports: Set<string>;
  isTypescript: boolean;
}

export function migrateOptionsToChildren({
  j,
  select,
  options,
  comments,
  rmdImports,
  reactImports,
  isTypescript,
}: Options): void {
  if (!options) {
    return;
  }

  rmdImports.add("Option");
  let children: JSXExpression;
  if (j.Identifier.check(options)) {
    if (isTypescript) {
      reactImports.add("ReactNode");
    }

    children = j.callExpression(
      j.memberExpression(options, j.identifier("map")),
      [createOptionsDotMap({ j, isTypescript })]
    );
  } else {
    const [arrowFunction] = options.arguments;
    const [optionOrDestructure, ..._otherArgs] = arrowFunction.params;
    if (
      !j.Identifier.check(optionOrDestructure) &&
      !j.ObjectPattern.check(optionOrDestructure)
    ) {
      comments.add(
        "TODO: Unable to automatically convert the `Select` options."
      );
      return;
    }

    if (j.BlockStatement.check(arrowFunction.body)) {
      comments.add(
        "TODO: Unable to automatically convert the `Select` options."
      );
      return;
    } else if (j.ObjectExpression.check(arrowFunction.body)) {
      let label: SupportedLabelReference | undefined;
      let value: SupportedValueReference | undefined;
      arrowFunction.body.properties.forEach((prop) => {
        if (j.ObjectProperty.check(prop)) {
          const name = getObjectPropertyName(prop);
          if (name === "label" && isSupportedLabelReference(j, prop)) {
            label = prop.value;
            return;
          }
          if (name === "value" && isSupportedValueReference(j, prop)) {
            value = prop.value;
            return;
          }
        } else {
          // I stopped because it's quicker just to manually update
        }
      });

      if (!label || !value) {
        comments.add(
          "TODO: Unable to automatically convert the `Select` options."
        );
        return;
      }
      arrowFunction.body = j.blockStatement([
        createReturnOptionStatement({
          j,
          label,
          value,
        }),
      ]);
    }

    arrowFunction.body = j.BlockStatement.check(arrowFunction.body)
      ? arrowFunction.body
      : j.blockStatement([j.returnStatement(arrowFunction.body)]);

    children = options;
  }

  // start by making the `Select` no longer self closing
  const { openingElement } = select.node;
  j(select).replaceWith(
    j.jsxElement(
      j.jsxOpeningElement(
        openingElement.name,
        openingElement.attributes,
        false
      ),
      j.jsxClosingElement(openingElement.name),
      [j.jsxExpressionContainer(children)]
    )
  );
}
