export interface ProgramOptions {
  dry: boolean;
  print: boolean;
  parser: Parser | "";
  autoConfirm: boolean;
}

export type Parser = "babel" | "tsx";
