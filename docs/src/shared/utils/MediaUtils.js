export function isMobile() {
  return typeof window !== 'undefined'
    && window.matchMedia('only screen and (min-width: 320px)').matches;
}

export function isTablet() {
  return typeof window !== 'undefined'
    && window.matchMedia('only screen and (min-width: 768px)').matches;
}

export function isDesktop() {
  return typeof window !== 'undefined'
    && window.matchMedia('only screen and (min-width: 1025px)').matches;
}

export function getDrawerType(mobile, tablet) {
  if (mobile) {
    return 'mobile';
  } else if (tablet) {
    return 'tablet';
  } else {
    return 'desktop';
  }
}
