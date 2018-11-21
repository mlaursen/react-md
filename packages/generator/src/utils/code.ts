import prettier from "prettier";

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

export function formatCode(code: string, codeType: string) {
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
