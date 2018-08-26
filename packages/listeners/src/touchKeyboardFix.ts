import { addTouchEvent, removeTouchEvent } from "@react-md/utils";

// This is the main API for interacting with the keyboard fixes. The keyboard fixes will
// be cached so that only one listener will ever only be created at a time. To be able to
// "hook into" the touch keyboard fixes, the ResizeListener must call the `startListening`
// function which will increment a count of listeners and add the first touch event if
// it had not been added before.
//
// Once the main touchstart listener has been added, a focus and touchend event will be added
// to the window. The touchend is used to automatically clear the focus event after a set time
// just incase a focus event never occurs after a touch (scrolling page, clicking away from
// text field, etc).
//
// If the focused element was a text field, the window focus event will be removed and then
// an orientation change event will be created as well as attaching a blur event to the text field.
// Finally, a timeout will be created that is used to ignore a resize event that _might_ trigger
// after the text field was focused because the soft keyboard appears.
//
// The orientation change event is just in case the user rotates their device while the input is
// focused. This will update the logic so that when the text field is blurred, the keyboard fix
// timeout **will not be created** so that the resize event propagates. Once the text field is
// blurred by any means, it will check if the device was rotated while being focused. If it was not,
// the timeout will be created to ignore a resize event that _might_ trigger because the soft keyboard
// disappears. There will be no timeout created if the device was rotated since we do actually want
// the resize event to trigger in this case because there is no longer to prevent resizes while
// an input is focused.
//
// Finally, the orientation change and blur events will be removed and we will be left at the start with
// just the touchstart event listener. Rinse and repeat.
const KEYBOARD_WAIT = 300;

let touchStartAdded: boolean = false;
let touchEndAdded: boolean = false;
let focusAdded: boolean = false;
let orientationAdded: boolean = false;
let focusResetTimeout: number | undefined;

let rotated: boolean = false;
let timeout: number | undefined;

function isKeyboardInput(element: Element | null) {
  return !!element && element.tagName === "INPUT" && !/checkbox|radio|hidden/.test((element as HTMLInputElement).type);
}

function handleTouchStart(event: TouchEvent) {
  if (!focusAdded) {
    window.addEventListener("focus", handleFocus, true);
    focusAdded = true;
  }

  if (!touchEndAdded) {
    addTouchEvent(window, "end", handleTouchEnd, true);
    touchEndAdded = true;
  }
}

function handleTouchEnd() {
  removeTouchEvent(window, "end", handleTouchEnd, true);
  touchEndAdded = false;

  window.clearTimeout(focusResetTimeout);
  focusResetTimeout = window.setTimeout(() => {
    focusResetTimeout = undefined;
    if (focusAdded) {
      window.removeEventListener("focus", handleFocus, true);
      focusAdded = false;
    }
  }, KEYBOARD_WAIT);
}

function handleFocus(event: FocusEvent) {
  window.clearTimeout(timeout);
  timeout = undefined;
  window.removeEventListener("focus", handleFocus, true);
  focusAdded = false;

  if (!isKeyboardInput(event.target as Element)) {
    return;
  }

  if (!orientationAdded) {
    window.addEventListener("orientationchange", handleOrientationChange);
    orientationAdded = true;
  }

  timeout = window.setTimeout(() => {
    timeout = undefined;
  }, KEYBOARD_WAIT);
}

function handleOrientationChange() {
  rotated = true;
}

let listeners = 0;

/**
 * Used to conditionally start the touch keyboard fixes if it has not started already. This will make it so
 * that the ResizeListener can call the `isTouchKeyboardResize` during a resize event to see if it was
 * triggered by a touch (soft) keyboard appearing.
 */
export function startListening() {
  listeners++;
  if (!touchStartAdded) {
    addTouchEvent(window, "start", handleTouchStart);
    touchStartAdded = true;
  }
}

/**
 * Used to conditionally stop the touch keyboaard fixes. Once the count of listeners is set to 0, it will
 * remove all the events as needed which will make it so that `isTouchKeyboardResize` is always false until
 * `startListening` is called again.
 */
export function stopListening() {
  listeners = Math.max(0, listeners - 1);
  if (listeners === 0) {
    window.clearTimeout(timeout);
    timeout = undefined;

    if (orientationAdded) {
      window.removeEventListener("orientationchange", handleOrientationChange);
      orientationAdded = false;
    }

    if (focusAdded) {
      window.removeEventListener("focus", handleFocus, true);
      focusAdded = false;
    }

    if (touchStartAdded) {
      removeTouchEvent(window, "start", handleTouchStart);
      touchStartAdded = false;
    }
  }
}

/**
 * Used to check if a resize event was triggered because a touch (soft) keyboard appeared.
 */
export function isTouchKeyboardResize() {
  return typeof timeout === "number";
}
