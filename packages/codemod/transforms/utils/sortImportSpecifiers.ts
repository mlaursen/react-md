import {
  type ImportDefaultSpecifier,
  type ImportNamespaceSpecifier,
  type ImportSpecifier,
} from "jscodeshift";
import { isTypeImport } from "./isTypeImport";

type Spec = ImportSpecifier | ImportDefaultSpecifier | ImportNamespaceSpecifier;

export const sortImportSpecifiers = (specifiers: readonly Spec[]): Spec[] => {
  const sorted = [...specifiers];
  sorted.sort((a, b) => {
    if (a.type === "ImportSpecifier" && b.type === "ImportSpecifier") {
      if (isTypeImport(a) && !isTypeImport(b)) {
        return 1;
      } else if (!isTypeImport(a) && isTypeImport(b)) {
        return -1;
      }

      return a.imported.name.localeCompare(b.imported.name);
    }

    // shouldn't be possible for my use case
    return 0;
  });

  return sorted;
};
