/**
 * Takes in a css unit (px, rem, em, etc) or a number and applies a function to the
 * number part of the unit.
 *
 * If the unit was a number to start with and a `toUnit` is given, the number will
 * be given the `toUnit`. Otherwise the number will be returned.
 *
 * If the unit was a string, the original units will be applied back to the updated
 * unit's value.
 *
 * @param {number|String} unit - the unit to apply a function to.
 * @param {function} fn - the function to apply to the number.
 * @param {String=} toUnit - an optional unit to cast the updated unit to.
 *
 * @return {String|number} the updated unit.
 */
export default function updateUnit(unit, fn, toUnit) {
  const updated = fn(parseInt(unit, 10));

  if (typeof unit === 'number') {
    return toUnit
      ? `${updated}${toUnit}`
      : updated;
  }

  return `${updated}${unit.replace(/[0-9]/g, '')}`;
}
