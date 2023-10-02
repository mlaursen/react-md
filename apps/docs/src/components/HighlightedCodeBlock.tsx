import { highlightCode } from "@/utils/highlightCode.js";
import { parseCodeBlock, type CodeJsxProps } from "@/utils/parseCodeBlock.js";
import { AppBarTitle } from "@react-md/core";
import { type ReactElement, type ReactNode } from "react";
import "server-only";
import { CodeBlock } from "./CodeBlock.jsx";
import { CodeBlockHeader } from "./CodeBlockHeader.jsx";
import { RunnableCodePreview } from "./DangerouslyRunCode/RunnableCodePreview.jsx";
import styles from "./HighlightedCodeBlock.module.scss";
import { InlineCode, type InlineCodeProps } from "./InlineCode.js";
import { PackageManagerCodeBlock } from "./PackageManagerCodeBlock.js";
import { TypescriptCode } from "./TypescriptCode.js";
import { TypescriptCodeEditor } from "./TypescriptCodeEditor.jsx";
import { ConfigureCodeLanguage } from "./WebsiteConfiguration/ConfigureCodeLanguage.jsx";

export interface HighlightedCodeBlockProps
  extends InlineCodeProps,
    CodeJsxProps {
  lang?: string;
  multiline?: boolean;
}

/**
 * **Server Component**
 *
 * This is used to highlight all code on the server (generally through MDX).
 * Since I'm not using any MDX plugins to use the rust compiler for MDX, there
 * is no good way to auto-detect code blocks so instead a `multiline` prop will
 * be cloned into this element when rendered as a child of a `<pre>`.
 */
export async function HighlightedCodeBlock(
  props: HighlightedCodeBlockProps
): Promise<ReactElement> {
  const {
    children,
    lang: propLang,
    fileName: propFileName,
    className = propLang ? `language-${propLang}` : "",
    multiline = !!propLang,
    ...remaining
  } = props;

  if (!className && !multiline) {
    return <InlineCode {...remaining}>{children}</InlineCode>;
  }

  if (typeof children !== "string") {
    throw new Error("Non-string code highlighting is not supported");
  }

  const {
    code,
    lang,
    fileName,
    preview,
    previewOptions,
    editable,
    packageManager,
    tsCode,
  } = await parseCodeBlock({
    code: children,
    lang: propLang,
    fileName: propFileName,
    className,
  });

  if (packageManager) {
    return <PackageManagerCodeBlock {...packageManager} />;
  }

  let header: ReactNode;
  if (fileName || tsCode) {
    header = (
      <CodeBlockHeader className={styles.dense}>
        {tsCode && <ConfigureCodeLanguage disableLabel />}
        {fileName && (
          <AppBarTitle type="subtitle-2" as="span">
            {fileName}
          </AppBarTitle>
        )}
      </CodeBlockHeader>
    );
  }

  if (editable && tsCode) {
    return (
      <TypescriptCodeEditor {...tsCode} preview={previewOptions}>
        {header}
      </TypescriptCodeEditor>
    );
  }

  return (
    <>
      {preview && <RunnableCodePreview code={code} {...previewOptions} />}
      {header}
      {tsCode && <TypescriptCode {...tsCode} />}
      {!tsCode && (
        <CodeBlock className={className} disableMarginTop={!!fileName}>
          <code
            {...remaining}
            className={className}
            dangerouslySetInnerHTML={{ __html: highlightCode(code, lang) }}
          />
        </CodeBlock>
      )}
    </>
  );
}
