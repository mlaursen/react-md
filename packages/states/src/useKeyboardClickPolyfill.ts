import { useRef, useEffect, useCallback } from "react";

export default function useKeyboardClickPolyfill<
  E extends HTMLElement = HTMLElement
>(
  onKeyDown?: React.KeyboardEventHandler<E>,
  disabled: boolean = false,
  disableSpacebarClick = false
) {
  const ref = useRef({ onKeyDown, disabled });
  useEffect(() => {
    ref.current = { onKeyDown, disabled };
  });

  return useCallback((event: React.KeyboardEvent<E>) => {
    const { onKeyDown, disabled } = ref.current;
    if (onKeyDown) {
      onKeyDown(event);
    }

    if (disabled) {
      return;
    }

    const { currentTarget } = event;
    const isEnter = event.key === "Enter";
    const isSpace =
      !disableSpacebarClick &&
      currentTarget.tagName !== "A" &&
      event.key === " ";
    if (!isSpace && !isEnter) {
      return;
    }

    if (isSpace) {
      event.preventDefault();
    }

    currentTarget.click();
  }, []);
}
