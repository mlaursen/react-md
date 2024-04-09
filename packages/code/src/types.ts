export type GlobalCodeScope = Record<string, unknown>;
export type LocalCodeScope = Record<string, unknown>;

/**
 * Everything defined in this object will be part of the global scope. If there
 * are specific imports for the file, they should be added under `imports`
 *
 * i.e.
 * ```ts
 * import Prism from "prismjs";
 * import * as someLibrary from "some-library";
 *
 * const scope: RunnableCodeScope = {
 *   Prism,
 *   import: {
 *     "some-library": someLibrary,
 *   },
 * };
 *
 * // no Prism import required since it's in the global scope.
 * const code = `
 * import { part } from "some-library";
 *
 * Prism.highlightElement(document.getElementById('root'));
 *
 * part();
 * `;
 * ```
 */
export type RunnableCodeScope = GlobalCodeScope & { import?: LocalCodeScope };

export type SupportedCodeLanguage =
  | "css"
  | "scss"
  | "js"
  | "jsx"
  | "ts"
  | "tsx"
  | "html"
  | "json"
  | "sh"
  | "diff"
  | ({} & string);

export interface TransformCodeOptions {
  code: string;
  lang: SupportedCodeLanguage;
}

export type FormatCode = (options: TransformCodeOptions) => Promise<string>;
export type HighlightCode = (options: TransformCodeOptions) => string;

export interface BaseCodeFile {
  name: string;
  code: string;
  lang: SupportedCodeLanguage;
}

export interface TypescriptCodeFile extends BaseCodeFile {
  lang: "ts" | "tsx";
  scope?: RunnableCodeScope;
  compiled: string;
}

export interface ScssCodeFile extends BaseCodeFile {
  lang: "scss";
  compiled: string;
}

export type CompiledCodeFile = TypescriptCodeFile | ScssCodeFile;

export type CodeFile = BaseCodeFile | CompiledCodeFile;
