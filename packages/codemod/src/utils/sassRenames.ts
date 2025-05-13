import { type TransformSassItemOptions } from "./types.js";

export type RenameRecord = Record<
  string,
  string | ((replacement: string, ...others: unknown[]) => string)
>;

export type RenameEntry = [regex: RegExp, replacement: RenameRecord[string]];
export type RenameEntries = readonly RenameEntry[];

export function renameRecordToEntries(record: RenameRecord): RenameEntries {
  return Object.entries(record).map(
    ([regex, replacement]) => [new RegExp(regex), replacement] as const
  );
}

interface RenameFromRenameEntriesOptions extends TransformSassItemOptions {
  entries: RenameEntries;
  entriesType: TransformSassItemOptions["type"] | "any";
}

export function renameFromRenameEntries(
  options: RenameFromRenameEntriesOptions
): string | undefined {
  const { name, type, entries, entriesType } = options;
  if (type !== entriesType && entriesType !== "any") {
    return;
  }

  for (const [regex, replacement] of entries) {
    let renamed = name;
    if (typeof replacement === "string") {
      renamed = name.replace(regex, replacement);
    } else {
      renamed = name.replace(regex, replacement);
    }

    if (renamed !== name) {
      return renamed;
    }
  }
}
