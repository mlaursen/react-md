/**
 * A small utility function that will attempt to get an item from localstorage.
 * If the window is not defined, the fallback value will be returned.
 */
export function getItem(key: string, fallback: string | null = null) {
  if (
    typeof window === "undefined" ||
    typeof window.localStorage === "undefined"
  ) {
    return fallback;
  }

  return window.localStorage.getItem(key) || fallback;
}

export function setItem(key: string, value: string) {
  if (
    typeof window === "undefined" ||
    typeof window.localStorage === "undefined"
  ) {
    return;
  }

  window.localStorage.setItem(key, value);
}
