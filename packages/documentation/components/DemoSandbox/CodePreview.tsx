import React, { FC, useEffect, useRef } from "react";
import { bem } from "@react-md/theme";
import { IFiles } from "codesandbox-import-utils/lib/api/define";

import { CodeBlock } from "components/Code";

import FileNotFound from "./FileNotFound";

export interface CodePreviewProps {
  fileName: string;
  sandbox: IFiles | null;
  offset: boolean;
  onFileChange: (fileName: string) => void;
}

const block = bem("sandbox-modal");

const CodePreview: FC<CodePreviewProps> = ({
  fileName,
  sandbox,
  offset,
  onFileChange,
}) => {
  let content = "";
  let language = "markdown";
  if (sandbox && sandbox[fileName]) {
    language = fileName.substring(fileName.lastIndexOf(".") + 1);
    ({ content } = sandbox[fileName]);
  }

  const code = useRef<HTMLPreElement | null>(null);
  useEffect(() => {
    if (code.current) {
      code.current.scrollTop = 0;
    }
  }, [content]);

  if (!content) {
    return (
      <FileNotFound
        fileName={fileName}
        sandbox={sandbox}
        offset={offset}
        onFileChange={onFileChange}
      />
    );
  }

  return (
    <CodeBlock
      ref={code}
      language={language}
      className={block("code", { offset })}
      lineNumbers
    >
      {content}
    </CodeBlock>
  );
};

export default CodePreview;
