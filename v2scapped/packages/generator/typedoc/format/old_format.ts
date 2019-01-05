import {
  isTypeSimple,
  isTypeUnion,
  isTypeReference,
  isTypeArray,
  isTypeReflection,
  isTypeLibraryReference,
  isTypeIntersection,
} from "./isType";
import {
  ISimpleValueType,
  ITypeUnion,
  ITypeDefinition,
  ITypeReference,
  ITypeReflection,
  ITypeArray,
  ITypeShape,
  TypeValue,
  ICommentableDeclaration,
  DeclarationComment,
  ITypeReflectionDeclaration,
  ITypeFunctionDeclaration,
} from "./typedoc.d";
import { Reflection } from "typedoc";

function formatTypeUnion(union: ITypeUnion, excludeUndefined: boolean = true): string {
  return union.types
    .map(type => {
      if (excludeUndefined && (type.value || type.name) === "undefined") {
        return "";
      }

      return getTypeValue({ type }, excludeUndefined);
    })
    .filter(Boolean)
    .join(" | ");
}

function formateTypeReference(reference: ITypeReference, excludeUndefined: boolean = true): string {
  const { name = "", typeArguments } = reference;
  if (!typeArguments) {
    return name;
  }

  return `${name}<${typeArguments
    .map(arg => getTypeValue({ type: arg }, excludeUndefined))
    .join(" | ")}>`;
}

function formatFunctionReflectionType(
  functionReflection: ITypeFunctionDeclaration,
  excludeUndefined: boolean = true
) {
  const call = functionReflection.signatures.find(
    ({ kindString }) => kindString === "Call signature"
  );
  if (!call) {
    return "";
  }

  const returnValue = getTypeValue(call, excludeUndefined);
  const parameters = call.parameters
    .map(
      param => `${param.name}: ${shapeReflectionToString(getTypeValue(param, excludeUndefined))}`
    )
    .join(", ");
  return `(${parameters}) => ${returnValue}`;
  // return call.parameters
  //   .map(param => ({
  //     name: param.name,
  //     value: getTypeValue(param, excludeUndefined),
  //   }))
  //   .map(({ name, value }) => `${name}: ${shapeReflectionToString(value)}`)
  //   .join(", ");
}

function shapeReflectionToString(typeValue: TypeValue): string {
  if (typeof typeValue === "string") {
    return typeValue;
  } else if (Array.isArray(typeValue)) {
    console.log("IUNNO");
    return "[]";
  }

  const inner = Object.keys(typeValue).reduce((s, key) => {
    const value = typeValue[key];
    const k = /-/.test(key) ? `"${key}"` : key;
    let v = value;
    if (Array.isArray(value)) {
      console.log("EEP");
      v = "[]";
    } else if (typeof value !== "string") {
      v = shapeReflectionToString(v as ITypeShape);
    }

    return `${s ? `${s}, ` : ""}${k}: ${v}`;
  }, "");

  return `{ ${inner} }`;
}

function formatShapeReflectionDeclaration(
  shapeDeclaration: ITypeReflectionDeclaration,
  excludeUndefined: boolean = true
): ITypeShape {
  return shapeDeclaration.children.reduce<ITypeShape>((shape, attribute) => {
    shape[attribute.name] = getTypeValue({ type: attribute.type }, excludeUndefined);
    return shape;
  }, {});
}

function formatReflectionType(
  reflection: ITypeReflection,
  excludeUndefined: boolean = true
): ITypeShape | string {
  const { signatures, children } = reflection.declaration;
  if (children) {
    return formatShapeReflectionDeclaration(
      reflection.declaration as ITypeReflectionDeclaration,
      excludeUndefined
    );
  } else if (signatures) {
    return formatFunctionReflectionType(
      reflection.declaration as ITypeFunctionDeclaration,
      excludeUndefined
    );
  }

  return {};
}

/**
 * Get's a "pretty" version of a type or interface's value.
 *
 * @param typeDefinition - The current type definition to get a value for
 * @param excludeUndefined - Boolean if undefined values should be excluded. This is enabled
 * by default since it can be derived from the `flags: { isRequired: true }`
 */
export function getTypeValue(
  typeDefinition: ITypeDefinition,
  excludeUndefined: boolean = true
): TypeValue {
  if (isTypeSimple(typeDefinition)) {
    const t = typeDefinition.type as ISimpleValueType;
    return t.value || t.name || "";
  } else if (isTypeUnion(typeDefinition)) {
    return formatTypeUnion(typeDefinition.type as ITypeUnion, excludeUndefined);
  } else if (isTypeReference(typeDefinition)) {
    return formateTypeReference(typeDefinition.type as ITypeReference, excludeUndefined);
  } else if (isTypeArray(typeDefinition)) {
    const arrayType = typeDefinition.type as ITypeArray;
    return getTypeValue({ type: arrayType.elementType }, excludeUndefined);
  } else if (isTypeReflection(typeDefinition)) {
    return formatReflectionType(typeDefinition.type as ITypeReflection, excludeUndefined);
  } else if (isTypeIntersection(typeDefinition)) {
    // console.log("INTERSECTION");
    // console.log(typeDefinition.name);
    // console.log("\n\n");
    // continue work here
  } else {
    // console.log("UNKNOWN", typeDefinition);
  }

  return "";
}
