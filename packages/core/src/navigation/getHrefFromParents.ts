import { type NavigationItem } from "./types.js";

/**
 * @since 6.0.0
 */
export function getHrefFromParents(parents: readonly NavigationItem[]): string {
  return parents.reduce<string>((result, parent) => {
    if ("href" in parent && parent.href) {
      const { href } = parent;
      return result + href;
    }

    return result;
  }, "");
}
