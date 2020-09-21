import React, { FC, useEffect, useRef } from "react";
import cn from "classnames";
import { IFiles } from "codesandbox-import-utils/lib/api/define";
import { CircularProgress } from "@react-md/progress";

import { CodeBlock } from "components/Code";

import FileNotFound from "./FileNotFound";

import styles from "./CodePreview.module.scss";

export interface CodePreviewProps {
  loading: boolean;
  fileName: string;
  sandbox: IFiles | null;
  offset: boolean;
  onFileChange: (fileName: string) => void;
}

const CodePreview: FC<CodePreviewProps> = ({
  fileName,
  sandbox,
  offset,
  loading,
  onFileChange,
}) => {
  let content = "";
  let language = "markdown";
  if (sandbox && sandbox[fileName]) {
    if (fileName.endsWith(".env")) {
      language = "properties";
    } else {
      language = fileName.substring(fileName.lastIndexOf(".") + 1);
    }

    ({ content } = sandbox[fileName]);
    if (typeof content !== "string") {
      content = `${JSON.stringify(content, null, 2)}\n`;
    }
  }

  const code = useRef<HTMLPreElement | null>(null);
  useEffect(() => {
    if (code.current) {
      code.current.scrollTop = 0;
    }
  }, [content]);

  if (loading) {
    return <CircularProgress id="loading-code" />;
  }

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
      className={cn(styles.code, {
        [styles.offset]: offset,
      })}
      lineNumbers
      // need to make this focusable so keyboard users can scoll
      // the page
      tabIndex={0}
    >
      {content}
    </CodeBlock>
  );
};

export default CodePreview;
