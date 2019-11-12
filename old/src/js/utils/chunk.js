/** @module utils/omit */

/**
 * This should hopefully be very similar to lodash's chunk function. It will
 * take an array and split it into chunks of the given size. Any remainder will
 * be in the last chunk.
 *
 * @param {Array} arr - the array to split into chunks
 * @param {integer} size - the desired length of each chunk
 * @return {Array} - the chunked array
 */
export default function chunk(arr, size) {
  if (!arr) {
    return [];
  }
  return arr.reduce((chunks, item, index) => (
    index % size === 0
      ? [...chunks, arr.slice(index, index + size)]
      : chunks
  ), []);
}
