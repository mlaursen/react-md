
/**
 * A utility function to scroll to a single element. This will use the smooth-scroll
 * animation when scrolling.
 */
export default function scrollTo(el = null) {
  if (!__CLIENT__) { // smooth-scroll has no checks for server, so it crashes server with usage of window
    return;
  }

  const animateScroll = require('smooth-scroll').animateScroll; // eslint-disable-line global-require

  // You're thinking to yourself... Why in the world are all of these nested callbacks????
  // Well, they are all here for a good reason! The first requestAnimationFrame is used to help
  // wait to attempt the logic after the window repaints. This is super important when using React
  // and the virtual dom changes. The lifecycle methods of componentDidMount and componentDidUpdate
  // occur when the virtual dom changes, not once the page has been repainted with the changes. This means
  // that the elements might not exist on the page yet and the scrolling won't work.
  //
  // Ok, so next is the setTimeout. This is really just added as one more step of a fallback safety net.
  // Sometimes the requestAnimationFrame isn't enough and having a secondary timeout afterwards fixes it.
  //
  // So after all the delays, we check if an element was provided. If it wasn't, check if there is a hash
  // in the pathname that should be used and then use that element. If there *still* isn't an element after
  // all of that, it is _safe_ to assume that I just want to scroll back to the top of the page since a
  // route changed. If there is an element, find it's position on the page relative to the location of
  // the body and animate to that position. After it is all said and done, the element should be focused
  // for keyboard support.
  requestAnimationFrame(() => {
    setTimeout(() => {
      if (el === null) {
        const { hash } = window.location;
        el = (hash && document.querySelector(hash)) || null;
      }

      if (!el) {
        window.scrollTo(0, 0);
      } else {
        const { top: elTop } = el.getBoundingClientRect();
        const { top: bodyTop } = (document.body || document.documentElement).getBoundingClientRect();
        const position = Math.abs(elTop - bodyTop);

        animateScroll(position);
        setTimeout(() => {
          el.focus();
        }, 100);
      }
    }, 0);
  });
}
