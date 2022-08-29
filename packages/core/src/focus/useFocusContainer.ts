import type { KeyboardEventHandler, Ref, RefCallback } from "react";
import { useCallback, useEffect, useRef } from "react";

import type { TransitionCallbacks } from "../transition/types";
import { useEnsuredRef } from "../useEnsuredRef";
import type { FocusElementWithinType } from "./utils";
import { focusElementWithin, getFocusableElements } from "./utils";

const noop = (): void => {
  // do nothing
};

export type FocusContainerTransitionOptions = Pick<
  TransitionCallbacks,
  "onEntering" | "onExiting"
>;

export interface FocusContainerEventHandlers<E extends HTMLElement> {
  onKeyDown?: KeyboardEventHandler<E>;
}

export interface FocusContainerOptions<E extends HTMLElement>
  extends FocusContainerTransitionOptions {
  ref?: Ref<E>;
  disabled?: boolean;
  onKeyDown?: KeyboardEventHandler<E>;

  /**
   * This to `true` will capture the current focused element as a focus target
   * once the `onExiting` hook is fired. This should usually be set to the
   * `transitionIn` prop for `useTransition`.
   */
  activate: boolean;
}

export interface FocusContainerImplementation<E extends HTMLElement> {
  eventHandlers: Required<FocusContainerEventHandlers<E>>;
  transitionOptions: Required<FocusContainerTransitionOptions> & {
    nodeRef: RefCallback<E>;
  };
}

export function useFocusContainer<E extends HTMLElement>(
  options: FocusContainerOptions<E>
): FocusContainerImplementation<E> {
  const {
    ref,
    activate,
    disabled = false,
    onEntering = noop,
    onExiting = noop,
    onKeyDown = noop,
  } = options;

  const [nodeRef, refCallback] = useEnsuredRef(ref);
  const prevFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (
      disabled ||
      !activate ||
      !(document.activeElement instanceof HTMLElement)
    ) {
      return;
    }

    prevFocus.current = document.activeElement;
  }, [activate, disabled]);

  return {
    transitionOptions: {
      nodeRef: refCallback,
      onEntering: useCallback(
        (appearing) => {
          onEntering(appearing);
          if (
            !disabled &&
            (!document.activeElement ||
              !nodeRef.current?.contains(document.activeElement))
          ) {
            nodeRef.current?.focus();
          }
        },
        [disabled, nodeRef, onEntering]
      ),
      onExiting: useCallback(() => {
        onExiting();
        if (!disabled) {
          prevFocus.current?.focus();
        }
      }, [disabled, onExiting]),
    },
    eventHandlers: {
      onKeyDown: useCallback(
        (event) => {
          onKeyDown(event);
          if (event.isPropagationStopped() || disabled || event.key !== "Tab") {
            return;
          }

          const container = event.currentTarget;
          const elements = getFocusableElements(container);
          const count = elements.length;
          if (count === 0) {
            return;
          }

          let type: FocusElementWithinType | undefined;
          if (
            count === 1 ||
            (elements[count - 1] === event.target && !event.shiftKey)
          ) {
            type = "first";
          } else if (elements[0] === event.target && event.shiftKey) {
            type = "last";
          }

          if (type) {
            event.preventDefault();
            focusElementWithin({
              type,
              elements,
              container,
            });
          }
        },
        [disabled, onKeyDown]
      ),
    },
  };
}
