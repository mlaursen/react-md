import {
  Example,
  FunctionSassDoc,
  Item,
  Link,
  MixinSassDoc,
  Parameter,
  See,
  Throw,
  VariableSassDoc,
} from "sassdoc";
import { compileScss } from "../compileScss";
import { tempStylesFolder } from "../paths";
import { format } from "../utils";
import {
  BaseFormattedSassDoc,
  FormattedFunctionSassDoc,
  FormattedMixinSassDoc,
  FormattedSassDocExample,
  FormattedVariableSassDoc,
  SassDocReference,
} from "./types.d";
import {
  hackSCSSVariableValue,
  isVariableDerived,
  HackedVariableValue,
  HackedVariablePrimitive,
  HackedVar,
} from "./variables";

function createReferenceLink(see: See, references: SassDocReference[]) {
  const {
    description = "",
    context: { name, type },
  } = see;
  const link = references.find(r => r.name === name && r.type === type);
  if (!link) {
    console.error(`Unable to find a sassdoc reference link for \`${name}\``);
    process.exit(1);
  } else if (link.private) {
    return null;
  }

  return {
    name,
    type,
    description,
    group: link.group,
  };
}

function formatSassDoc(
  item: Item,
  references: SassDocReference[]
): BaseFormattedSassDoc {
  const {
    context: { name, value },
    description = "",
    file: { path: file },
    group,
    link: links = [] as Link[],
  } = item;

  const see = (item.see || ([] as See[]))
    .map(s => createReferenceLink(s, references))
    .filter((linkTo, i, list) => {
      if (!linkTo) {
        return false;
      }

      return i === list.findIndex(item => item && item.name === linkTo.name);
    });

  const type = item.type || item.context.type;
  if (!type) {
    console.error(`${name} does not have a valid Sass Data Type.`);
    console.error();
    process.exit(1);
  }

  return {
    name,
    type: item.type || item.context.type,
    description,
    file,
    group: group[0],
    see,
    links,
  };
}

function hackedVariableToString(value: HackedVariableValue) {
  if (value === null) {
    return "null";
  } else if (["number", "string", "boolean"].includes(typeof value)) {
    return `${value}`;
  } else if (value[0] === null || typeof value[0] !== "object") {
    return format(
      `export default ${JSON.stringify(value as HackedVariablePrimitive[])}`
    ).substring("export defalt ".length);
  }

  const prefix = "$fake: ";
  const formatted = format(
    `${prefix}(
  ${(value as HackedVar[])
    .map(({ name, value }) => `${name}: ${hackedVariableToString(value)}`)
    .join(",\n")}
  )`,
    "scss"
  );

  return formatted.substring(prefix.length);
}

/**
 * Creates a formatted sassdoc for the variable type that has stripped away
 * all the information that is not needed for the documentation site as well
 * as some nice things like derived values.
 */
export function formatVariableSassDoc(
  sassdoc: VariableSassDoc,
  references: SassDocReference[]
): FormattedVariableSassDoc {
  const {
    context: { name, value, scope },
    description,
    file: { path: pathname },
    type,
    link: links = [] as Link[],
  } = sassdoc;

  const code = `$${name}: ${value}${scope === "default" ? " !default" : ""}`;
  const packageName = pathname.substring(0, pathname.indexOf("/"));
  const hackedValue = hackSCSSVariableValue({
    scssVariable: sassdoc,
    packageName,
    importPath: pathname,
    includePaths: [tempStylesFolder],
  }).value;

  const formattedValue = hackedVariableToString(hackedValue);

  return {
    ...formatSassDoc(sassdoc, references),
    code,
    derived: isVariableDerived(value),
    value: formattedValue,
  };
}

interface ParameterizedCodeOptions {
  type: "mixin" | "function";
  name: string;
  code: string;
  parameters: Parameter[];
}

function createParameterizedCode({
  type,
  name,
  code,
  parameters,
}: ParameterizedCodeOptions) {
  let params = "";
  if (parameters.length) {
    params = parameters
      .map(param => {
        const { name } = param;
        const defaultValue = (param.default || "").replace(/^rmd/, "$rmd");
        const suffix = defaultValue && `: ${defaultValue}`;

        return `$${name}: ${defaultValue}`;
      })
      .join(", ");
    params = `(${params})`;
  }

  return `@${type} ${name}${params} {${code}}`;
}

function removeUncompilableCode(code: string) {
  const startString = "// START_NO_COMPILE";
  const endString = "// END_NO_COMPILE";
  let startIndex = code.indexOf(startString);
  let endIndex = code.indexOf(endString);
  while (startIndex !== -1 && endIndex !== -1) {
    const whitespace = code.match(/\s*\/\/ START_NO_COMPILE/);
    const whitespaceCount = whitespace ? whitespace[0].indexOf("/") : 0;
    code = `${code.substring(0, startIndex - whitespaceCount)}${code.substring(
      endIndex + endString.length + 1
    )}`;
    startIndex = code.indexOf(startString);
    endIndex = code.indexOf(endString);
  }

  return code;
}

function removeUncompilableCodeComments(code: string) {
  return code.replace(/\s*\/\/ (START|END)_NO_COMPILE\r?\n/g, "\n");
}

function compileExampleCode(example: Example, packages: string[]) {
  if (example.type !== "scss") {
    return null;
  }

  const data = `
${packages.map(p => `@import '@react-md/${p}/dist/mixins';`).join("\n")}
@import '@react-md/icon/dist/material-icons';

${removeUncompilableCode(example.code)}
  `;

  return format(
    compileScss(
      {
        data,
        customIncludePaths: [tempStylesFolder],
      },
      false
    ).css.toString(),
    "scss"
  );
}

function formatExamples(
  name: string,
  examples: Example[],
  packages: string[]
): FormattedSassDocExample[] {
  const formattedExamples: FormattedSassDocExample[] = [];
  let i = 0;
  while (i < examples.length) {
    const currentExample = examples[i];
    const nextExample = examples[i + 1];

    try {
      const example: FormattedSassDocExample = {
        ...currentExample,
        code: removeUncompilableCode(currentExample.code),
        compiledCode: compileExampleCode(currentExample, packages),
      };

      if (
        nextExample &&
        nextExample.type === "html" &&
        nextExample.description === currentExample.description
      ) {
        i += 1;
        example.htmlExample = nextExample.code;
      }

      formattedExamples.push(example);

      i += 1;
    } catch (e) {
      const exampleName = currentExample.description;
      console.error(
        `There was a problem compiling the \`${name}'s\` examples.`
      );
      console.error(
        `Example ${exampleName} was the cause with the following code:`
      );
      console.error();
      console.error();
      console.error(currentExample.code);
      console.error();
      console.error();
      console.error(e);
      process.exit(1);
    }
  }

  return formattedExamples;
}

function formatParameterizedSassDoc(
  item: FunctionSassDoc | MixinSassDoc,
  references: SassDocReference[],
  packages: string[]
) {
  const {
    context: { type, name },
    throw: throws = [] as Throw,
    example: examples = [] as Example[],
    parameter: parameters = [] as Parameter[],
  } = item;

  const code = createParameterizedCode({
    name,
    type,
    code: item.context.code,
    parameters,
  });
  const prefix = code.substring(0, code.indexOf("{") + 1);
  const suffix = code.substring(code.lastIndexOf("}"));
  const oneLineCode = `${prefix} \u2026 ${suffix}`;

  return {
    code,
    oneLineCode,
    throws,
    examples: formatExamples(name, examples, packages),
    parameters,
  };
}

/**
 * Creates a formatted sassdoc for the mixin types that stripped away everything
 * that is not needed for the documentation site. This also does some nice things
 * like formatting the example codes so that the compiled output can be shown as
 * well.
 */
export function formatMixinSassDoc(
  sassdoc: MixinSassDoc,
  references: SassDocReference[],
  packages: string[]
): FormattedMixinSassDoc {
  return {
    ...formatSassDoc(sassdoc, references),
    ...formatParameterizedSassDoc(sassdoc, references, packages),
  };
}

/**
 * Creates a formatted sassdoc for the function types that stripped away everything
 * that is not needed for the documentation site. This also does some nice things
 * like formatting the example codes so that the compiled output can be shown as
 * well.
 */
export function formatFunctionSassDoc(
  sassdoc: FunctionSassDoc,
  references: SassDocReference[],
  packages: string[]
): FormattedFunctionSassDoc {
  if (!sassdoc.return) {
    console.error(
      `${
        sassdoc.context.name
      } does not have a return declaration but it is a function.`
    );
    console.error();
    process.exit(1);
  }

  return {
    ...formatSassDoc(sassdoc, references),
    ...formatParameterizedSassDoc(sassdoc, references, packages),
    returns: sassdoc.return,
  };
}
