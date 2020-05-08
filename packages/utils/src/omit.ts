type R = Record<string, unknown>;

/**
 * I really don't know how to typedef this. It just creates a new object that
 * has all the values copied over except for any keys that are defined in the
 * omitKeys param.
 *
 * @internal
 * @param object The object to remove keys from
 * @param omitKeys The keys to remove.
 * @return a new object without the specified keys
 */
export default function omit<T extends object, K extends keyof T>(
  object: T,
  omitKeys: K[] | string[]
): Omit<T, K> {
  if (!omitKeys.length) {
    return object;
  }

  return Object.keys(object).reduce((updated, key) => {
    if (!(omitKeys as string[]).includes(key)) {
      (updated as R)[key] = (object as R)[key];
    }

    return updated;
  }, {}) as Omit<T, K>;
}
