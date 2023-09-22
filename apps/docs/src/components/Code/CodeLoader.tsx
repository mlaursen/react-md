import { readFile } from "node:fs/promises";
import { type ReactElement } from "react";
import { HighlightedCodeBlock } from "./HighlightedCodeBlock.jsx";
import { CodeEditor } from "./CodeEditor.jsx";

export interface CodeLoaderProps {
  source: string;
  importUrl: string;
  editable?: boolean;
}

/**
 * RSC that is used to load code from MDX.
 */
export async function CodeLoader(
  props: CodeLoaderProps
): Promise<ReactElement> {
  const { source, importUrl, editable } = props;
  const contents = await readFile(new URL(source, importUrl), "utf8");
  // const fileName = join(dirname.replace(".next/server", "src"), source);
  // const contents = await readFile(fileName, "utf8");
  const lang = source.substring(source.lastIndexOf(".") + 1);

  if (editable) {
    return <CodeEditor defaultCode={contents} />;
  }

  return (
    <HighlightedCodeBlock multiline className={`language-${lang}`}>
      {contents}
    </HighlightedCodeBlock>
  );
}
