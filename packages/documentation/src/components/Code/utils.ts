import { highlight, languages } from "prismjs";
import {
  DangerouslyHighlightCode,
  GetCodeLanguage,
} from "react-marked-renderer";

export const getLanguage: GetCodeLanguage = (lang, _rawCode) => {
  // allow aliases
  lang = lang === "sh" ? "shell" : lang;

  // if the Prism doesn't support the language, default to nothing instead
  // of crashing
  if (!languages[lang]) {
    return "none";
  }

  return lang;
};

export const highlightCode: DangerouslyHighlightCode = (code, lang) =>
  highlight(code, languages[lang], lang);
