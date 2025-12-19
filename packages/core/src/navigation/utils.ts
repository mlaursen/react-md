import { type NavigationItem } from "./types.js";

/**
 * @since 6.0.0
 */
export function getHrefFromParents(parents: readonly NavigationItem[]): string {
  let result = "";
  for (const parent of parents) {
    if ("href" in parent && parent.href) {
      const { href } = parent;
      result += href;
    }
  }

  return result;
}

/**
 * @since 6.0.0
 */
export function getNavigationGroupId(
  group: NavigationItem,
  parents: readonly NavigationItem[]
): string {
  if ("id" in group && typeof group.id === "string" && group.id) {
    return group.id;
  }

  return getHrefFromParents(parents);
}

/**
 * @since 6.0.0
 */
export function getPartsFromPathname(pathname: string): ReadonlySet<string> {
  // remove trailing slashes just in case there aren't rewrites in place
  const href = pathname.replaceAll(/\/{2,}/g, "/").replace(/\/+$/, "");
  const parts = href.split("/");
  const set = new Set<string>();
  let prefix = "";
  for (const part of parts) {
    const slashed = `/${part}`;
    prefix = prefix === "/" ? slashed : prefix + slashed;
    set.add(prefix);
  }

  return set;
}
