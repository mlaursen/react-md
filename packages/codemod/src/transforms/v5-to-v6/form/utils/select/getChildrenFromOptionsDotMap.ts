import {
  type ArrowFunctionExpression,
  type FunctionExpression,
  type Identifier,
  type JSCodeshift,
  type ObjectPattern,
} from "jscodeshift";

import {
  type JSXExpression,
  type ObjectPropertyKind,
  type PatternKind,
} from "../../../../../types.js";
import { createOptionsDotMap } from "./createOptionsDotMap.js";
import { isSupportedLabelReference } from "./isSupportedLabelValue.js";
import {
  type OptionsMapFunction,
  type SupportedLabelReference,
  type SupportedValueReference,
} from "./types.js";

interface Options {
  j: JSCodeshift;
  options: OptionsMapFunction;
  otherArgs: PatternKind[];
  isTypescript: boolean;
  arrowFunction: FunctionExpression | ArrowFunctionExpression;
  dotMapOption: Identifier | ObjectPattern;
}

export function getChildrenFromOptionsDotMap({
  j,
  options,
  otherArgs,
  isTypescript,
  arrowFunction,
  dotMapOption,
}: Options): JSXExpression {
  let label: SupportedLabelReference | undefined;
  let value: SupportedValueReference | undefined;
  let option: Identifier | undefined;
  // .map(option => { ... })
  if (j.Identifier.check(dotMapOption)) {
    option = dotMapOption;
  } else {
    // .map(({ ...properties... }) => { ... })
    // option = dotMapOption;
  }

  const props: ObjectPropertyKind[] = [];
  if (
    j.ObjectExpression.check(arrowFunction.body) &&
    j.Identifier.check(options.callee.object)
  ) {
    // it is a simple `options.map(option => ({ label: option.label, value: option.value }))`
    // sort of format
    arrowFunction.body.properties.forEach((prop) => {
      if (
        (!j.ObjectProperty.check(prop) && !j.Property.check(prop)) ||
        !j.Identifier.check(prop.key) ||
        (prop.key.name !== "label" && prop.key.name !== "value")
      ) {
        props.push(prop);
      } else {
        // STOPPED HERE
        // TODO:This mostly works but I need to update the `createOptionsMap`
        // to support providing a destructured object?
        //
        // if (name === "value") {
        //   if (isSupportedValueReference(j, prop)) {
        //     value = prop.value;
        //   }
        // }
        // eslint-disable-next-line no-lonely-if
        if (isSupportedLabelReference(j, prop)) {
          const { name } = prop.key;
          if (name === "label") {
            label = prop.value;
          } else if (!j.JSXElement.check(prop.value)) {
            value = prop.value;
          }
        }
      }
    });
  }

  return createOptionsDotMap({
    j,
    label,
    value,
    option,
    otherArgs,
    isTypescript,
  });
}
