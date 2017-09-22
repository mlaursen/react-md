/** @module utils/Positioning/getScreenSize */

export default function getScreenSize(position) {
  if (position !== 'Height' && position !== 'Width' && process.env.NODE_ENV !== 'production') {
    throw new Error(
      'The \'getScreenSize\' function requires either a position of \'Height\' or \'Width\' ' +
      `but received \`${position}\``
    );
  }

  return window[`inner${position}`] || document.documentElement[`client${position}`];
}
