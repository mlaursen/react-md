import { CodeBlock } from "@/components/CodeBlock.jsx";
import { highlightCode } from "@/utils/highlightCode.js";
import { cnb } from "cnbuilder";
import { type ReactElement } from "react";
import styles from "./CopyCode.module.scss";

export interface CopyCodeProps {
  lang?: "tsx" | "html" | "scss";
  children: string;
  className?: string;
  disableMarginTop?: boolean;
}

export function CopyCode(props: CopyCodeProps): ReactElement {
  const { lang = "tsx", className, children, disableMarginTop } = props;
  const languageClassName = `language-${lang}`;
  return (
    <CodeBlock
      className={cnb(languageClassName, className)}
      containerProps={{
        className: cnb(!disableMarginTop && styles.container),
      }}
      lineWrap
      disableMarginTop={disableMarginTop}
    >
      <code
        className={languageClassName}
        dangerouslySetInnerHTML={{ __html: highlightCode(children, lang) }}
      />
    </CodeBlock>
  );
}
