import { CodeBlock } from "@/components/CodeBlock.jsx";
import { highlightCode } from "@/utils/highlightCode.js";
import { type ReactElement } from "react";
import styles from "./CopyCode.module.scss";

export interface CopyCodeProps {
  lang?: "tsx" | "html" | "scss";
  children: string;
}

export function CopyCode(props: CopyCodeProps): ReactElement {
  const { lang = "tsx", children } = props;
  const className = `language-${lang}`;
  return (
    <CodeBlock
      className={className}
      containerProps={{
        className: styles.container,
      }}
      lineWrap
    >
      <code
        className={className}
        dangerouslySetInnerHTML={{ __html: highlightCode(children, lang) }}
      />
    </CodeBlock>
  );
}
