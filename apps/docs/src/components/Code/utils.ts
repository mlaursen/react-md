const LINE_THRESHOLD = 3;
const NO_LINES_LANGUAGES = new Set(["markup", "markdown", "shell"]);
const JSX_PROPERTY_REGEX = /([a-z][A-Za-z0-9]+)(="([^"]+)")?\s?/g;

export const getLineCount = (code: string): number | undefined => {
  const lines = code.split(/\r?\n/).length;

  return lines > LINE_THRESHOLD ? lines : undefined;
};

export interface ParseCodeOptions {
  code: string;
  lang: string;
  fileName?: string;
}

interface ParsedCode {
  code: string;
  lines?: number;
  fileName?: string;
}

export function parseCode(options: ParseCodeOptions): ParsedCode {
  let { code, fileName } = options;
  const { lang } = options;

  if (code.startsWith("//")) {
    if (!code.startsWith("// ")) {
      throw new Error("Special code props must start with `// `");
    }

    const newLine = code.indexOf("\n");
    const propLine = code.substring(3, newLine);
    let count = 0;
    let match: RegExpExecArray | null;
    while ((match = JSX_PROPERTY_REGEX.exec(propLine)) && count++ < 20) {
      const [, name, , value] = match;
      switch (name) {
        case "fileName":
          fileName = value;
          break;
        default:
          throw new Error(`Unsupported code property: ${name}`);
      }
    }

    code = code.substring(newLine + 1);
  }

  if (lang === "diff") {
    code = code.replace(/(\r?\n)+$/, "");
  } else {
    code = code.trim();
  }

  let lines: number | undefined;
  if (!NO_LINES_LANGUAGES.has(lang)) {
    lines = getLineCount(code);
  }

  return {
    code,
    lines,
    fileName,
  };
}
