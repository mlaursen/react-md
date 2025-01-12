import { BASE_MEDIA_QUERY_LIST, matchDesktop } from "../mocks/match-media.js";

if (typeof window !== "undefined" && typeof window.matchMedia !== "function") {
  window.matchMedia = (query) => ({
    ...BASE_MEDIA_QUERY_LIST,
    matches: matchDesktop(query),
  });
}
