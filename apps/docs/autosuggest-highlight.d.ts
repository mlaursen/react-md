declare module "autosuggest-highlight/match" {
  // https://github.com/DefinitelyTyped/DefinitelyTyped/blob/b69f27d2c5707ff5f14fae100693443af0caa932/types/autosuggest-highlight/match/index.d.ts
  interface Options {
    /**
     * Searches inside words.
     *
     * @default false
     */
    insideWords?: boolean;
    /**
     * Finds all occurrences of each match.
     *
     * @default false
     */
    findAllOccurrences?: boolean;
    /**
     * Requires each word of query to be found in text or else returns an empty
     * set.
     *
     * @default false
     */
    requireMatchAll?: boolean;
  }

  declare function match(
    text: string,
    query: string,
    options?: Options
  ): [number, number][];

  export default match;
}

declare module "autosuggest-highlight/parse" {
  // https://github.com/DefinitelyTyped/DefinitelyTyped/blob/b69f27d2c5707ff5f14fae100693443af0caa932/types/autosuggest-highlight/parse/index.d.ts
  declare function parse(
    text: string,
    matches: [number, number][]
  ): { text: string; highlight: boolean }[];

  export default parse;
}
