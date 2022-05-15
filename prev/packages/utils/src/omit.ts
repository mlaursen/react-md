/**
 * Create a new object that does not contain the provided keys.
 *
 * @example
 * Simple Examples
 * ```ts
 * const object = {
 *   a: "",
 *   b: 3,
 *   c: false,
 *   4: null,
 * } as const;
 *
 * expect(omit(object, ["a"])).toEqual({
 *   b: 3,
 *   c: false,
 *   4: null,
 * });
 * expect(omit(object, ["a", "c", "d"])).toEqual({ b: 3 });
 * ```
 *
 * @internal
 * @param object - The object to remove keys from
 * @param omitKeys - The keys to remove.
 * @returns a new object without the specified keys
 */
export function omit<T extends object, K extends keyof T>(
  object: T,
  omitKeys: readonly (K | string)[]
): Omit<T, K> {
  if (!omitKeys.length) {
    return object;
  }

  const result: Record<string, unknown> = {};
  for (const key in object) {
    if (!omitKeys.includes(key as unknown as K)) {
      result[key] = object[key];
    }
  }

  return result as Omit<T, K>;
}
