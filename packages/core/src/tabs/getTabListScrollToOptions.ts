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
