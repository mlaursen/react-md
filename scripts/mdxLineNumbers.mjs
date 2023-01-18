import { visit } from "unist-util-visit";

const LANG_PREFIX = "language-";
const NO_LINES_LANGUAGES = new Set(["markup", "markdown", "shell"]);

const getLanguage = (node) => {
  const classNames = node.properties.className || [];
  for (let i = 0; i < classNames.length; i += 1) {
    const className = classNames[i];
    if (className.startsWith(LANG_PREFIX)) {
      const lang = className.slice(LANG_PREFIX.length);

      // set to the real value instead of using an alias
      if (lang === "sh") {
        classNames[i] = "language-shell";
        return "shell";
      }

      return lang;
    }
  }

  return "";
};

export default function mdxLineNumbers() {
  return (ast) => {
    visit(ast, "element", (node, _index, parent) => {
      if (!parent || parent.tagName !== "pre" || node.tagName !== "code") {
        return;
      }

      const lang = getLanguage(node);
      if (!lang) {
        return;
      }

      const lines = node.position.end.line - node.position.start.line - 1;
      if (lines > 3 && !NO_LINES_LANGUAGES.has(lang)) {
        parent.properties.lines = lines;
      }
    });
  };
}
