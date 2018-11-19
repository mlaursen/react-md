import prettier from "prettier";
import {
  Comment,
  Reflection,
  Type,
  StringLiteralType,
  IntrinsicType,
  UnionType,
  ReferenceType,
  ProjectReflection,
  DeclarationReflection,
  ReflectionKind,
  ReflectionType,
  ArrayType,
} from "typedoc/dist/lib/models";

function getPrettierParser(codeType: string) {
  switch (codeType) {
    case "ts":
    case "tsx":
      return "typescript";
    case "js":
    case "jsx":
      return "babylon";
    case "css":
      return "css";
    case "scss":
      return "scss";
    default:
      return "markdown";
  }
}

function formatCode(code: string, codeType: string) {
  return prettier.format(code, {
    printWidth: 80,
    trailingComma: "es5",
    tabWidth: 2,
    semi: true,
    singleQuote: /jsx?|s?css/.test(codeType),
    bracketSpacing: true,
    jsxBracketSameLine: false,
    arrowParens: "avoid",
    parser: getPrettierParser(codeType),
  });
}

/**
 * Parses a typedoc comment string and formats the comment with a few additional rules. If there
 * are any code blocks within the comment, each code block will be extracted, formatted with
 * perttier, and returned into the comment in the same place.
 *
 * @param comment The comment to parse and format.
 */
export function parseAndFormatComment(comment: Comment | string | undefined): string {
  if (!comment) {
    return "";
  }

  let commentString = "";
  if (typeof comment !== "string") {
    const { text = "", shortText = "" /*, tags = []*/ } = comment;
    commentString = `${shortText}${text}`;
  }

  let prefix = commentString;
  let codeBlock = "";
  let suffix = "";

  const [codeBlockStart = "", codeType = ""] = commentString.match(/```(\w*)\r?\n/) || [];
  if (codeBlockStart) {
    const [codeBlockEnd = ""] = commentString.match(/```\r?\n/) || [];
    if (!codeBlockEnd) {
      throw new Error(`Found a code block that does not have an ending tag.`);
    }

    const codeBlockStartIndex = commentString.indexOf(codeBlockStart);
    const remainingComment = commentString.substring(codeBlockStartIndex + codeBlockStart.length);
    const codeEndIndex = remainingComment.indexOf(codeBlockEnd);

    prefix = commentString.substring(0, codeBlockStartIndex);
    codeBlock = formatCode(remainingComment.substring(0, codeEndIndex), codeType);
    codeBlock = `${codeBlockStart}${codeBlock}${codeBlockEnd}`;
    suffix = remainingComment.substring(codeEndIndex + codeBlockEnd.length);

    if (suffix) {
      suffix = parseAndFormatComment(commentString);
    }
  }

  // Remove newlines that occur within sentences since the typedoc comments keep
  // newlines even when they are for max-length issues instead of in code blocks
  prefix = prefix.replace(/(\w)\r?\n(\w)?/g, "$1 $2");

  return `${prefix}${codeBlock}${suffix}`;
}

export function getSource(reflection: Reflection) {
  const [source] = reflection.sources;
  if (!source) {
    throw new Error(`Unable to get a source for reflection: ${reflection.name}`);
  }

  const path = (source.file && source.file.fullFileName) || source.fileName;
  return {
    line: source.line,
    path: path.substring(path.indexOf("react-md")),
  };
}

let printed = false;

function formatIntrinsicType(type: IntrinsicType): string {
  const { name } = type;
  if (name === "undefined") {
    return "";
  }

  return name;
}

function formatUnionType(type: UnionType, project: ProjectReflection): string {
  const value = type.types
    .map(subType => getTypeValue(subType, project))
    .filter(Boolean)
    .join(" | ");

  if (value === "false | true" || value === "true | false") {
    return "boolean";
  }

  return value;
}

function formatReferenceType(type: ReferenceType, project: ProjectReflection) {
  if (/^(React|CSSProperties)/.test(type.name) || type.name.includes("EventHandler")) {
    return type.name;
  }

  const reference = project.findReflectionByName(type.name) as DeclarationReflection;
  if (reference && reference.kindOf(ReflectionKind.TypeAlias)) {
    return getTypeValue(reference.type, project);
  }

  return "";
}

function formatFunctionReflectionType(
  declaration: DeclarationReflection,
  project: ProjectReflection
): string {
  const callSignature = declaration.signatures.find(sig =>
    sig.kindOf(ReflectionKind.CallSignature)
  );
  if (!callSignature) {
    throw new Error();
  }

  const returnValue = getTypeValue(callSignature.type, project);
  const parameters = (callSignature.parameters || [])
    .map(param => {
      const v = getTypeValue(param.type, project);
      if (param.defaultValue) {
        return `${v.replace(":", "?:")} = ${param.defaultValue}`;
      }

      return v;
    })
    .join(", ");

  return `(${parameters}) => ${returnValue}`;
}

function formatObjectReflection(
  declaration: DeclarationReflection,
  project: ProjectReflection
): string {
  const formatted = declaration.children
    .map(attribute => `${attribute.name}: ${getTypeValue(attribute.type, project)}`)
    .join(", ");

  return `{ ${formatted} }`;
}

function formatReflectionType(type: ReflectionType, project: ProjectReflection): string {
  const { declaration } = type;
  if (declaration.signatures) {
    return formatFunctionReflectionType(declaration, project);
  } else if (declaration.children) {
    return formatObjectReflection(declaration, project);
  }

  return "";
}

function formatArrayType(type: ArrayType, project: ProjectReflection): string {
  const { elementType } = type;
  if (elementType.type === "intrinsic") {
    return type.toString();
  }

  return `Array<${getTypeValue(type.elementType, project)}>`;
}

export function getTypeValue(type: Type, project: ProjectReflection): string {
  switch (type.type) {
    case "stringLiteral":
      return (type as StringLiteralType).value;
    case "intrinsic":
    case "unknown":
      return formatIntrinsicType(type as IntrinsicType);
    case "union":
      return formatUnionType(type as UnionType, project);
    case "reference":
      return formatReferenceType(type as ReferenceType, project);
    case "reflection":
      return formatReflectionType(type as ReflectionType, project);
    case "array":
      return formatArrayType(type as ArrayType, project);
    case "typeOperator":
      return "";
    default:
      if (!printed) {
        console.log("type:", type.type);
        console.log("typeObject: ", type.toObject());
        printed = true;
      }
      return "";
  }
}
