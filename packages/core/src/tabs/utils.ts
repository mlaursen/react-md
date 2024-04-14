/**
 * @internal
 */
export const getTabRoleOnly = (container: Element): readonly HTMLElement[] => [
  ...container.querySelectorAll<HTMLElement>('[role="tab"]'),
];

/** @internal */
interface ScrollOptions {
  container: HTMLElement | null;
  forward: HTMLElement | null;
  backward: HTMLElement | null;
  vertical: boolean;
  activeIndex: number;
}

/**
 * @internal
 */
export const scrollTabIntoView = (options: ScrollOptions): void => {
  const { container, vertical, forward, backward, activeIndex } = options;
  if (!container) {
    return;
  }

  const activeTab = getTabRoleOnly(container)[activeIndex];
  if (!activeTab) {
    return;
  }

  const sizeAttribute = vertical ? "offsetHeight" : "offsetWidth";
  const offsetAttribute = vertical ? "offsetTop" : "offsetLeft";
  const scrollAttribute = vertical ? "scrollTop" : "scrollLeft";
  const firstOffset = backward?.[sizeAttribute] || 0;
  const lastOffset = forward?.[sizeAttribute] || 0;
  const elementStart = activeTab[offsetAttribute];
  const elementEnd = elementStart + activeTab[sizeAttribute];
  const containerStart = container[scrollAttribute];
  const containerEnd = containerStart + container[sizeAttribute] - lastOffset;
  if (elementEnd > containerEnd) {
    const containerSize = container[sizeAttribute] - lastOffset;
    container[scrollAttribute] = elementEnd - containerSize;
  } else if (elementStart < containerStart + firstOffset) {
    container[scrollAttribute] = elementStart - firstOffset;
  }
};

/**
 * @since 6.0.0
 */
export interface TabListScrollToOptions {
  isRTL: boolean;
  animate: boolean;
  vertical: boolean;
  increment: boolean;
  container: HTMLElement;
}

/**
 * @since 6.0.0
 */
export type GetTabListScrollToOptions = (
  options: TabListScrollToOptions
) => ScrollToOptions | undefined;

/**
 * @since 6.0.0
 */
export const getTabListScrollToOptions: GetTabListScrollToOptions = (
  options
) => {
  const { isRTL, animate, vertical, increment, container } = options;
  const { scrollLeft, scrollTop, scrollWidth, scrollHeight } = container;
  const currentScroll = vertical ? scrollTop : scrollLeft;
  const scrollDistance = vertical ? scrollHeight : scrollWidth;
  const amount = (scrollDistance / 10) * (increment ? 1 : -1);
  const distance = currentScroll + amount * (vertical || !isRTL ? 1 : -1);

  return {
    left: vertical ? undefined : distance,
    top: vertical ? distance : undefined,
    behavior: animate ? "smooth" : "auto",
  };
};
