import { MATERIAL_SYMBOL_NAME_REGEXP } from "./constants.js";

export function addMaterialSymbolNames(
  contents: string,
  symbolNames: Set<string>
): void {
  let match: RegExpExecArray | null;
  while ((match = MATERIAL_SYMBOL_NAME_REGEXP.exec(contents)) !== null) {
    const name = match[1] ?? "";
    if (name) {
      symbolNames.add(name);
    }
  }
}
