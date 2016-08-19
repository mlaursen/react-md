export function isMobile() {
  return typeof window !== 'undefined'
    && window.matchMedia('only screen and (min-width: 320px) and (max-width: 767px)').matches;
}

export function isTablet() {
  return typeof window !== 'undefined'
    && window.matchMedia('only screen and (min-width: 768px) and (max-width: 1024px) and (orientation: landscape)').matches;
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
