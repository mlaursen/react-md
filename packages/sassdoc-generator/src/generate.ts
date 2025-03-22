import {
  type FunctionItem,
  type Item,
  type MixinItem,
  type VariableItem,
  parse,
} from "sassdoc";

import { isFunctionItem, isMixinItem, isVariableItem } from "./assertions.js";
import { chunk } from "./chunk.js";
import { clearScssCache } from "./compileScss.js";
import { formatBaseItem } from "./formatBaseItem.js";
import {
  formatFunctionItem,
  formatMixinItem,
} from "./formatNonVariableItems.js";
import { formatVariableItem } from "./formatVariableItem.js";
import { log, logComplete, logPending } from "./log.js";
import { getItemReferenceLinks } from "./references.js";
import {
  type FormattedFunctionItem,
  type FormattedMixinItem,
  type FormattedVariableItem,
  type FullItemReferenceLink,
} from "./types.js";

interface FormatItemOptions {
  src: string;
  item: Item;
  mixins: Map<string, FormattedMixinItem>;
  functions: Map<string, FormattedFunctionItem>;
  variables: Map<string, FormattedVariableItem>;
  references: Map<string, FullItemReferenceLink>;
  originalMixins: Map<string, MixinItem>;
  originalFunctions: Map<string, FunctionItem>;
  originalVariables: Map<string, VariableItem>;
}

async function formatItem(options: FormatItemOptions): Promise<void> {
  const {
    src,
    item,
    mixins,
    functions,
    variables,
    references,
    originalMixins,
    originalFunctions,
    originalVariables,
  } = options;
  const baseItem = await formatBaseItem({ src, item });

  let type: "function" | "variable" | "mixin";
  if (isVariableItem(item)) {
    type = "variable";
    const formatted = await formatVariableItem(src, baseItem, item);
    if (variables.has(formatted.name)) {
      throw new Error(`Duplicate variables with ${formatted.name}`);
    }

    variables.set(formatted.name, formatted);
    originalVariables.set(formatted.name, item);
  } else if (isFunctionItem(item)) {
    type = "function";
    const formatted = await formatFunctionItem(baseItem, item);
    if (functions.has(formatted.name)) {
      throw new Error(`Duplicate functions with ${formatted.name}`);
    }

    functions.set(formatted.name, formatted);
    originalFunctions.set(formatted.name, item);
  } else if (isMixinItem(item)) {
    type = "mixin";
    const formatted = await formatMixinItem(baseItem, item);
    if (mixins.has(formatted.name)) {
      throw new Error(`Duplicate mixins with ${formatted.name}`);
    }

    mixins.set(formatted.name, formatted);
    originalMixins.set(formatted.name, item);
  } else {
    // other types aren't documented at this time
    return;
  }

  references.set(baseItem.name, {
    type,
    name: baseItem.name,
    group: baseItem.group,
    private: baseItem.private,
  });
}

export interface ApplyReferencesOptions {
  map: Map<
    string,
    FormattedMixinItem | FormattedVariableItem | FormattedFunctionItem
  >;
  original: Map<string, Item>;
  src: string;
  references: ReadonlyMap<string, FullItemReferenceLink>;
}

function applyReferences(options: ApplyReferencesOptions): void {
  const { map, original, references } = options;

  map.forEach((item) => {
    const orig = original.get(item.name);
    if (!orig) {
      throw new Error("Shouldn't be possible");
    }

    item.see = getItemReferenceLinks(orig.see, references);
    item.usedBy = getItemReferenceLinks(orig.usedBy, references);
    item.requires = getItemReferenceLinks(orig.require, references);
  });
}

export interface GeneratedSassDoc {
  mixins: ReadonlyMap<string, FormattedMixinItem>;
  functions: ReadonlyMap<string, FormattedFunctionItem>;
  variables: ReadonlyMap<string, FormattedVariableItem>;
}

async function run(src: string, isChunked = false): Promise<GeneratedSassDoc> {
  const items = await log(parse(src), "", "Parsed sass items");
  const mixins = new Map<string, FormattedMixinItem>();
  const functions = new Map<string, FormattedFunctionItem>();
  const variables = new Map<string, FormattedVariableItem>();
  const originalMixins = new Map<string, MixinItem>();
  const originalFunctions = new Map<string, FunctionItem>();
  const originalVariables = new Map<string, VariableItem>();

  const references = new Map<string, FullItemReferenceLink>();

  const format = (item: Item): Promise<void> =>
    formatItem({
      src,
      item,
      mixins,
      functions,
      variables,
      references,
      originalMixins,
      originalFunctions,
      originalVariables,
    });

  if (isChunked) {
    const start = Date.now();
    logPending("Formatting the SassDoc items");
    const chunks = chunk(items, 40);
    for (const chunk of chunks) {
      await Promise.all(chunk.map((item) => format(item)));
    }
    const end = Date.now();
    logComplete("Formatted the SassDoc items", end - start);
  } else {
    await log(
      Promise.all(items.map((item) => format(item))),
      "Formatting the SassDoc items",
      "Formatted the SassDoc items"
    );
  }

  applyReferences({
    src,
    map: mixins,
    original: originalMixins,
    references,
  });
  applyReferences({
    src,
    map: functions,
    original: originalFunctions,
    references,
  });
  applyReferences({
    src,
    map: variables,
    original: originalVariables,
    references,
  });

  return {
    mixins,
    functions,
    variables,
  };
}

export interface GenerateOptions {
  src: string;
  clear?: boolean;
  isChunked?: boolean;
}

export async function generate(
  options: GenerateOptions
): Promise<GeneratedSassDoc> {
  const { src, clear, isChunked } = options;

  if (clear) {
    clearScssCache();
  }

  return await log(
    run(src, isChunked),
    "Generating sassdoc",
    "Generated sassdoc"
  );
}
