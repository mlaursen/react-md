import { useState, useEffect } from "react";

/**
 * This is a small hook that is used to determine if the app is currently
 * being used by a touch device or not. All this really does is switch
 * between mousemove and touchstart events to determine which mode you are in.
 *
 * @return true if the app is in touch mode.
 */
export function useTouchDetection() {
  const [lastTouchTime, setTouchTime] = useState(0);
  function updateTouchTime() {
    setTouchTime(Date.now());
  }

  function resetTouchTime() {
    if (Date.now() - lastTouchTime < 500) {
      return;
    }

    setTouchTime(0);
  }

  useEffect(() => {
    window.addEventListener("touchstart", updateTouchTime, true);

    return () => {
      window.removeEventListener("touchstart", updateTouchTime);
    };
  }, []);

  useEffect(
    () => {
      if (lastTouchTime !== 0) {
        window.addEventListener("mousemove", resetTouchTime, true);
      }

      return () => {
        window.removeEventListener("mousemove", resetTouchTime, true);
      };
    },
    [lastTouchTime]
  );

  return lastTouchTime !== 0;
}

/**
 * This hook is used to apply a class name to the root html element to showcase
 * that the app is in "touch" mode. This can be use alongside of the `useTouchDetection`
 * hook if needed, but the main benefit to this version is that adding a class can
 * also modify the css of all elements so that additional hover effects are not triggered
 * in touch mode.
 *
 * @param className - the class name to toggle on the root html element when
 * the app is in touch mode.
 */
export function useTouchDetectionClassNameToggle(
  className: string = "rmd-states--touch"
) {
  const isTouch = useTouchDetection();

  useEffect(
    () => {
      const html = document.querySelector("html") as HTMLElement;
      if (!html) {
        return;
      }

      if (isTouch) {
        html.classList.add(className);
      }

      return () => {
        html.classList.remove(className);
      };
    },
    [isTouch]
  );
}
