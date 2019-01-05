import { ITypeDefinition, ITypeReference } from "./typedoc.d";
import _ from "lodash";

function getTypeValue(typeDefinition: ITypeDefinition): string {
  return _.get(typeDefinition, "type.type", "");
}

export function isTypeSimple(typeDefinition: ITypeDefinition) {
  return /intrinsic|stringLiteral/.test(getTypeValue(typeDefinition));
}

/**
 * Checks if the provided type definition is a union of types.
 */
export function isTypeUnion(typeDefinition: ITypeDefinition) {
  return getTypeValue(typeDefinition) === "union";
}

/**
 * Checks if the provided type definition is a reference type.
 */
export function isTypeReference(typeDefinition: ITypeDefinition) {
  return getTypeValue(typeDefinition) === "reference";
}

/**
 * Checks if the provided type definition is a reference type AND the type came from
 * the main typescript lib or the react lib.
 *
 * This is really only used when getting base type definitions.
 */
export function isTypeLibraryReference(typeDefinition: ITypeDefinition) {
  if (!isTypeReference(typeDefinition)) {
    return false;
  }

  const name = (typeDefinition.type as ITypeReference).name;
  return /EventHandler|CSSProperties|React/.test(name);
}

/**
 * Checks if the provided type definition is a reflection type. AKA an object
 */
export function isTypeReflection(typeDefinition: ITypeDefinition) {
  return getTypeValue(typeDefinition) === "reflection";
}

export function isTypeIntersection(typeDefinition: ITypeDefinition) {
  return getTypeValue(typeDefinition) === "intersection";
}

/**
 * Checks if the provided type definition is an array.
 */
export function isTypeArray(typeDefinition: ITypeDefinition) {
  return getTypeValue(typeDefinition) === "array";
}
