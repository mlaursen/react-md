import scroll from 'smooth-scroll';
export default function smoothScroll() {
  if (window.location.hash) {
    scroll.animateScroll(window.querySelector(window.location.hash));
  } else {
    scroll.animateScroll(0);
  }
}
