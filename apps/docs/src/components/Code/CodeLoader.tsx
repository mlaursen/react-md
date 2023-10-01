import { convertTsToJs } from "@/utils/convertTsToJs.js";
import { readFile } from "node:fs/promises";
import { type ReactElement } from "react";
import { CodeEditorContainer } from "./CodeEditorContainer.jsx";
import { CodePreview } from "./CodePreview.jsx";
import { HighlightedCodeBlock } from "./HighlightedCodeBlock.jsx";

export interface CodeLoaderProps {
  source: string;
  importUrl: string;
  preview?: boolean;
  previewCard?: boolean;
  previewCardClassName?: string;
  editable?: boolean;
}

/**
 * RSC that is used to load code from MDX.
 *
 * TODO: I need to convert most of this into an API or script instead so it can
 * be cached at build time. Right now this will run in production as well
 */
export async function CodeLoader(
  props: CodeLoaderProps
): Promise<ReactElement> {
  const {
    source,
    importUrl,
    preview,
    previewCard,
    previewCardClassName,
    editable,
  } = props;
  const contents = await readFile(new URL(source, importUrl), "utf8");
  const lang = source.substring(source.lastIndexOf(".") + 1);

  if (editable) {
    if (lang !== "tsx") {
      throw new Error(
        "This language is unsupported for live editing right now."
      );
    }

    const jsCode = await convertTsToJs(contents);
    return (
      <CodeEditorContainer
        defaultTsCode={contents.trim()}
        defaultJsCode={jsCode}
        previewCard={previewCard}
        previewCardClassName={previewCardClassName}
      />
    );
  }

  return (
    <>
      {preview && (
        <CodePreview
          code={contents}
          card={previewCard}
          cardClassName={previewCardClassName}
        />
      )}
      <HighlightedCodeBlock lang={lang} multiline>
        {contents}
      </HighlightedCodeBlock>
    </>
  );
}
