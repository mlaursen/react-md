import { type RunnableCodeAndPreviewOptions } from "@/components/DangerouslyRunCode/RunnableCodePreview.jsx";
import { type RunnableCodePreviewOptions } from "@/components/DangerouslyRunCode/RunnableCodePreviewContainer.jsx";
import { type PackageManagerCodeBlockProps } from "@/components/PackageManagerCodeBlock.js";
import { type HighlightedTypescriptCode } from "@/components/TypescriptCode.js";
import { compileScssModule } from "@/utils/compileScssModule.js";
import { convertTsToJs } from "@/utils/convertTsToJs.js";
import { highlightCode } from "@/utils/highlightCode.js";
import { readFile } from "node:fs/promises";
import { basename } from "node:path";
import "server-only";
import { type FakeScssModule } from "./fakeScssModules.js";

const NPM_CODE = /^np(m|x)/;
const LANGUAGE_REGEX = /language-([a-z]+)/;
const JSX_PROPERTY_REGEX = /([a-z][A-Za-z0-9]+)(="([^"]+)")?\s?/g;

export interface CodeJsxProps extends RunnableCodeAndPreviewOptions {
  preview?: boolean;
  editable?: boolean;
  fileName?: string;
}

interface ParseCodeBlockOptions extends CodeJsxProps {
  code: string;
  lang?: string;
  className: string;
}

interface ParsedCodeBlock
  extends Omit<CodeJsxProps, keyof RunnableCodePreviewOptions> {
  code: string;
  lang: string;
  tsCode?: HighlightedTypescriptCode;
  scssModules?: readonly FakeScssModule[];
  packageManager?: PackageManagerCodeBlockProps;
  previewOptions: RunnableCodeAndPreviewOptions;
}

export async function parseCodeBlock(
  options: ParseCodeBlockOptions
): Promise<ParsedCodeBlock> {
  const {
    className,
    code: defaultCode,
    lang: propLang,
    fileName: defaultFileName,
    editable: defaultEditable,
    preview: defaultPreview = defaultEditable,
    ...previewOptions
  } = options;

  let code = defaultCode;
  let fileName = defaultFileName;
  let editable = defaultEditable;
  let preview = defaultPreview;
  let lang = propLang ?? "markdown";
  let scssModulesPaths: string[] | undefined;
  if (!propLang && className) {
    [, lang] = className.match(LANGUAGE_REGEX) || [];
  }

  if (code.startsWith("//")) {
    if (!code.startsWith("// ")) {
      throw new Error("Special code props must start with `// `");
    }

    const newLine = code.indexOf("\n");
    const propLine = code.substring(3, newLine);
    let match: RegExpExecArray | null;
    while ((match = JSX_PROPERTY_REGEX.exec(propLine))) {
      const [, name, , value] = match;
      switch (name) {
        case "fileName":
          fileName = value;
          break;
        case "preview":
          preview = true;
          break;
        case "editable":
          editable = true;
          break;
        case "card":
        case "phone":
          previewOptions[name] = true;
          break;
        case "styles":
          scssModulesPaths = value.split(",");
          break;
        default:
          throw new Error(`Unsupported code property: ${name}`);
      }
    }

    code = code.substring(newLine + 1);
  }

  if (lang === "diff") {
    code = code.replace(/(\r?\n)+$/, "");
  } else {
    code = code.trim();
  }

  let packageManager: PackageManagerCodeBlockProps | undefined;
  if (NPM_CODE.test(code)) {
    const pnpmCode = code
      .replace(/np(m|x)/g, "pnp$1")
      .replace(/install/g, "add");
    const yarnCode = pnpmCode
      .replace(/pnpm/g, "yarn")
      .replace(/pnpx/g, "yarn dlx");

    packageManager = {
      npm: highlightCode(code, "shell"),
      pnpm: highlightCode(pnpmCode, "shell"),
      yarn: highlightCode(yarnCode, "shell"),
    };
  }

  let tsCode: HighlightedTypescriptCode | undefined;
  if (lang === "ts" || lang === "tsx") {
    const jsCode = await convertTsToJs(code);
    if (code !== jsCode && jsCode) {
      tsCode = {
        ts: editable ? code : highlightCode(code, "tsx"),
        js: editable ? jsCode : highlightCode(jsCode, "jsx"),
      };
    }
  }

  let scssModules: FakeScssModule[] | undefined;
  if (scssModulesPaths) {
    scssModules = await Promise.all(
      scssModulesPaths.map<Promise<FakeScssModule>>(async (scssModulePath) => {
        const fileName = basename(scssModulePath);
        const baseName = fileName.replace(".module.scss", "");
        const scss = await readFile(scssModulePath, "utf8");
        const css = await compileScssModule({
          scss,
          baseName,
        });

        return {
          css,
          scss,
          baseName,
          fileName,
        };
      })
    );
  }

  return {
    code,
    lang,
    tsCode,
    preview,
    editable,
    fileName,
    scssModules,
    previewOptions,
    packageManager,
  };
}
