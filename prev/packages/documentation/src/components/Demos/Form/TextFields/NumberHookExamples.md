Since the `<input type="number">` behaves oddly, ReactMD exports a hook to deal
with number fields named: `useNumberField`. This uses the `useTextField`
internally to validate the number and return a valid number.

What this hook implements/fixes:

- gets the current number from the text field
  - the number will only be `undefined` if the `defaultValue` option is
    `undefined`
  - the default will update as the user types, but can be configured to only
    update once the text field has been blurred with `updateOnChange: false`
- shows an error if the user types an invalid number since the browser actually
  allows these sorts of inputs to be typed:
  - `--0`
  - `0-0`
  - `0-0-`
  - any of the above but with a `+` instead of a `-`
- attempts to update the field on blur by:

  - setting the field value to the stringified number. Examples:
    - `000000` -> `0`
    - `001` -> `1`
  - fixing the `value` to be within the `min` and `max` values
  - all of the blur behavior can be configured or disabled by the `fixOnBlur`
    option

  Check out the examples below to see how this hook works.
