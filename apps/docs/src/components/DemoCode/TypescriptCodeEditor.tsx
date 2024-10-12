import { CodeEditor } from "@react-md/code/CodeEditor";
import { CodeEditorCopyToClipboard } from "@react-md/code/CodeEditorCopyToClipboard";
import { highlightCode } from "@react-md/code/prismjs/highlight";
import { type CodeEditHistoryImplementation } from "@react-md/code/useCodeEditHistory";
import { useFocusCodeEditor } from "@react-md/code/useFocusCodeEditor";
import { Snackbar } from "@react-md/core/snackbar/Snackbar";
import { type ReactElement } from "react";

export type TypescriptCodeEditorProps = Pick<
  CodeEditHistoryImplementation,
  "code" | "editorRef" | "editorProps"
>;

export function TypescriptCodeEditor(
  props: TypescriptCodeEditorProps
): ReactElement {
  const { code, editorRef, editorProps } = props;

  const { focusEditorProps, onEditorKeyDown } = useFocusCodeEditor({
    editorRef,
    onEditorKeyDown: editorProps.onKeyDown,
  });

  return (
    <CodeEditor
      disableMarginTop
      highlightCode={highlightCode}
      language="tsx"
      editorProps={{
        ...editorProps,
        value: code,
        onKeyDown: onEditorKeyDown,
      }}
      focusEditorProps={focusEditorProps}
      fixedChildren={
        <>
          <CodeEditorCopyToClipboard copyText={code} />
          <Snackbar
            position="bottom-right"
            absolute
            disablePortal
            toastDefaults={{ closeButton: true }}
          />
        </>
      }
    >
      {code}
    </CodeEditor>
  );
}
