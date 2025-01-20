import { type MockInstance, vi } from "vitest";

import {
  type MatchMediaChangeViewport,
  createMatchMediaSpy,
} from "../mocks/match-media-implementation.js";
import { type MatchMediaMatcher, matchDesktop } from "../mocks/match-media.js";

/**
 * @example Default Behavior
 * ```tsx
 * import { matchPhone, render } from "@react-md/core/test-utils";
 * import { spyOnMatchMedia } from "@react-md/core/test-utils/vitest";
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
 * import { matchPhone, render } from "@react-md/core/test-utils";
 * import { spyOnMatchMedia } from "@react-md/core/test-utils/vitest";
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
