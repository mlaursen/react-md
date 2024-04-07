import { type Element } from "hast";
import { type ReplacePreElementOptions } from "./replacePreElement.js";

export interface CreateDemoOptions extends ReplacePreElementOptions {
  codeElement: Element;
  filepath: string;
}

export async function createDemo(options: CreateDemoOptions): Promise<void> {
  const {
    meta,
    filepath,
    codeElement,
    preElement,
    preElementIndex,
    preElementParent,
  } = options;

  codeElement.properties.className = ["language-tsx"];
}
