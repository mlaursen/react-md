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
  index: number;
  mixins: Map<string, FormattedMixinItem>;
  functions: Map<string, FormattedFunctionItem>;
  variables: Map<string, FormattedVariableItem>;
  references: Map<string, FullItemReferenceLink>;
  mixinsOrder: Map<string, number>;
  functionsOrder: Map<string, number>;
  variablesOrder: Map<string, number>;
  originalMixins: Map<string, MixinItem>;
  originalFunctions: Map<string, FunctionItem>;
  originalVariables: Map<string, VariableItem>;
}

async function formatItem(options: FormatItemOptions): Promise<void> {
  const {
    src,
    item,
    index,
    mixins,
    functions,
    variables,
    references,
    mixinsOrder,
    functionsOrder,
    variablesOrder,
    originalMixins,
    originalFunctions,
    originalVariables,
  } = options;
  const baseItem = await formatBaseItem({ src, item });

  let type: "function" | "variable" | "mixin";
  if (isVariableItem(item)) {
    type = "variable";
    const formatted = await formatVariableItem(src, baseItem, item);
    variablesOrder.set(formatted.name, index);
    if (variables.has(formatted.name)) {
      throw new Error(`Duplicate variables with ${formatted.name}`);
    }

    variables.set(formatted.name, formatted);
    originalVariables.set(formatted.name, item);
  } else if (isFunctionItem(item)) {
    type = "function";
    const formatted = await formatFunctionItem(baseItem, item);
    functionsOrder.set(formatted.name, index);
    if (functions.has(formatted.name)) {
      throw new Error(`Duplicate functions with ${formatted.name}`);
    }

    functions.set(formatted.name, formatted);
    originalFunctions.set(formatted.name, item);
  } else if (isMixinItem(item)) {
    type = "mixin";
    const formatted = await formatMixinItem(baseItem, item);
    mixinsOrder.set(formatted.name, index);
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

export interface GeneratedSassDocWithOrder extends GeneratedSassDoc {
  mixinsOrder: ReadonlyMap<string, number>;
  functionsOrder: ReadonlyMap<string, number>;
  variablesOrder: ReadonlyMap<string, number>;
}

async function run(
  src: string,
  chunkSize?: number
): Promise<GeneratedSassDocWithOrder> {
  const items = await log(parse(src), "", "Parsed sass items");
  const mixins = new Map<string, FormattedMixinItem>();
  const functions = new Map<string, FormattedFunctionItem>();
  const variables = new Map<string, FormattedVariableItem>();
  const originalMixins = new Map<string, MixinItem>();
  const originalFunctions = new Map<string, FunctionItem>();
  const originalVariables = new Map<string, VariableItem>();
  const mixinsOrder = new Map<string, number>();
  const functionsOrder = new Map<string, number>();
  const variablesOrder = new Map<string, number>();

  const references = new Map<string, FullItemReferenceLink>();

  const format = (item: Item, index: number): Promise<void> =>
    formatItem({
      src,
      item,
      index,
      mixins,
      functions,
      variables,
      references,
      mixinsOrder,
      functionsOrder,
      variablesOrder,
      originalMixins,
      originalFunctions,
      originalVariables,
    });

  if (typeof chunkSize === "number") {
    const start = Date.now();
    logPending("Formatting the SassDoc items");
    const chunks = chunk(items, chunkSize);
    for (let i = 0; i < chunks.length; i++) {
      const chunk = chunks[i];
      const addition = i * chunkSize;

      await Promise.all(chunk.map((item, i) => format(item, i + addition)));
    }
    const end = Date.now();
    logComplete("Formatted the SassDoc items", end - start);
  } else {
    await log(
      Promise.all(items.map((item, i) => format(item, i))),
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
    mixinsOrder,
    functionsOrder,
    variablesOrder,
  };
}

export interface GenerateOptions {
  src: string;
  clear?: boolean;
  chunkSize?: number;
}

export async function generate(
  options: GenerateOptions
): Promise<GeneratedSassDocWithOrder> {
  const { src, clear, chunkSize } = options;

  if (clear) {
    clearScssCache();
  }

  return await log(
    run(src, chunkSize),
    "Generating sassdoc",
    "Generated sassdoc"
  );
}
