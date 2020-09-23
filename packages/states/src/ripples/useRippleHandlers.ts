import { useCallback, useRef } from "react";
import { useRefCache } from "@react-md/utils";

import { MergableRippleHandlers, RippleEvent } from "./types";

interface Options<E extends HTMLElement> {
  create: (event: RippleEvent<E>) => void;
  release: (event: RippleEvent<E>) => void;
  cancel: (ease: boolean) => void;
  handlers?: MergableRippleHandlers<E>;
  disabled?: boolean;
  disableRipple?: boolean;
  disableProgrammaticRipple?: boolean;
}

/**
 * This hook is used to create all the event handlers required for
 * creating ripples on an element. Each handler will be memoized and
 * merged with any provided event handlers of the same type. If the
 * ripple effect is disabled, the provided event handlers will be
 * returned instead.
 */
export function useRippleHandlers<E extends HTMLElement>({
  create,
  release,
  cancel,
  handlers = {},
  disabled: propDisabled = false,
  disableRipple = false,
  disableProgrammaticRipple = false,
}: Options<E>): MergableRippleHandlers<E> {
  const disabled = propDisabled || disableRipple;
  const ref = useRefCache({ ...handlers, disableProgrammaticRipple });

  // some OS/browser don't actually focus buttons/elements that are focusable after a click
  // event which causes a double ripple effect. This ref is used to disable the programmatic
  // ripple in these cases.
  const disableProgrammatic = useRef(false);

  const onKeyDown = useCallback(
    (event: React.KeyboardEvent<E>) => {
      const { onKeyDown: callback } = ref.current;
      if (callback) {
        callback(event);
      }

      create(event);
    },
    // disabled since useRefCache
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [create]
  );
  const onKeyUp = useCallback(
    (event: React.KeyboardEvent<E>) => {
      const { onKeyUp: callback } = ref.current;
      if (callback) {
        callback(event);
      }

      release(event);
    },
    // disabled since useRefCache
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [release]
  );

  const onMouseDown = useCallback(
    (event: React.MouseEvent<E>) => {
      const { onMouseDown: callback } = ref.current;
      if (callback) {
        callback(event);
      }

      create(event);
      disableProgrammatic.current = true;
    },
    // disabled since useRefCache
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [create]
  );
  const onMouseUp = useCallback(
    (event: React.MouseEvent<E>) => {
      const { onMouseUp: callback } = ref.current;
      if (callback) {
        callback(event);
      }

      release(event);
    },
    // disabled since useRefCache
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [release]
  );
  const onMouseLeave = useCallback(
    (event: React.MouseEvent<E>) => {
      const { onMouseLeave: callback } = ref.current;
      if (callback) {
        callback(event);
      }

      cancel(true);
    },
    // disabled since useRefCache
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [cancel]
  );

  const onTouchStart = useCallback(
    (event: React.TouchEvent<E>) => {
      const { onTouchStart: callback } = ref.current;
      if (callback) {
        callback(event);
      }

      create(event);
    },
    // disabled since useRefCache
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [create]
  );
  const onTouchMove = useCallback(
    (event: React.TouchEvent<E>) => {
      const { onTouchMove: callback } = ref.current;
      if (callback) {
        callback(event);
      }

      cancel(false);
    },
    // disabled since useRefCache
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [cancel]
  );
  const onTouchEnd = useCallback(
    (event: React.TouchEvent<E>) => {
      const { onTouchEnd: callback } = ref.current;
      if (callback) {
        callback(event);
      }

      release(event);
    },
    // disabled since useRefCache
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [release]
  );

  const onClick = useCallback(
    (event: React.MouseEvent<E>) => {
      const { onClick: callback, disableProgrammaticRipple } = ref.current;
      if (callback) {
        callback(event);
      }

      // when a click event is triggered and the current active element is not
      // the event target, we know it was a true programmatic event and should
      // trigger a ripple for it.
      if (
        disableProgrammaticRipple ||
        document.activeElement === event.currentTarget ||
        disableProgrammatic.current
      ) {
        disableProgrammatic.current = false;
        return;
      }

      create(event);
    },
    // disabled since useRefCache
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [create]
  );

  return {
    onKeyDown: disabled ? handlers.onKeyDown : onKeyDown,
    onKeyUp: disabled ? handlers.onKeyUp : onKeyUp,
    onMouseDown: disabled ? handlers.onMouseDown : onMouseDown,
    onMouseUp: disabled ? handlers.onMouseUp : onMouseUp,
    onMouseLeave: disabled ? handlers.onMouseLeave : onMouseLeave,
    onTouchStart: disabled ? handlers.onTouchStart : onTouchStart,
    onTouchMove: disabled ? handlers.onTouchMove : onTouchMove,
    onTouchEnd: disabled ? handlers.onTouchEnd : onTouchEnd,
    onClick: disabled || disableProgrammaticRipple ? handlers.onClick : onClick,
  };
}
