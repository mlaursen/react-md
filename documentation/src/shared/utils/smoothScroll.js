import { animateScroll } from 'smooth-scroll';

function scrollToHash() {
  const el = document.querySelector(window.location.hash);
  const header = document.querySelector('header');
  if (!el || !header) {
    return;
  }

  const position = el.offsetTop - header.offsetHeight;
  animateScroll(position);
}

let initialRender = true;
export default function smoothScroll() {
  if (window.location.hash) {
    if (initialRender) {
      setTimeout(() => {
        initialRender = false;
        scrollToHash();
      }, 300);
    } else {
      scrollToHash();
    }
  } else {
    animateScroll(0);
  }
}
