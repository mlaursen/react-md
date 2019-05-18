import React, { FunctionComponent } from "react";
import { FlattenedFileTree } from "./useFiles";
import { bem } from "@react-md/theme";
import CodeBlock from "components/Code/CodeBlock";

export interface CodeProps {
  offset: boolean;
  files: FlattenedFileTree;
  fileId: string;
}

const block = bem("code-previewer");

const Code: FunctionComponent<CodeProps> = ({ files, fileId, offset }) => {
  let contents = "";
  let language = "markdown";
  if (fileId && files[fileId] && files[fileId].content) {
    contents = files[fileId].content || "";
    if (/\.tsx?$/.test(fileId)) {
      language = "typescript";
    } else if (/\.json$/.test(fileId)) {
      language = "json";
      contents = JSON.stringify(contents, null, 2);
    } else if (/\.env/.test(fileId)) {
      language = "bash";
    } else if (/\.scss$/.test(fileId)) {
      language = "scss";
    }
  }

  return (
    <CodeBlock
      language={language}
      className={block("code", { offset })}
      lineNumbers
    >
      {contents}
    </CodeBlock>
  );
};

export default Code;
