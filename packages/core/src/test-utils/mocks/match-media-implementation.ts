import { act } from "@testing-library/react";

import {
  BASE_MEDIA_QUERY_LIST,
  type MatchMediaMatcher,
  matchDesktop,
} from "./match-media.js";

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

/**
 * @since 6.0.0
 */
export interface MatchMediaMockFunction {
  mockImplementation(fn: typeof window.matchMedia): this;
}

/**
 * @since 6.0.0
 */
export const createMatchMediaSpy = <SpyFunction extends MatchMediaMockFunction>(
  matchMediaSpy: SpyFunction,
  defaultMatch: MatchMediaMatcher = matchDesktop
): SpyFunction & MatchMediaChangeViewport => {
  type Listener = (event: MediaQueryListEvent) => void;

  const listeners = new Map<string, Listener>();
  const matchMedia = matchMediaSpy.mockImplementation((query) => ({
    ...BASE_MEDIA_QUERY_LIST,
    addEventListener(type: string, listener: Listener | EventListenerObject) {
      /* c8 ignore start */
      if (typeof listener !== "function" || type !== "change") {
        return;
      }
      /* c8 ignore stop */

      listeners.set(query, listener);
    },
    removeEventListener(
      type: string,
      listener: Listener | EventListenerObject
    ) {
      /* c8 ignore start */
      if (typeof listener !== "function" || type !== "change") {
        return;
      }
      /* c8 ignore stop */

      listeners.delete(query);
    },
    matches: defaultMatch(query),
  }));

  const changeViewport = (
    matcher: MatchMediaMatcher,
    disableAct = false
  ): void => {
    const update = (): void => {
      window.dispatchEvent(new Event("resize"));

      const event = new Event("change");
      listeners.forEach((listener, query) => {
        listener({
          ...event,
          media: "",
          matches: matcher(query),
        });
      });
    };
    if (disableAct) {
      update();
    } else {
      act(update);
    }
  };

  const mock = matchMedia as SpyFunction & MatchMediaChangeViewport;
  mock.changeViewport = changeViewport;

  return mock;
};
