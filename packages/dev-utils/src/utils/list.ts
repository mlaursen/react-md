export type Listable = string | boolean | null | undefined;

/**
 * A simple function that will convert a list of things into a "prettified"
 * console.log-able version for debugging.
 */
export function list(things: readonly Listable[]): string {
  return things
    .filter(Boolean)
    .map((thing) => ` - ${thing}`)
    .join("\n");
}
