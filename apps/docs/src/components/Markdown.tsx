import inlineCodeStyles from "@/components/InlineCode.module.scss";
import { link, typography } from "@react-md/core";
import { marked } from "marked";
import { type HTMLAttributes, type ReactElement } from "react";
import "server-only";

const pClass = typography({
  type: "body-1",
});

const linkClass = link();

marked.use({
  renderer: {
    codespan(code) {
      return `<code class="${inlineCodeStyles.container}">${code}</code>`;
    },
    paragraph(text) {
      return `<p class="${pClass}">${text}</p>`;
    },
    link(href, title, text) {
      return `<a class="${linkClass}" href="${href}">${text}</a>`;
    },
  },
});

export interface MarkdownProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  markdown: string;
}

export function Markdown(props: MarkdownProps): ReactElement {
  const { markdown, ...remaining } = props;
  return (
    <div
      {...remaining}
      dangerouslySetInnerHTML={{ __html: marked(markdown) }}
    />
  );
}
