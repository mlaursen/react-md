import { defaults } from 'lodash/object';

const IMAGE_DEFAULTS = {
  height: 40,
  width: 40,
  section: '',
};

export function randomImage(options = {}) {
  if (typeof options.height === 'undefined' && typeof options.width !== 'undefined') {
    options.height = options.width;
  }

  const { height, width, section } = defaults(options, IMAGE_DEFAULTS);
  const size = `${width}/${height}`;
  if (section) {
    return `http://lorempixel.com/${size}/${section}`;
  }

  return `https://unsplash.it/${size}?random}`;
}

export function randomImages(num, options = { width: 40 }) {
  return [...new Array(num)].map(() => randomImage(options));
}
