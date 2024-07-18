import {
  type JSCodeshift,
  type TSTypeAnnotation,
  type VariableDeclaration,
} from "jscodeshift";
import { type ExpressionKind } from "../types";
import { createTypedIdentifier } from "./createTypedIdentifier";

export interface CreateLetOptions {
  j: JSCodeshift;
  id: string;
  type: TSTypeAnnotation["typeAnnotation"];
  value?: ExpressionKind;
  isTypescript: boolean;
}

export function createLet(options: CreateLetOptions): VariableDeclaration {
  const { j, id, value = null, type, isTypescript } = options;

  return j.variableDeclaration("let", [
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
}
