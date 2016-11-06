import randomImage from './randomImage';

/**
 * Returns a list of random image urls of length equal to the given amount.
 *
 * @param {Number} amt - The amount of random urls to generate
 * @param {Object} options - The options to pass to `randomImage`
 * @return {Array.<String>} - a list of random image urls.
 */
export default function randomImages(amt, options = { width: 40 }) {
  const time = Date.now();
  return [...new Array(amt)].map((_, i) => randomImage({ ...options, time: time + i }));
}
