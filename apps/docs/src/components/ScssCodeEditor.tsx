"use client";
import { type FakeScssModule } from "@/utils/fakeScssModules.js";
import { LinearProgress, cssUtils } from "@react-md/core";
import { useEffect, useState, type ReactElement } from "react";
import { type CodeBlockProps } from "./CodeBlock.jsx";
import { CodeEditor } from "./CodeEditor/CodeEditor.jsx";
import { useCodeEditor } from "./CodeEditor/useCodeEditor.js";
import styles from "./ScssCodeEditor.module.scss";

const UPDATE_DELAY = 800;

export interface ScssCodeEditorProps
  extends FakeScssModule,
    Omit<CodeBlockProps, "children" | "className"> {}

interface ScssCodeEditorState {
  error: Error | null;
  compiling: boolean;
  compiledCss: string;
}

export function ScssCodeEditor(props: ScssCodeEditorProps): ReactElement {
  const { css, baseName, scss, ...remaining } = props;

  const { code, textAreaProps } = useCodeEditor(scss);
  const [state, setState] = useState<ScssCodeEditorState>({
    error: null,
    compiling: false,
    compiledCss: css,
  });
  const { error, compiling, compiledCss } = state;
  useEffect(() => {
    if (code === scss) {
      setState({
        error: null,
        compiling: false,
        compiledCss: css,
      });
      return;
    }

    setState((prev) => ({
      ...prev,
      compiling: true,
    }));
    let cancelled = false;

    const timeout = window.setTimeout(async () => {
      const { compileScssModule } = await import(
        "@/utils/compileScssModule.js"
      );
      try {
        const compiledCss = await compileScssModule({
          scss: code,
          baseName,
        });
        if (!cancelled) {
          setState({
            error: null,
            compiling: false,
            compiledCss,
          });
        }
      } catch (e) {
        if (!cancelled) {
          if (e instanceof Error) {
            const error = e;
            setState((prev) => ({
              ...prev,
              error,
              compiling: false,
            }));
          }
        }
      }
    }, UPDATE_DELAY);

    return () => {
      cancelled = true;
      window.clearTimeout(timeout);
    };
  }, [code, css, baseName, scss]);

  return (
    <>
      <CodeEditor
        {...remaining}
        lang="scss"
        code={code}
        textAreaProps={textAreaProps}
        disableMarginTop
        fixedChildren={
          <>
            {compiling && (
              <LinearProgress
                aria-label="Compiling SCSS"
                className={styles.progress}
                theme="current-color"
              />
            )}
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
          </>
        }
      />
      <style>{compiledCss}</style>
    </>
  );
}
