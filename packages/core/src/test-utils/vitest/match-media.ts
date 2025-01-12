import { type MockInstance, vi } from "vitest";
import {
  createMatchMediaSpy,
  type MatchMediaChangeViewport,
} from "../mocks/match-media-implementation.js";
import { matchDesktop, type MatchMediaMatcher } from "../mocks/match-media.js";

/**
 * @example Default Behavior
 * ```tsx
 * import { matchPhone, render, spyOnMatchMedia } from "@react-md/core/test-utils";
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
 * @example Set Default Media
 * ```tsx
 * import { matchPhone, render, spyOnMatchMedia } from "@react-md/core/test-utils";
 *
 * const matchMedia = spyOnMatchMedia(matchPhone);
 * render(<Test />);
 *
 * // expect phone results
 * ```
 *
 * @since 6.0.0
 */
export function spyOnMatchMedia(
  defaultMatch: MatchMediaMatcher = matchDesktop
): MockInstance<typeof window.matchMedia> & MatchMediaChangeViewport {
  return createMatchMediaSpy(vi.spyOn(window, "matchMedia"), defaultMatch);
}
