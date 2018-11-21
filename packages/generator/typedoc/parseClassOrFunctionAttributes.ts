import * as TypeDoc from "typedoc";

const REACT_INTERNAL_REFERENCE = /^(Component|New|Deprecated)(Lifecycle)?/;

interface IReference {
  name: string;
  type: string;
}

function isReactInternalReference({ name, type }: IReference) {
  return type === "reference" && REACT_INTERNAL_REFERENCE.test(name);
}

function isAttributeWorthDocumenting(attribute: TypeDoc.DeclarationReflection) {
  const {
    kindString,
    flags: { isPrivate },
    inheritedFrom,
    overwrites,
  } = attribute;
  if (isPrivate || REACT_INTERNAL_REFERENCE.test(kindString)) {
    return false;
  } else if (inheritedFrom || overwrites) {
    // documented as only have type, but has name in json
    // @ts-ignore
    const reference: IReference = inheritedFrom || overwrites;
    return isReactInternalReference(reference);
  }

  return true;
}

function isHTMLAttribute(attribute: TypeDoc.DeclarationReflection) {
  // documented as only have type, but has name in json
  // @ts-ignore
  const inheritedFrom: IReference = attribute.inheritedFrom;
  if (!inheritedFrom) {
    return false;
  }

  const { name, type } = inheritedFrom;
  return type === "reference" && /^HTMLAttributes\./.test(name);
}

interface IHTMLAttributes {
  [key: string]: any;
}

interface IDocumentableAttributes {
  html?: IHTMLAttributes;
}

export default function parseClassOrFunctionAttributes(
  attributes: TypeDoc.DeclarationReflection[]
) {
  return attributes
    .filter(isAttributeWorthDocumenting)
    .reduce<IDocumentableAttributes>((groups, attribute) => {
      if (isHTMLAttribute(attribute)) {
        const { name } = attribute;
        console.log("name:", name);
        groups.html = groups.html = {};
      }

      return groups;
    }, {});
}
