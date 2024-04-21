import { type NavigationItem } from "./types.js";

/**
 * @since 6.0.0
 */
export function getHrefFromParents(parents: readonly NavigationItem[]): string {
  return parents
    .reduce<string[]>((result, parent) => {
      if ("href" in parent) {
        result.push(parent.href);
      }

      return result;
    }, [])
    .join("/");
}
