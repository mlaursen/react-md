import {
  type ArrowFunctionExpression,
  type Identifier,
  type JSCodeshift,
  type JSXAttribute,
  type JSXSpreadAttribute,
} from "jscodeshift";

import { type PatternKind, type StatementKind } from "../../../../types";
import { createLet } from "../../../../utils/createLet";
import { createReturnOptionStatement } from "./createReturnObjectStatement";
import {
  type SupportedLabelReference,
  type SupportedValueReference,
} from "./types";

interface CreateDefaultLabelValueOptions {
  j: JSCodeshift;
  option: Identifier;
  isTypescript: boolean;
}

interface DefaultLabelValue {
  label: Identifier;
  value: Identifier;
  statements: StatementKind[];
}

function createDefaultLabelValueGetters({
  j,
  option,
  isTypescript,
}: CreateDefaultLabelValueOptions): DefaultLabelValue {
  const label = j.identifier("label");
  const value = j.identifier("value");

  const ifOptionIsNull = [
    // if (option === null) {
    //   label = '';
    //   value = '';
    // }
    j.binaryExpression("===", option, j.nullLiteral()),
    j.blockStatement([
      j.expressionStatement(j.assignmentExpression("=", label, j.literal(""))),
      j.expressionStatement(j.assignmentExpression("=", value, j.literal(""))),
    ]),
  ] as const;
  const elseIfOptionIsStringOrNumber = [
    // else if (typeof option === 'string' || typeof option === 'number') {
    //   label = option;
    //   value = option;
    // }
    j.logicalExpression(
      "||",
      j.binaryExpression(
        "===",
        j.unaryExpression("typeof", option),
        j.literal("string")
      ),
      j.binaryExpression(
        "===",
        j.unaryExpression("typeof", option),
        j.literal("number")
      )
    ),
    j.blockStatement([
      j.expressionStatement(j.assignmentExpression("=", label, option)),
      j.expressionStatement(j.assignmentExpression("=", value, option)),
    ]),
  ] as const;
  const elseLabelIsLabelAndValueIsValue = j.blockStatement([
    // else {
    //   label = option.label;
    //   value = option.value;
    // }
    j.expressionStatement(
      j.assignmentExpression(
        "=",
        label,
        j.memberExpression(option, j.identifier("label"))
      )
    ),
    j.expressionStatement(
      j.assignmentExpression(
        "=",
        value,
        j.memberExpression(option, j.identifier("value"))
      )
    ),
  ]);

  const statements: StatementKind[] = [
    createLet({
      j,
      id: "label",
      type: j.tsTypeReference(j.identifier("ReactNode")),
      comment: "Update this code to match the option type",
      isTypescript,
    }),
    createLet({
      j,
      id: "value",
      type: j.tsUnionType([j.tsStringKeyword(), j.tsNumberKeyword()]),
      isTypescript,
    }),

    // set label and value based on the type of the option
    j.ifStatement(
      ...ifOptionIsNull,
      j.ifStatement(
        ...elseIfOptionIsStringOrNumber,
        elseLabelIsLabelAndValueIsValue
      )
    ),
  ];

  return {
    label,
    value,
    statements,
  };
}

interface CreateOptionsDotMapOptions {
  j: JSCodeshift;
  option?: Identifier;
  label?: SupportedLabelReference;
  value?: SupportedValueReference;
  otherArgs?: PatternKind[];
  optionProps?: (JSXAttribute | JSXSpreadAttribute)[];
  isTypescript: boolean;
}

export function createOptionsDotMap({
  j,
  option = j.identifier("option"),
  label,
  value,
  otherArgs = [],
  isTypescript,
}: CreateOptionsDotMapOptions): ArrowFunctionExpression {
  let statements: StatementKind[] = [];
  if (!label || !value) {
    ({ label, value, statements } = createDefaultLabelValueGetters({
      j,
      option,
      isTypescript,
    }));
  }

  return j.arrowFunctionExpression(
    [option, ...otherArgs],
    j.blockStatement([
      ...statements,
      createReturnOptionStatement({ j, label, value }),
    ])
  );
}
