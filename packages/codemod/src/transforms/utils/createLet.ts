import {
  type JSCodeshift,
  type TSTypeAnnotation,
  type VariableDeclaration,
} from "jscodeshift";

import { type ExpressionKind } from "../../types.js";
import { createTypedIdentifier } from "./createTypedIdentifier.js";

export interface CreateLetOptions {
  j: JSCodeshift;
  id: string;
  type: TSTypeAnnotation["typeAnnotation"];
  value?: ExpressionKind;
  comment?: string;
  isTypescript: boolean;
}

export function createLet(options: CreateLetOptions): VariableDeclaration {
  const { j, id, value = null, type, comment, isTypescript } = options;

  const decl = j.variableDeclaration("let", [
    j.variableDeclarator(
      createTypedIdentifier({
        j,
        name: id,
        type,
        isTypescript,
      }),
      value
    ),
  ]);
  if (comment) {
    decl.comments = [j.commentLine(` TODO: ${comment}`)];
  }

  return decl;
}
