import { animateScroll } from 'smooth-scroll';

export default function scrollRestoration() {
  const { hash } = window.location;
  let el = null;
  if (hash) {
    el = document.querySelector(hash);
  }

  if (!el) {
    window.scrollTo(0, 0);
  } else {
    const { top: elTop } = el.getBoundingClientRect();
    const { top: bodyTop } = (document.body || document.documentElement).getBoundingClientRect();
    const position = Math.abs(elTop - bodyTop);
    animateScroll(position);
  }
}
