import { type NavigationItem } from "./navItems.js";

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
