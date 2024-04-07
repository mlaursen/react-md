import { type Element } from "hast";
import { type ReplacePreElementOptions } from "./replacePreElement.js";

export interface CreateDemoOptions extends ReplacePreElementOptions {
  as: string;
  filepath: string;
  codeElement: Element;
}

export async function createDemo(options: CreateDemoOptions): Promise<void> {
  const {
    as,
    meta,
    filepath,
    codeElement,
    preElement,
    preElementIndex,
    preElementParent,
  } = options;

  codeElement.properties.className = ["language-tsx"];
}
