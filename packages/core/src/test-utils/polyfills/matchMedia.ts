import { BASE_MEDIA_QUERY_LIST, matchDesktop } from "../mocks/match-media.js";

if (
  globalThis.window !== undefined &&
  typeof globalThis.matchMedia !== "function"
) {
  globalThis.matchMedia = (query) => ({
    ...BASE_MEDIA_QUERY_LIST,
    matches: matchDesktop(query),
  });
}
