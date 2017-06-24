import smoothScroll from 'smooth-scroll';

/**
 * A utility function to scroll to a single element. This will use the smooth-scroll
 * animation when scrolling.
 */
export function scrollTo(el) {
  if (!el) {
    window.scrollTo(0, 0);
  } else {
    const { top: elTop } = el.getBoundingClientRect();
    const { top: bodyTop } = (document.body || document.documentElement).getBoundingClientRect();
    const position = Math.abs(elTop - bodyTop);
    smoothScroll.animateScroll(position);
  }
}

/**
 * This is used each time the browser's location changes. It will attempt to either scroll to the top
 * of the page, or the current hash.
 */
export default function scrollRestoration() {
  if (!__CLIENT__) {
    return;
  }

  const { hash } = window.location;
  let el = null;
  if (hash) {
    el = document.querySelector(hash);
  }

  scrollTo(el);
}
