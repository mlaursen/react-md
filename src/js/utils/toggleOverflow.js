/**
 * A utility function for toggling the overflow visibility on an element. This will either target
 * the given `selector`, or the `body` tag to set a `className`.
 *
 * If the `visible` param is `undefined`, the className will be toggled.
 * If the `visible` param is `true`, the className will be added.
 * If the `visible` param is `false`, the className will be removed.
 *
 *
 * > This depends on the `classList` attribute on elements.
 *
 * @param {bool=} visible - An optional boolean to determine how the `className` will be applied.
 * @param {string=} selector - An optional query selector string to use to select an element.
 * @param {string=} className - The className to apply. Defaults to 'md-overflow-hidden'
 */
export default function toggleOverflow(visible, selector, className = 'md-overflow-hidden') {
  const el = selector ? document.querySelector(selector) : document.body;
  if (typeof visible === 'undefined') {
    el.classList.toggle(className);
  } else if (visible) {
    el.classList.add(className);
  } else {
    el.classList.remove(className);
  }
}
