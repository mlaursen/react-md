import { act } from "@testing-library/react";

import {
  BASE_MEDIA_QUERY_LIST,
  type MatchMediaChangeViewport,
  type MatchMediaMatcher,
  matchDesktop,
} from "../mocks/match-media.js";

/**
 * @since 6.0.0
 */
export interface MatchMediaMockFunction {
  mockImplementation(fn: typeof globalThis.matchMedia): this;
}

/**
 * Used to create a `spyOn(window, "matchMedia")` without knowing the test
 * framework.
 *
 * @example Setup Test Framework
 * ```tsx
 * export function spyOnMatchMedia(
 *   defaultMatch: MatchMediaMatcher = matchDesktop
 * ): jest.SpiedFunction<typeof window.matchMedia> & MatchMediaChangeViewport {
 *   return createMatchMediaSpy(jest.spyOn(window, "matchMedia"), defaultMatch);
 * }
 * ```
 *
 * NOTE: The `spyOnMatchMedia` function **must** not call the `.spyOn`
 * immediately to work correctly. The spy needs to be invoked whenever this is
 * called instead. For example, this is bad and will fail:
 *
 * @example Bad Example
 * ```tsx
 * export const spyOnMatchMedia = createMatchMediaSpy.bind(null, jest.spy(window, "matchMedia"));
 * ```
 *
 * This is mostly a reminder to myself since I wanted something like the
 * following code, but failed:
 *
 * ```ts
 * export const spyOnMatchMedia = createMatchMediaSpy(jest.spyOn(window, "matchMedia"));
 * ```
 *
 * @since 6.0.0
 * @internal
 */
export function createMatchMediaSpy<SpyFunction extends MatchMediaMockFunction>(
  matchMediaSpy: SpyFunction,
  defaultMatch: MatchMediaMatcher = matchDesktop
): SpyFunction & MatchMediaChangeViewport {
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
      globalThis.dispatchEvent(new Event("resize"));

      const event = new Event("change");
      for (const [query, listener] of listeners.entries()) {
        listener({
          ...event,
          media: "",
          matches: matcher(query),
        });
      }
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
}
