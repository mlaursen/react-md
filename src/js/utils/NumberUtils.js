/**
 * Checks if a number is between a min and maximum (inclusive)
 *
 * @param {Number} num the number to check
 * @param {Number} min the minimum
 * @param {Number} max the maximum
 * @return {Boolean} true if the number is between the min and max (inclusive)
 */
export function isBetween(num, min, max) {
  return num >= min && num <= max;
}

/**
 * This calculates the distance from a screen x location to a position in some element
 * by comparing the width of the element and the element's page position to the screen
 * x position.
 *
 * If the distance is not _normalized_ the distance will be updated to be a percentage
 * of the element's total width.
 *
 * @param {Number} x - the screen x location.
 * @param {Number} width - the element's width
 * @param {Number} left - the element's page x position.
 * @param {Boolean} normalize - boolean if the distance should be a percentage.
 *
 * @return {Number} the distance from the element's left position to the page x
 *    location.
 */
function calculateDistance(x, width, left, normalize) {
  const distance = Math.min(
    width,
    Math.max(0, x - left)
  );

  return normalize ? distance : distance / width * 100;
}

/**
 * This calculates the new value and distance for a sliter. It will compare the page x
 * location of a touch or mouse event to the slider's track page x position. If the
 * final value and distance should be _normalized_, they will be updated to be rounded
 * with the scale and steps in mind.
 *
 * The distance will always be contained within a percentage of 0 - 100 while the
 * value will be contained within the min and max values.
 *
 * @param {Number} x - the page x location of the touch or mouse event.
 * @param {Number} width - the slider's width
 * @param {Number} left - the slider's left position in the page.
 * @param {Number} scale - the total number values included in the slider.
 * @param {Number} step - the amount to increment by.
 * @param {Number} min - the min value for the slider.
 * @param {Number} max - the max value for the slider.
 * @param {Boolean} normalize - boolean if the vaue and distance should be _normalized_.
 *
 * @return {Object} an object with the value and distance.
 */
export function calculateValueDistance(x, width, left, scale, step, min, max, normalize) {
  let value;
  let distance = calculateDistance(x, width, left, normalize);
  if (normalize) {
    value = Math.round(distance / (width / scale));
    if (step < 1) {
      const modded = value % step;
      if (modded !== 0 && modded >= step / 2) {
        value += (step - modded);
      } else if (modded !== 0) {
        value -= modded;
      }
    }

    distance = value / scale * 100;
    value += min;
  } else {
    value = Math.round(distance / 100 * scale);
  }

  if (step > 1) {
    value *= step;
  }

  return {
    distance: Math.max(0, Math.min(100, distance)),
    value: Math.max(min, Math.min(max, value)),
  };
}

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
export function updateUnit(unit, fn, toUnit) {
  const updated = fn(parseInt(unit, 10));

  if (typeof unit === 'number') {
    return toUnit
      ? `${updated}${toUnit}`
      : updated;
  }

  return `${updated}${unit.replace(/[0-9]/g, '')}`;
}

/**
 * Calculates the hypotenuse using the x and y coordinates given.
 *
 * @param {number} a the x coordinate
 * @param {number} b the y coordinate
 * @return {number} the hypotenuse length for the given x and y coordinates.
 */
export function calcHypotenuse(a, b) {
  return Math.sqrt((a * a) + (b * b));
}
