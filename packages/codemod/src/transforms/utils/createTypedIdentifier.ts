import {
  type Identifier,
  type JSCodeshift,
  type TSTypeAnnotation,
} from "jscodeshift";

export interface CreateTypedIdentifierOptions {
  j: JSCodeshift;
  name: string;
  type: TSTypeAnnotation["typeAnnotation"];
  isTypescript: boolean;
}

export function createTypedIdentifier(
  options: CreateTypedIdentifierOptions
): Identifier {
  const { j, name, type, isTypescript } = options;

  const identifier = j.identifier(name);
  if (isTypescript) {
    identifier.typeAnnotation = j.tsTypeAnnotation(type);
  }

  return identifier;
}
