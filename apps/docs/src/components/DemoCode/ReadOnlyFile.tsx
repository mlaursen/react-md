import { type ReadonlyCodeFile } from "@react-md/code/types";
import { type ReactElement } from "react";

import { MarkdownCode } from "../MarkdownCode.jsx";
import { TypescriptCodeBlock } from "../TypescriptCodeBlock.jsx";

export interface ReadOnlyFileProps {
  file: ReadonlyCodeFile;
}

export function ReadOnlyFile(props: ReadOnlyFileProps): ReactElement {
  const { file } = props;
  if ("compiled" in file) {
    return (
      <TypescriptCodeBlock
        isTsx={file.name.endsWith(".tsx")}
        tsCode={file.code}
        jsCode={file.compiled}
        disableAppBar
      />
    );
  }

  return <MarkdownCode language={file.lang}>{file.code}</MarkdownCode>;
}
