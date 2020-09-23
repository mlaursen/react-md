import { useCallback, useState } from "react";
import { useRefCache } from "@react-md/utils";

import { MergableRippleHandlers } from "./ripples/types";
import { isBubbled } from "./ripples/utils";

interface PressedStatesOptions<E extends HTMLElement = HTMLElement> {
  handlers?: MergableRippleHandlers<E>;
  disableSpacebarClick?: boolean;
}

interface ReturnValue<E extends HTMLElement> {
  pressed: boolean;
  handlers: MergableRippleHandlers<E>;
}

/**
 * This is a different version of the useRippleStates that will allow you to
 * know when a component is being pressed by the user. This is really just a
 * fallback for when the ripples are disabled.
 *
 * This will return an object containing the current pressed state of the
 * element as well as all the merged eventHandlers required to trigger the
 * different states.
 *
 * NOTE: Unlike the ripple effect, this pressed states will not be triggered
 * from a programmatic click event.
 */
export function usePressedStates<E extends HTMLElement = HTMLElement>({
  handlers = {},
  disableSpacebarClick = false,
}: PressedStatesOptions<E> = {}): ReturnValue<E> {
  const [pressed, setPressed] = useState(false);
  const ref = useRefCache({ ...handlers, pressed });

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<E>) => {
      const { onKeyDown, pressed } = ref.current;
      if (onKeyDown) {
        onKeyDown(event);
      }

      const { key } = event;
      if (
        !pressed &&
        (key === "Enter" || (!disableSpacebarClick && key === " "))
      ) {
        setPressed(true);
      }
    },
    // disabled since useRefCache for ref
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [disableSpacebarClick]
  );

  const handleKeyUp = useCallback((event: React.KeyboardEvent<E>) => {
    const { onKeyUp, pressed } = ref.current;
    if (onKeyUp) {
      onKeyUp(event);
    }

    if (pressed) {
      setPressed(false);
    }
    // disabled since useRefCache for ref
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleMouseDown = useCallback((event: React.MouseEvent<E>) => {
    const { onMouseDown, pressed } = ref.current;
    if (onMouseDown) {
      onMouseDown(event);
    }

    if (!pressed && event.button === 0 && !isBubbled(event)) {
      setPressed(true);
    }
    // disabled since useRefCache for ref
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleMouseUp = useCallback((event: React.MouseEvent<E>) => {
    const { onMouseUp, pressed } = ref.current;
    if (onMouseUp) {
      onMouseUp(event);
    }

    if (pressed) {
      setPressed(false);
    }
    // disabled since useRefCache for ref
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleMouseLeave = useCallback((event: React.MouseEvent<E>) => {
    const { onMouseLeave, pressed } = ref.current;
    if (onMouseLeave) {
      onMouseLeave(event);
    }

    if (pressed) {
      setPressed(false);
    }
    // disabled since useRefCache for ref
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleTouchStart = useCallback((event: React.TouchEvent<E>) => {
    const { onTouchStart, pressed } = ref.current;
    if (onTouchStart) {
      onTouchStart(event);
    }

    if (!pressed && !isBubbled(event)) {
      setPressed(true);
    }
    // disabled since useRefCache for ref
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleTouchMove = useCallback((event: React.TouchEvent<E>) => {
    const { onTouchMove, pressed } = ref.current;
    if (onTouchMove) {
      onTouchMove(event);
    }

    if (pressed) {
      setPressed(false);
    }
    // disabled since useRefCache for ref
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleTouchEnd = useCallback((event: React.TouchEvent<E>) => {
    const { onTouchEnd, pressed } = ref.current;
    if (onTouchEnd) {
      onTouchEnd(event);
    }

    if (pressed) {
      setPressed(false);
    }
    // disabled since useRefCache for ref
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    pressed,
    handlers: {
      onClick: handlers.onClick,
      onKeyDown: handleKeyDown,
      onKeyUp: handleKeyUp,
      onMouseDown: handleMouseDown,
      onMouseUp: handleMouseUp,
      onMouseLeave: handleMouseLeave,
      onTouchStart: handleTouchStart,
      onTouchMove: handleTouchMove,
      onTouchEnd: handleTouchEnd,
    },
  };
}
