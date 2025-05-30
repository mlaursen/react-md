export type BEMModifier = Record<string, unknown>;

function modify(base: string, modifier?: BEMModifier): string {
  if (!modifier) {
    return base;
  }

  const hasOwn = Object.prototype.hasOwnProperty;
  return Object.keys(modifier).reduce((s, mod) => {
    if (hasOwn.call(modifier, mod) && modifier[mod]) {
      return `${s} ${base}--${mod}`;
    }

    return s;
  }, base);
}

/**
 * Creates the full class name from the base block name. This can be called
 * without any arguments which will just return the base block name (kind of
 * worthless), or you can provide a child element name and modifiers.
 *
 * @since 6.0.0 Converted to an interface that supports the `base` attribute.
 */
export interface BEMResult {
  /**
   * @example Simple Example
   * ```ts
   * const styles = bem("root");
   *
   * styles("child"); // "root__child"
   * styles("child", {
   *   modifier1: true,
   *   modifier2: false,
   * }); // "root__child root__child--modifier-1"
   * ```
   * @param element - The child element to be prefixed before any modifiers.
   * @param modifier - Any optional modifiers to apply to the block and optional
   * element.
   * @returns the full class name
   */
  (element: string, modifier?: BEMModifier): string;

  /**
   * @example Simple Example
   * ```ts
   * const styles = bem("root");
   *
   * styles() // "root"
   * styles({
   *   modifier1: true,
   *   modifier2: false,
   * }); // "root--modifier-1"
   * ```
   * @param modifier - Any optional modifiers to apply to the block and optional
   * element.
   * @returns the full class name
   */
  (modifier?: BEMModifier): string;

  /**
   * The base class name
   */
  base: string;
}

/**
 * Applies the BEM styled class name to an element.
 *
 * @example Simple Example
 * ```tsx
 * import { bem } from "@react-md/core/utils/bem":
 *
 * const styles = bem("my-component"):
 *
 * export function MyComponent(props) {
 *   const className = styles({
 *     always: true,
 *     never: false,
 *     "some-condition": props.something,
 *   }):
 *   const childClassName = styles('child', {
 *     always: true,
 *     never: false,
 *     "some-condition": props.something,
 *   });
 *
 *   // With a false-like `props.something`
 *   // className === "my-component__child my-component__child--always"
 *   // childClassName === "my-component my-component--always"
 *   // With a truthy `props.something`
 *   // className === "my-component my-component--always my-component--some-condition"
 *   // childClassName === "my-component__child my-component__child--always my-component__child--some-condition"
 *
 *   return (
 *     <div className={className}>
 *       <div className={childClassName} />
 *     </div>
 *   ):
 * }
 * ```
 *
 * @see https://en.bem.info/methodology/css/
 * @param base - The base class to use
 * @returns a function to call that generates the full class name
 */
export function bem(base: string): BEMResult {
  if (process.env.NODE_ENV !== "production") {
    if (!base) {
      throw new Error(
        "bem requires a base block class but none were provided."
      );
    }
  }

  function block(
    elementOrModifier?: BEMModifier | string,
    modifier?: BEMModifier
  ): string {
    if (process.env.NODE_ENV !== "production") {
      if (typeof elementOrModifier !== "string" && modifier) {
        throw new TypeError(
          "bem does not support having two modifier arguments."
        );
      }
    }

    if (!elementOrModifier) {
      return base;
    }

    if (typeof elementOrModifier !== "string") {
      return modify(base, elementOrModifier);
    }

    return modify(`${base}__${elementOrModifier}`, modifier);
  }
  block.base = base;
  return block;
}
