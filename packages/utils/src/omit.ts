import { Omit } from "./types.d";

/**
 * I really don't know how to typedef this. It just creates
 * a new object that has all the values copied over except for
 * any keys that are defined in the omitKeys param.
 *
 * @param object - The object to remove keys from
 * @param omitKeys - The keys to remove.
 * @return a new object without the specified keys
 */
export function omit<T extends object, K extends keyof T>(
  object: T,
  omitKeys: K[] | string[]
): Omit<T, K> {
  if (!omitKeys.length) {
    return object;
  }

  return Object.keys(object).reduce((updated, key) => {
    if (!(omitKeys as string[]).includes(key)) {
      // @ts-ignore
      updated[key] = object[key];
    }

    return updated;
  }, {}) as Omit<T, K>;
}
