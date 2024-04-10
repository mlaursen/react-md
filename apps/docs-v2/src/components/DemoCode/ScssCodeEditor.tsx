import { CodeEditor } from "@react-md/code/CodeEditor";
import { CodeEditorCopyToClipboard } from "@react-md/code/CodeEditorCopyToClipboard";
import { CodeEditorProgress } from "@react-md/code/CodeEditorProgress";
import { highlightCode } from "@react-md/code/prismjs/highlight";
import { type ScssCodeFile } from "@react-md/code/types";
import { useCodeEditHistory } from "@react-md/code/useCodeEditHistory";
import { useFocusCodeEditor } from "@react-md/code/useFocusCodeEditor";
import { cssUtils } from "@react-md/core/cssUtils";
import { Snackbar } from "@react-md/core/snackbar/Snackbar";
import { useEffect, useState, type ReactElement } from "react";
import styles from "./ScssCodeEditor.module.scss";

const UPDATE_DELAY = 800;

interface State {
  error: Error | null;
  compiled: string;
  compiling: boolean;
}

export interface ScssCodeEditorProps {
  demoName: string;
  isCssVisible: boolean;
  scssCodeFile: ScssCodeFile;
}

export function ScssCodeEditor(props: ScssCodeEditorProps): ReactElement {
  const { demoName, isCssVisible, scssCodeFile } = props;

  const defaultCode = scssCodeFile.code;
  const defaultCompiled = scssCodeFile.compiled;
  const { code, editorRef, editorProps } = useCodeEditHistory({
    defaultCode,
  });
  const { focusEditorProps, onEditorKeyDown } = useFocusCodeEditor({
    editorRef,
    onEditorKeyDown: editorProps.onKeyDown,
  });
  const [state, setState] = useState<State>({
    error: null,
    compiled: defaultCompiled,
    compiling: false,
  });
  const { error, compiled, compiling } = state;
  useEffect(() => {
    if (code === defaultCode) {
      setState({
        error: null,
        compiled: defaultCompiled,
        compiling: false,
      });
      return;
    }

    let cancelled = false;
    setState((prev) => ({
      ...prev,
      compiling: true,
    }));

    // debounce the SCSS updates since it is too easy to cause layout shifts
    // while creating new css
    const timeout = window.setTimeout(async () => {
      try {
        const [compile, SCSS_LOOKUP] = await Promise.all([
          import("@react-md/mdx-plugins/utils/compileScssModule").then(
            (mod) => mod.compileScssModule
          ),
          import("@/generated/rmdScssLookup.js").then((mod) => mod.SCSS_LOOKUP),
        ]);
        const compiled = compile({
          scss: code,
          baseName: demoName,
          load(fileUrl) {
            const contents = SCSS_LOOKUP[fileUrl];
            if (!contents) {
              throw new Error(`Unable to import "${fileUrl}"`);
            }

            return contents;
          },
        });
        if (!cancelled) {
          setState({
            error: null,
            compiled,
            compiling: false,
          });
        }
      } catch (e) {
        if (cancelled) {
          return;
        }

        const error = e instanceof Error ? e : new Error("Unknown error.");
        setState((prev) => ({
          ...prev,
          error,
          compiling: false,
        }));
      }
    }, UPDATE_DELAY);
    return () => {
      cancelled = true;
      window.clearTimeout(timeout);
    };
  }, [code, defaultCode, defaultCompiled, demoName]);

  const value = isCssVisible ? compiled : code;

  return (
    <>
      <CodeEditor
        disableMarginTop
        highlightCode={highlightCode}
        language="css"
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
