"use client";

import { CodeEditor } from "@react-md/code/CodeEditor";
import { CodeEditorCopyToClipboard } from "@react-md/code/CodeEditorCopyToClipboard";
import { CodeEditorProgress } from "@react-md/code/CodeEditorProgress";
import { highlightCode } from "@react-md/code/prismjs/highlight";
import { type ScssCodeFile } from "@react-md/code/types";
import { useCodeEditHistory } from "@react-md/code/useCodeEditHistory";
import { useFocusCodeEditor } from "@react-md/code/useFocusCodeEditor";
import { cssUtils } from "@react-md/core/cssUtils";
import { Snackbar } from "@react-md/core/snackbar/Snackbar";
import { type ReactElement } from "react";

import styles from "./ScssCodeEditor.module.scss";
import { useScssCodeEditor } from "./useScssCodeEditor.js";

export interface ScssCodeEditorProps {
  demoName: string;
  isCssVisible: boolean;
  scssCodeFile: ScssCodeFile;
}

export function ScssCodeEditor(props: ScssCodeEditorProps): ReactElement {
  const { demoName, isCssVisible, scssCodeFile } = props;

  const defaultCode = scssCodeFile.code;
  const { code, editorRef, editorProps } = useCodeEditHistory({
    defaultCode,
  });
  const { focusEditorProps, onEditorKeyDown } = useFocusCodeEditor({
    editorRef,
    onEditorKeyDown: editorProps.onKeyDown,
  });
  const { error, compiled, compiling } = useScssCodeEditor({
    code,
    demoName,
    defaultCode,
    defaultCompiledCode: scssCodeFile.compiled,
  });

  const value = isCssVisible ? compiled : code;

  return (
    <>
      <CodeEditor
        disableMarginTop
        highlightCode={highlightCode}
        language={isCssVisible ? "css" : "scss"}
        editorProps={{
          ...editorProps,
          readOnly: isCssVisible,
          value,
          onKeyDown: onEditorKeyDown,
        }}
        focusEditorProps={focusEditorProps}
        fixedChildren={
          <>
            {compiling && <CodeEditorProgress />}
            <CodeEditorCopyToClipboard copyText={code} />
            {error && (
              <pre
                className={cssUtils({
                  className: styles.tooltip,
                  textColor: "error",
                })}
              >
                <code>{error.message}</code>
              </pre>
            )}
            <Snackbar
              position="bottom-right"
              absolute
              disablePortal
              toastDefaults={{ closeButton: true }}
            />
          </>
        }
      >
        {value}
      </CodeEditor>
      <style dangerouslySetInnerHTML={{ __html: compiled }} />
    </>
  );
}
