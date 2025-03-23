import {
  DEFAULT_DESKTOP_LARGE_MIN_WIDTH,
  DEFAULT_DESKTOP_MIN_WIDTH,
  DEFAULT_PHONE_MAX_WIDTH,
  DEFAULT_TABLET_MIN_WIDTH,
} from "../../media-queries/appSize.js";

/**
 * @since 6.0.0
 */
export interface MatchMediaChangeViewport {
  /**
   * @example Default Behavior
   * ```tsx
   * const matchMedia = spyOnMatchMedia();
   * render(<Test />);
   *
   * // expect desktop results
   *
   * matchMedia.changeViewport(matchPhone);
   * // expect phone results
   * ```
   *
   * @example Custom Act Behavior
   * ```tsx
   * const matchMedia = spyOnMatchMedia();
   * const { rerender } = render(<Test />);
   *
   * // expect desktop results
   *
   * matchMedia.changeViewport(matchPhone, false);
   * rerender(<Test key="new-key" />);
   *
   * // expect phone results
   * ```
   */
  changeViewport: (matcher: MatchMediaMatcher, disableAct?: boolean) => void;
}

const noop = (): void => {
  // do nothing
};

/**
 * @internal
 * @since 6.0.0
 */
export const BASE_MEDIA_QUERY_LIST: MediaQueryList = {
  media: "",
  matches: false,
  onchange: noop,
  addListener: noop,
  addEventListener: noop,
  removeEventListener: noop,
  removeListener: noop,
  dispatchEvent: () => false,
};

/** @since 6.0.0 */
export type MatchMediaMatcher = (query: string) => boolean;

/**
 * @since 6.0.0
 * @returns `true` for phone media queries
 */
export const matchPhone: MatchMediaMatcher = (query) =>
  query.includes(DEFAULT_PHONE_MAX_WIDTH);

/**
 * @since 6.0.0
 * @returns `true` for tablet media queries
 */
export const matchTablet: MatchMediaMatcher = (query) =>
  query.includes(DEFAULT_TABLET_MIN_WIDTH);

/**
 * @since 6.0.0
 * @returns `true` for desktop media queries
 */
export const matchDesktop: MatchMediaMatcher = (query) =>
  query.includes(DEFAULT_DESKTOP_MIN_WIDTH);

/**
 * @since 6.0.0
 * @returns `true` for large desktop media queries
 */
export const matchLargeDesktop: MatchMediaMatcher = (query) =>
  query.includes(DEFAULT_DESKTOP_LARGE_MIN_WIDTH);

/**
 * @since 6.0.0
 * @returns `true` for both desktop and large desktop media queries
 */
export const matchAnyDesktop: MatchMediaMatcher = (query) =>
  matchDesktop(query) || matchLargeDesktop(query);
