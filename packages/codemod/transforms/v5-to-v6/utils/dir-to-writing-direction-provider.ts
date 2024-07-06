import { type API, type FileInfo, type Options } from "jscodeshift";
import { renameImportSpecifiers } from "../../utils/renameImportSpecifiers";

export default function transformer(
  file: FileInfo,
  api: API,
  options: Options
): string {
  const j = api.jscodeshift;
  const root = j(file.source);
  const printOptions = options.printOptions;

  renameImportSpecifiers({
    j,
    root,
    names: {
      DEFAULT_DIR: "DEFAULT_WRITING_DIRECTION",
      Dir: "WritingDirectionProvider",
      DirProps: "WritingDirectionProviderProps",

      // This one must be last since the Dir is a component while this is a
      // type import
      WritingDirection: "Dir",
    },
  });

  return root.toSource(printOptions);
}
