/** @module utils/Positioning/getTextWidth */

let cachedCanvas;

/**
 * A utility function to measure the width (in px) of any text. It will require a canvas
 * and an element to use to determine the current fonts to apply since different fonts will
 * have different widths.
 *
 * This isn't fully accurate since some browsers handle the calculations a bit differently so
 * they are off by a 0-3px
 *
 * @param {String} text - The text to measure the width
 * @param {HTMLElement} el - The element to use to determine the current font for the text.
 * @param {HTMLElement=} canvas - An optional canvas to use for doing the calculations. If this
 *    is omitted, it will just use the locally created canvas to do the calculations.
 * @return {number} this will either return null if there is a problem calculating the width or
 *    the length (in px) of the text.
 */
export default function getTextWidth(text, el, canvas) {
  if (!el) {
    return null;
  }

  if (!canvas) {
    if (!cachedCanvas) {
      cachedCanvas = document.createElement('canvas');
    }

    canvas = cachedCanvas;
  }

  const context = canvas.getContext('2d');
  if (!context) { // context doesn't exist in testing without complicated mocks
    return null;
  }

  const styles = window.getComputedStyle(el);
  let font = styles.font;
  // Some browsers do not actually supply the font style since they are on an older version of CSSProperties,
  // so the font string needs to be made manually.
  if (!font) {
    // font-style font-variant font-weight font-size/line-height font-family
    const sizing = `${styles.fontSize} / ${styles.lineHeight} ${styles.fontFamily}`;
    font = `${styles.fontStyle} ${styles.fontVariant} ${styles.fontWeight} ${sizing}`;
  }

  context.font = font;
  return context.measureText(text).width;
}
