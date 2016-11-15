import { animateScroll } from 'smooth-scroll';

function scrollToHash() {
  let el = document.querySelector(window.location.hash);
  const header = document.querySelector('header');
  if (!el || !header) {
    return;
  }

  if (window.location.hash.indexOf('proptypes') !== -1) {
    el = el.parentNode;
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
