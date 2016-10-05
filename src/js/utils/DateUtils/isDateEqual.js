
/**
 * Checks if two dates are equal by comparing the exact time.
 * This allows null or undefined.
 *
 * @param {Date} d1 - The first date to compare.
 * @param {Date} d2 - The second date to compare.
 * @return {bool} - true if the dates are equal.
 */
export default function isDateEqual(d1, d2) {
  if (!d1 && !d2) {
    return true;
  } else if ((!d1 && d2) || (d1 && !d2)) {
    return false;
  }

  return d1.getTime() === d2.getTime();
}

