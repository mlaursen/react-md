"use client";
import { useCodeLanguageContext } from "@/providers/CodeLanguageProvider.jsx";
import { cnb } from "cnbuilder";
import { type ReactElement } from "react";
import { CodeBlock } from "./CodeBlock.jsx";
import { CodeLanguageToggle } from "./CodeLanguageToggle.jsx";
import styles from "./TypescriptOrJavascriptCode.module.scss";

export interface TypescriptOrJavascriptCodeProps {
  tsHtml: string;
  jsHtml: string;
}

export function TypescriptOrJavascriptCode(
  props: TypescriptOrJavascriptCodeProps
): ReactElement {
  const { tsHtml, jsHtml } = props;
  const { codeLanguage } = useCodeLanguageContext();
  const className = `language-${codeLanguage}x`;
  const isTs = codeLanguage === "ts";

  return (
    <CodeBlock
      className={cnb(className, styles.container)}
      header={
        <>
          <CodeLanguageToggle />
        </>
      }
      headerProps={{ className: styles.header }}
    >
      <code
        className={className}
        dangerouslySetInnerHTML={{ __html: isTs ? tsHtml : jsHtml }}
      />
    </CodeBlock>
  );
}
