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
      TextFieldWithMessage: "TextField",
      TextAreaWithMessage: "TextArea",
      PasswordWithMessage: "Password",
    },
  });

  return root.toSource(printOptions);
}
