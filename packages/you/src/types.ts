/**
 * @since 6.2.0
 */
export type OverridableStringUnion<
  Defaults extends string,
  Overrides extends Partial<Record<string, boolean>>,
> =
  | Exclude<Defaults, { [K in keyof Overrides]: K }[keyof Overrides]>
  | {
      [K in keyof Overrides]: Overrides[K] extends false ? never : K;
    }[keyof Overrides];

/**
 * @see https://github.com/microsoft/TypeScript/issues/29729#issuecomment-471566609
 * @since 7.1.0
 */
export type LiteralStringUnion<T extends U, U = string> = T | (U & {});
