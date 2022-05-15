type Block = string;
type Element = string;
type Modifier = Record<string, unknown>;

function modify(base: string, modifier?: Modifier): string {
  if (!modifier) {
    return base;
  }

  const hasOwn = Object.prototype.hasOwnProperty;
  return Object.keys(modifier).reduce((s, mod) => {
    if (hasOwn.call(modifier, mod) && modifier[mod]) {
      s = `${s} ${base}--${mod}`;
    }

    return s;
  }, base);
}

type BEMResult = (
  elementOrModifier?: Element | Modifier,
  modifier?: Modifier
) => string;

/**
 * Applies the BEM styled class name to an element.
 *
 * @see https://en.bem.info/methodology/css/
 * @param base - The base class to use
 * @returns a function to call that generates the full class name
 */
export function bem(base: Block): BEMResult {
  if (process.env.NODE_ENV !== "production") {
    if (!base) {
      throw new Error(
        "bem requires a base block class but none were provided."
      );
    }
  }

  /**
   * Creates the full class name from the base block name. This can be called
   * without any arguments which will just return the base block name (kind of
   * worthless), or you can provide a child element name and modifiers.
   *
   * @param elementOrModifier - This is either the child element name or an
   * object of modifiers to apply. This **must** be a string if the second
   * argument is provided.
   * @param modifier - Any optional modifiers to apply to the block and optional
   * element.
   * @returns the full class name
   */
  return function block(
    elementOrModifier?: Element | Modifier,
    modifier?: Modifier
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
  };
}
