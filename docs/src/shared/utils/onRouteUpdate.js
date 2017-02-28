import { animateScroll } from 'smooth-scroll';

function scrollToHash() {
  const el = document.querySelector(window.location.hash);
  if (!el) {
    return;
  }

  const position = Math.abs(el.getBoundingClientRect().top - (document.body || document.documentElement).getBoundingClientRect().top);
  animateScroll(position);
}

let initialRender = true;
export default function onRouteUpdate() {
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
    if (!window.location.pathname.match(/focus-container/)) {
      document.getElementById('main-content').focus();
    }
    window.scrollTo(0, 0);
  }
}
