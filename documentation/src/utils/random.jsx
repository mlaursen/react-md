import { defaults } from 'lodash/object';

const IMAGE_DEFAULTS = {
  height: 40,
  width: 40,
  time: () => Date.now(),
  section: '',
};

export function randomImage(options = {}) {
  if (typeof options.height === 'undefined' && typeof options.width !== 'undefined') {
    options.height = options.width;
  }

  const { height, width, time: timeOpt, section } = defaults(options, IMAGE_DEFAULTS);
  const size = `${width}/${height}`;
  if (section) {
    return `http://lorempixel.com/${size}/${section}`;
  }

  const time = typeof timeOpt === 'function' ? timeOpt() : timeOpt;
  return `https://unsplash.it/${size}?random&time=${time}}`;
}

export function randomImages(num, options = { width: 40 }) {
  const time = Date.now();
  return [...new Array(num)].map((_, i) => randomImage({ ...options, time: time + i }));
}
