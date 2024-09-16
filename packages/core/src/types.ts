import type { Dispatch, ReactElement, Ref, SetStateAction } from "react";

/**
 * A helper type that allows an optional `ref` to also be applied with a props
 * object even though a `ref` isn't a real prop.
 */
export type PropsWithRef<
  Props extends {},
  Element extends HTMLElement,
> = Props & {
  /**
   * An optional ref that can be applied.
   */
  ref?: Ref<Element>;
};

/**
 * A simple type that can be used for different components that clone a
 * `className` into a child component.
 */
export type ClassNameCloneableChild<T = {}> = ReactElement<
  T & { className?: string }
>;

/**
 * This type allows you to require at least one of the provided keys. This is
 * super helpful for things like `aria-label` or `aria-labelledby` when it's
 * required for a11y.
 *
 * @see https://stackoverflow.com/questions/40510611/typescript-interface-require-one-of-two-properties-to-exist/49725198#49725198
 */
export type RequireAtLeastOne<T, Keys extends keyof T = keyof T> = Pick<
  T,
  Exclude<keyof T, Keys>
> &
  {
    [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>>;
  }[Keys];

export interface LabelA11y {
  "aria-label"?: string;
  "aria-labelledby"?: string;
}

/**
 * A small accessibility helper to ensure that either `aria-label` or
 * `aria-labelledby` have been provided to a component.
 *
 * @example Simple Example
 * ```ts
 * import type { HTMLAttributes, ReactElement } from "react";
 * import type { LabelRequiredForA11y } from "@react-md/core";
 *
 * type Props = LabelRequiredForA11y<HTMLAttributes<HTMLDivElement>>;
 *
 * function Component(props: Props): ReactElement {
 *   return <div {...props} />;
 * }
 *
 * const test1 = <Component />
 * //            ^ type error
 * const test2 = <Component aria-label="Label" />
 * const test3 = <Component aria-labelledby="some-other-id" />
 * ```
 */
export type LabelRequiredForA11y<Props extends LabelA11y> = RequireAtLeastOne<
  Props,
  keyof LabelA11y
>;

/**
 * @since 5.0.0
 * @internal
 */
export interface NonNullRef<T> {
  readonly current: T;
}

/**
 * @since 6.0.0
 * @internal
 */
export interface NonNullMutableRef<T> {
  current: T;
}

/** @since 6.0.0 */
export type HtmlTagName = keyof JSX.IntrinsicElements;

/**
 * A function to get a string from a generic item.
 *
 * @example Simple Example
 * ```ts
 * interface Item {
 *   name: string;
 * }
 *
 * const items: Item[] = [{ name: 'Hello' }, { name: 'World' }];
 *
 * const extractor: TextExtractor<Item> = (item) => item.name;
 * ```
 * @since 6.0.0
 */
export type TextExtractor<T> = (item: T) => string;

/**
 * @since 6.0.0
 * @internal
 */
export type UseStateSetter<T> = Dispatch<SetStateAction<T>>;

/**
 * @since 6.0.0
 * @internal
 */
export type UseStateInitializer<T> = T | (() => T);

/**
 * @example
 * ```ts
 * type Visibility = UseStateObject<"visible", boolean>;
 * // type Visibility = {
 * //   visible: boolean;
 * //   setVisible: UseStateSetter<boolean>
 * // }
 *
 * type AnotherOne = UseStateObject<"renderAsSheet", RenderMenuAsSheet>;
 * // type AnotherOne = {
 * //   renderAsSheet: RenderMenuAsSheet;
 * //   setRenderAsSheet: UseStateSetter<RenderMenuAsSheet>;
 * // }
 * ```
 * @since 6.0.0
 * @internal
 */
export type UseStateObject<Name extends string, Value> = {
  [key in Name]: Value;
} & {
  [key in `set${Capitalize<Name>}`]: UseStateSetter<Value>;
};

/**
 * @example
 * ```ts
 * interface Example {
 *   value: number;
 *   setValue: UseStateSetter<number>;
 * }
 *
 * type WithPrefix = RenameKeysWithPrefix<Example, "thumb1">;
 * // type WithPrefix = {
 * //   thumb1Value: number;
 * //   thumb1SetValue: UseStateSetter<number>;
 * // }
 * ```
 *
 * @since 6.0.0
 * @internal
 */
export type RenameKeysWithPrefix<T, Prefix extends string> = {
  [Key in keyof T & string as `${Prefix}${Capitalize<Key>}`]: T[Key];
};

/**
 * @since 6.0.0
 */
export type CssPosition = "fixed" | "sticky" | "static";

/**
 * @since 6.0.0
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyFunction = (...args: any[]) => any | void;

/**
 * @since 6.0.0
 */
export type CancelableFunction<F extends AnyFunction> = F & { cancel(): void };

/**
 * @since 6.0.0
 */
export type DebouncedFunction<F extends AnyFunction> = CancelableFunction<
  (...args: Parameters<F>) => void
>;

/**
 * @since 6.0.0
 */
export type ThrottledFunction<F extends AnyFunction> = CancelableFunction<
  (...args: Parameters<F>) => ReturnType<F>
>;

/**
 * @since 6.0.0
 */
export interface ElementSize {
  height: number;
  width: number;
}
