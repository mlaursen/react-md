const defaults = { width: 40, height: 40, time: () => Date.now(), section: '' };

/**
 * Returns a random image from either lorempixel or unsplash.it. The options can be:
 * - width (40)
 * - height (40)
 * - time (current time)
 * - section ('') - This should be a valid section from lorem pixel.
 *
 * @param {Object} - an object of options for the random image.
 * @return {String} - a url for a random image
 */
export default function randomImage(options}) {
  Object.keys(defaults).forEach(key => {
    if (typeof options[key] === 'undefined') {
      options[key] = typeof defaults[key] === 'function' ? defaults[key]() : defaults[key];
    }
  });

  const { width, height, time, section } = options;

  const size = `${width}/${height}`;
  return section ? `http://lorempixel.com/${size}/${section}` : `https://unsplash.it/${size}?random&time=${time}`;
}
