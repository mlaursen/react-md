import { type JSCodeshift, type VariableDeclaration } from "jscodeshift";

import { type ExpressionKind, type PatternKind } from "../../types.js";

export interface CreateConstOptions {
  j: JSCodeshift;
  id: PatternKind;
  value: ExpressionKind;
}

export function createConst(options: CreateConstOptions): VariableDeclaration {
  const { j, id, value } = options;

  return j.variableDeclaration("const", [j.variableDeclarator(id, value)]);
}
