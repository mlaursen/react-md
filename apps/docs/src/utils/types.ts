export type KebabCase<S extends string> = S extends `${infer T}${infer U}`
  ? U extends Uncapitalize<U>
    ? `${Lowercase<T>}${KebabCase<U>}`
    : `${Lowercase<T>}-${KebabCase<Uncapitalize<U>>}`
  : S;

export type KebabCasedKeys<T, Recursive extends boolean = false> = {
  [K in keyof T as KebabCase<string & K>]: T[K] extends object
    ? Recursive extends true
      ? KebabCasedKeys<T[K], Recursive>
      : T[K]
    : T[K];
};
