import { type IdentifierKind } from "../../types.js";

export function getIdentifierName(
  identifier: IdentifierKind | null | undefined,
  fallback = ""
): string {
  if (typeof identifier?.name !== "string") {
    return fallback;
  }

  return identifier.name;
}
