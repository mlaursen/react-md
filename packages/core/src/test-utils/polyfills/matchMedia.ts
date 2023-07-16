import { BASE_MEDIA_QUERY_LIST, matchDesktop } from "../matchMedia";

if (typeof window !== "undefined" && typeof window.matchMedia !== "function") {
  window.matchMedia = (query) => ({
    ...BASE_MEDIA_QUERY_LIST,
    matches: matchDesktop(query),
  });
}
