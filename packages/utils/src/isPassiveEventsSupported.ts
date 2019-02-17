const noop = () => undefined;
let cached = false;

/**
 * Checks if the browser supports passive events. This shouldn't really be used
 * outside of this file, but you can always check again if needed.
 */
export function supports() {
  if (typeof window === "undefined") {
    return false;
  }

  let isPassiveEventsSupported = false;
  const opts = Object.defineProperty({}, "passive", {
    get() {
      isPassiveEventsSupported = true;
    },
  });

  window.addEventListener("testSupportsPassive", noop, opts);
  window.removeEventListener("testSupportsPassive", noop, opts);
  cached = isPassiveEventsSupported;
  return isPassiveEventsSupported;
}

supports();

export default cached;
