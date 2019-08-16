/* eslint-disable @typescript-eslint/no-object-literal-type-assertion */

/**
 * This is normally used for reusable shareable configs that have multiple shared
 * options with default values that should be used. This basically works just like
 * `defaultProps` in react.
 *
 * @param optional The original object that has the optional/omitted values
 * @param required The required default values that should be used to fill the optional
 * object with
 * @return a new object with both the values of the optional and required objects but
 * use the optional values if they were defined.
 */
export default function defaults<O extends {}, R extends {}>(
  optional: O,
  required: R
): O & R {
  const keys = Object.keys(required);

  return keys.reduce<O & R>(
    (result, key) => {
      // I have no idea how to correctly type this
      // @ts-ignore
      if (typeof result[key] === "undefined") {
        // @ts-ignore
        result[key] = required[key];
      }

      return result;
    },
    { ...optional } as O & R
  );
}
