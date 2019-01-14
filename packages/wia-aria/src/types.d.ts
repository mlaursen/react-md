/**
 * This type is used to require at least one of the optional arguments from
 * an interface. This is useful for requiring specific a11y props when there
 * are a lost of choices to choose from where only one is required.
 *
 * One side-affect is that it will only list one of the keys as missing instead
 * of listing all of them to say that "one is required".
 *
 * @see https://stackoverflow.com/a/49725198
 */
export type RequireAtLeastOne<T, Keys extends keyof T = keyof T> = Pick<
  T,
  Exclude<keyof T, Keys>
> &
  { [K in Keys]-?: Required<Pick<T, K>> }[Keys];

/**
 * A simple interface that is used to help note that an id is required
 * for accessibility or implementing a widget.
 */
export interface IdRequired {
  id: string;
}

/**
 * This type is used to keep track of specific dom elements that
 * normally have "contracts" with one of the roles from wia-aria.
 * These will normally have custom focus events and keydown behavior
 * added to them.
 */
export type KeyboardWiaAriaElement =
  | HTMLButtonElement
  | HTMLUListElement
  | HTMLOListElement
  | HTMLLIElement
  | HTMLDivElement;
