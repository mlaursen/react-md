import { animateScroll } from 'smooth-scroll';

function scrollToHash() {
  let el = document.querySelector(window.location.hash);
  const header = document.querySelector('.main-toolbar');
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
    document.getElementById('main-content').focus();
    window.scrollTo(0, 0);
  }
}
