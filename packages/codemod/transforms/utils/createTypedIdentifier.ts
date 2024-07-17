import {
  type Identifier,
  type JSCodeshift,
  type TSTypeReference,
} from "jscodeshift";

export interface CreateTypedIdentifierOptions {
  j: JSCodeshift;
  name: string;
  isTypescript: boolean;
  type: TSTypeReference;
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
