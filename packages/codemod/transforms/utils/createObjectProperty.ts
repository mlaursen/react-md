import { type JSCodeshift, type ObjectProperty } from "jscodeshift";

export interface CreateObjectPropertyOptions {
  j: JSCodeshift;
  name: string;
  local?: string;
}

export function createObjectProperty(
  options: CreateObjectPropertyOptions
): ObjectProperty {
  const { j, name, local = name } = options;
  const prop = j.objectProperty(j.identifier(name), j.identifier(local));
  if (name === local) {
    prop.shorthand = true;
  }

  return prop;
}
