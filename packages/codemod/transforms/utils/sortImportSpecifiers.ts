import { type AnyImportSpecifier } from "../types";
import { getImportedName } from "./getImportedName";
import { isTypeImport } from "./isTypeImport";

export const sortImportSpecifiers = (
  specifiers: readonly AnyImportSpecifier[]
): AnyImportSpecifier[] => {
  const sorted = [...specifiers].filter(
    (spec, index, array) =>
      spec.type !== "ImportSpecifier" ||
      index ===
        array.findIndex(
          (s) =>
            s.type === "ImportSpecifier" &&
            getImportedName(s) === getImportedName(spec)
        )
  );
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
