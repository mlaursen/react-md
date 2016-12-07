import getPagePosition from './getPagePosition';

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
export default function toggleScroll(scrollable, selector, className = 'md-no-scroll') {
  const el = selector ? document.querySelector(selector) : document.querySelector('html');
  if (typeof scrollable === 'undefined') {
    scrollable = !el.classList.contains(className);
  }

  if (scrollable) {
    el.style.top = `-${getPagePosition('y')}px`;
    el.classList.add(className);
  } else {
    const scrollTop = Math.abs(parseInt(el.style.top, 10));
    el.classList.remove(className);
    el.style.top = null;

    if (!selector) {
      window.scrollTo(0, scrollTop);
    } else {
      el.scrollTop = scrollTop;
    }
  }
}
