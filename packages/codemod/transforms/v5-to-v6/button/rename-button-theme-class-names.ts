import { type API, type FileInfo, type Options } from "jscodeshift";
import { renameImportSpecifier } from "../../utils/renameImportSpecifier";

export default function transformer(
  file: FileInfo,
  api: API,
  options: Options
): string {
  const j = api.jscodeshift;
  const root = j(file.source);
  const printOptions = options.printOptions;

  renameImportSpecifier({
    j,
    root,
    to: "button",
    from: "buttonThemeClassNames",
  });

  return root.toSource(printOptions);
}
