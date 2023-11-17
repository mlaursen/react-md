import { highlightCode } from "@/utils/highlightCode.js";
import { parseCodeBlock } from "@/utils/parseCodeBlock.js";
import { type ReactElement, type ReactNode } from "react";
import "server-only";
import { CodeBlock } from "./CodeBlock.jsx";
import { CodeBlockFileName } from "./CodeBlockFileName.jsx";
import { CodeBlockHeader } from "./CodeBlockHeader.jsx";
import { RunnableCodePreview } from "./DangerouslyRunCode/RunnableCodePreview.jsx";
import { FullDemoEditor } from "./FullDemoEditor.jsx";
import styles from "./HighlightedCodeBlock.module.scss";
import { InlineCode, type InlineCodeProps } from "./InlineCode.js";
import { PackageManagerCodeBlock } from "./PackageManagerCodeBlock.js";
import { ResetDemo } from "./ResetDemo.jsx";
import { ResettableProvider } from "./ResettableProvider.jsx";
import { TypescriptCode } from "./TypescriptCode.js";
import { TypescriptCodeEditor } from "./TypescriptCodeEditor.jsx";
import { ConfigureCodeLanguage } from "./WebsiteConfiguration/ConfigureCodeLanguage.jsx";

export interface HighlightedCodeBlockProps extends InlineCodeProps {
  lang?: string;
  fileName?: string;
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
    tsCode,
    fileName,
    preview,
    previewOptions,
    editable,
    scssModules,
    packageManager,
  } = await parseCodeBlock({
    code: children,
    lang: propLang,
    fileName: propFileName,
    className,
  });

  if (packageManager) {
    return <PackageManagerCodeBlock {...packageManager} />;
  }

  if (tsCode && scssModules) {
    return (
      <ResettableProvider>
        <FullDemoEditor
          // add the key so that changing the code in an mdx page will correctly
          // update the preview in dev mode
          key={tsCode.ts}
          {...tsCode}
          preview={previewOptions}
          scssModules={scssModules}
        />
      </ResettableProvider>
    );
  }

  let header: ReactNode;
  if (fileName || tsCode) {
    header = (
      <CodeBlockHeader className={styles.dense}>
        {tsCode && <ConfigureCodeLanguage disableLabel />}
        {fileName && <CodeBlockFileName>{fileName}</CodeBlockFileName>}
        {(preview || editable) && <ResetDemo />}
      </CodeBlockHeader>
    );
  }

  if (editable && tsCode) {
    return (
      <ResettableProvider>
        <TypescriptCodeEditor
          // add the key so that changing the code in an mdx page will correctly
          // update the preview in dev mode
          key={tsCode.ts}
          {...tsCode}
          preview={previewOptions}
        >
          {header}
        </TypescriptCodeEditor>
      </ResettableProvider>
    );
  }

  return (
    <>
      {preview && (
        <RunnableCodePreview
          // add the key so that changing the code in an mdx page will correctly
          // update the preview in dev mode
          key={code}
          code={code}
          {...previewOptions}
        />
      )}
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
      {scssModules?.map(({ css }) => <style key={css}>{css}</style>)}
    </>
  );
}
