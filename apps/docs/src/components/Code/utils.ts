import { highlight, languages } from "prismjs";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-tsx";
import "prismjs/components/prism-css";
import "prismjs/components/prism-scss";
import "prismjs/components/prism-css-extras";
import "prismjs/components/prism-markup";
import "prismjs/components/prism-markdown";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-git";
import "prismjs/components/prism-diff";
import "prismjs/components/prism-json";
import "prismjs/components/prism-properties";
import type {
  DangerouslyHighlightCode,
  GetCodeLanguage,
} from "react-marked-renderer";

export const getLanguage: GetCodeLanguage = (lang, _rawCode) => {
  // allow aliases
  lang = lang === "sh" ? "shell" : lang;

  // if the Prism doesn't support the language, default to nothing instead
  // of crashing
  if (!languages[lang]) {
    return "markup";
  }

  return lang;
};

export const highlightCode: DangerouslyHighlightCode = (code, lang) =>
  highlight(code, languages[lang], lang);
