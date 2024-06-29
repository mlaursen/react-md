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
    to: "ButtonUnstyled",
    from: "UnstyledButton",
  });

  return root.toSource(printOptions);
}
