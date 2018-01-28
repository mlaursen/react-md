/* eslint-disable import/prefer-default-export */

export function hexToRgb(hexString) {
  hexString = hexString.replace(/^#?([A-Fa-f\d])([A-Fa-f\d])([A-Fa-f\d])$/, '#$1$1$2$2$3$3');

  const matches = hexString.match(/^#?([A-Fa-f\d]{2})([A-Fa-f\d]{2})([A-Fa-f\d]{2})/);
  if (!matches || matches.length <= 5) {
    return '0,0,0';
  }

  const [, r, g, b] = matches;
  return `${r},${g},${b}`;
}
