import { jest } from "@jest/globals";

import {
  type MatchMediaChangeViewport,
  type MatchMediaMatcher,
  matchDesktop,
} from "../mocks/match-media.js";
import { createMatchMediaSpy } from "../utils/createMatchMediaSpy.js";

/**
 * @example Default Behavior
 * ```tsx
 * import { matchPhone, render } from "@react-md/core/test-utils";
 * import { spyOnMatchMedia } from "@react-md/core/test-utils/jest-globals";
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
 * import { spyOnMatchMedia } from "@react-md/core/test-utils/jest-globals";
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
): jest.SpiedFunction<typeof globalThis.matchMedia> & MatchMediaChangeViewport {
  return createMatchMediaSpy(
    jest.spyOn(globalThis, "matchMedia"),
    defaultMatch
  );
}
