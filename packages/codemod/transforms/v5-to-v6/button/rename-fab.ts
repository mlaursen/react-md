import { type API, type FileInfo, type Options } from "jscodeshift";
import { renameRmdIdentifier } from "../../utils/renameRmdIdentifier";

export default function transformer(
  file: FileInfo,
  api: API,
  options: Options
): string {
  const j = api.jscodeshift;
  const root = j(file.source);
  const printOptions = options.printOptions;

  renameRmdIdentifier({
    j,
    root,
    to: "FloatingActionButton",
    from: "FAB",
  });
  renameRmdIdentifier({
    j,
    root,
    to: "FloatingActionButtonProps",
    from: "FABProps",
  });
  renameRmdIdentifier({
    j,
    root,
    to: "FloatingActionButtonPosition",
    from: "FABPosition",
  });

  return root.toSource(printOptions);
}
