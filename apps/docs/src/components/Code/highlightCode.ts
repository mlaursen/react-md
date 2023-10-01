import Prism from "prismjs";

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

Prism.manual = true;

export const highlightCode = (code: string, lang: string): string =>
  Prism.highlight(code, Prism.languages[lang], lang);