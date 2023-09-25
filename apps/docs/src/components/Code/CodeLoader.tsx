import { readFile } from "node:fs/promises";
import { type ReactElement } from "react";
import { CodeEditor } from "./CodeEditor.jsx";
import { CodePreview } from "./CodePreview.jsx";
import { HighlightedCodeBlock } from "./HighlightedCodeBlock.jsx";

export interface CodeLoaderProps {
  source: string;
  importUrl: string;
  preview?: boolean;
  editable?: boolean;
  containerClassName?: string;
}

/**
 * RSC that is used to load code from MDX.
 */
export async function CodeLoader(
  props: CodeLoaderProps
): Promise<ReactElement> {
  const { source, importUrl, containerClassName, preview, editable } = props;
  const contents = await readFile(new URL(source, importUrl), "utf8");
  const lang = source.substring(source.lastIndexOf(".") + 1);

  if (editable) {
    return <CodeEditor defaultCode={contents} />;
  }

  return (
    <>
      {preview && <CodePreview code={contents} />}
      <HighlightedCodeBlock
        lang={lang}
        multiline
        containerClassName={containerClassName}
      >
        {contents}
      </HighlightedCodeBlock>
    </>
  );
}
