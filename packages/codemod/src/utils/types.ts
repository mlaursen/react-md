import { type Root } from "postcss";

export interface ProgramOptions {
  dry: boolean;
  print: boolean;
  parser: Parser | "";
  autoConfirm: boolean;
}

export type Parser = "babel" | "tsx";

export interface TransformSassItemOptions {
  name: string;
  type: "variable" | "function" | "mixin";
}

export type SassTransformer = (root: Root) => boolean;
