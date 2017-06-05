import { findDOMNode } from 'react-dom';

let activeItem = null;
let scrolled = false;

export function routeRef(route) {
  if (route === null) {
    scrolled = false;
  }
}

export function scrollIntoView(item, force = false) {
  if (!item || !__CLIENT__ || (scrolled && !force)) {
    return;
  }

  activeItem = findDOMNode(item);
  const main = document.getElementById('main-navigation');
  const header = main && main.querySelector('header');
  const navigation = document.getElementById('main-navigation-nav-items');
  if (!navigation || !header) {
    return;
  }

  const padding = parseInt(window.getComputedStyle(navigation).paddingTop, 10);
  let count = 1;
  let list = activeItem.parentNode;
  while (list !== navigation) {
    count += 1;
    list = list.parentNode.parentNode;
  }

  const scrollTop = activeItem.offsetTop - header.offsetHeight - (padding * count);
  navigation.scrollTop = scrollTop;
  scrolled = true;
}

if (__CLIENT__ && __DEV__) {
  window.addEventListener('load', () => {
    scrollIntoView(activeItem, true);
  });
}
