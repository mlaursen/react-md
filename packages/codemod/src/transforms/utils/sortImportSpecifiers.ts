import { type AnyImportSpecifier } from "../../types.js";
import { getIdentifierName } from "./getIdentifierName.js";
import { getImportedName } from "./getImportedName.js";
import { isTypeImport } from "./isTypeImport.js";

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

      const aName = getIdentifierName(a.imported);
      const bName = getIdentifierName(b.imported);
      return aName.localeCompare(bName);
    }

    // shouldn't be possible for my use case
    return 0;
  });

  return sorted;
};
