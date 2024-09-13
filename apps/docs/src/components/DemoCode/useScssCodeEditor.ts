import { useEffect, useState } from "react";

const UPDATE_DELAY = 800;

export interface ScssCodeEditorState {
  error: Error | null;
  compiled: string;
  compiling: boolean;
}

export interface ScssCodeEditorOptions {
  code: string;
  demoName: string;
  defaultCode: string;
  defaultCompiledCode: string;
}

export function useScssCodeEditor(
  options: ScssCodeEditorOptions
): ScssCodeEditorState {
  const { code, demoName, defaultCode, defaultCompiledCode } = options;

  const [state, setState] = useState<ScssCodeEditorState>({
    error: null,
    compiled: defaultCompiledCode,
    compiling: false,
  });
  const { error, compiled, compiling } = state;
  useEffect(() => {
    if (code === defaultCode) {
      setState({
        error: null,
        compiled: defaultCompiledCode,
        compiling: false,
      });
      return;
    }

    let canceled = false;
    setState((prev) => ({
      ...prev,
      compiling: true,
    }));

    // debounce the SCSS updates since it is too easy to cause layout shifts
    // while creating new css
    const timeout = window.setTimeout(async () => {
      try {
        const [compile, SCSS_LOOKUP] = await Promise.all([
          import("docs-generator/utils/compileScssModule").then(
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
        if (!canceled) {
          setState({
            error: null,
            compiled,
            compiling: false,
          });
        }
      } catch (e) {
        if (canceled) {
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
      canceled = true;
      window.clearTimeout(timeout);
    };
  }, [code, defaultCode, defaultCompiledCode, demoName]);

  return { error, compiled, compiling };
}
