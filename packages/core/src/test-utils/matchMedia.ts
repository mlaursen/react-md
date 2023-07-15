import { act } from "@testing-library/react";
import {
  DEFAULT_DESKTOP_LARGE_MIN_WIDTH,
  DEFAULT_DESKTOP_MIN_WIDTH,
  DEFAULT_PHONE_MAX_WIDTH,
  DEFAULT_TABLET_MIN_WIDTH,
} from "../AppSizeProvider";

const noop = (): void => {
  // do nothing
};

/**
 * @example
 * Main Usage
 * ```ts
 * import { MOCK_MEDIA_QUERY_LIST, render } from "@react-md/test-utils";
 *
 * describe("some test suite", () => {
 *   it("should test something", () => {
 *
 *   });
 * });
 * ```
 */
export const MOCK_MEDIA_QUERY_LIST: MediaQueryList = {
  media: "",
  matches: false,
  onchange: noop,
  addListener: noop,
  addEventListener: noop,
  removeEventListener: noop,
  removeListener: noop,
  dispatchEvent: () => false,
};

export type MatchMediaMatcher = (query: string) => boolean;

export const matchPhone: MatchMediaMatcher = (query) =>
  query.includes(`${DEFAULT_PHONE_MAX_WIDTH}`);
export const matchTablet: MatchMediaMatcher = (query) =>
  query.includes(`${DEFAULT_TABLET_MIN_WIDTH}`);
export const matchDesktop: MatchMediaMatcher = (query) =>
  query.includes(`${DEFAULT_DESKTOP_MIN_WIDTH}`);
export const matchLargeDesktop: MatchMediaMatcher = (query) =>
  query.includes(`${DEFAULT_DESKTOP_LARGE_MIN_WIDTH}`);
export const matchAnyDesktop: MatchMediaMatcher = (query) =>
  matchDesktop(query) || matchLargeDesktop(query);

export type MatchMediaSpiedFunction = jest.SpiedFunction<
  typeof window.matchMedia
> & {
  /**
   * @example
   * Default Behavior
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
   * @example
   * Custom Act Behavior
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
  changeViewport(matcher: MatchMediaMatcher, disableAct?: boolean): void;
};

/**
 * @example
 * Default Behavior
 * ```tsx
 * import { matchPhone, render, spyOnMatchMedia } from "@react-md/test-utils";
 *
 * const matchMedia = spyOnMatchMedia();
 * render(<Test />);
 *
 * // expect desktop results
 *
 * matchMedia.changeViewport(matchPhone);
 * // expect phone results
 * ```
 *
 * @example
 * Set Default Media
 * ```tsx
 * import { matchPhone, render, spyOnMatchMedia } from "@react-md/test-utils";
 *
 * const matchMedia = spyOnMatchMedia(matchPhone);
 * render(<Test />);
 *
 * // expect phone results
 * ```
 */
export function spyOnMatchMedia(
  defaultMatch: MatchMediaMatcher = matchDesktop
): MatchMediaSpiedFunction {
  type Listener = (event: MediaQueryListEvent) => void;

  const listeners = new Map<string, Listener>();
  const matchMedia = jest
    .spyOn(window, "matchMedia")
    .mockImplementation((query) => ({
      ...MOCK_MEDIA_QUERY_LIST,
      addEventListener(type: string, listener: Listener | EventListenerObject) {
        if (typeof listener !== "function" || type !== "change") {
          return;
        }

        listeners.set(query, listener);
      },
      removeEventListener(
        type: string,
        listener: Listener | EventListenerObject
      ) {
        if (typeof listener !== "function" || type !== "change") {
          return;
        }

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

  const mock = matchMedia as MatchMediaSpiedFunction;
  mock.changeViewport = changeViewport;

  return mock;
}
