"use client";

import {
  type KeyboardEventHandler,
  type Ref,
  type RefObject,
  useEffect,
  useRef,
} from "react";

import { getTransitionCallbacks } from "../transition/getTransitionCallbacks.js";
import { type TransitionCallbacks } from "../transition/types.js";
import { useEnsuredRef } from "../useEnsuredRef.js";
import {
  type FocusElementWithinType,
  focusElementWithin,
  getFocusableElements,
} from "./utils.js";

const noop = (): void => {
  // do nothing
};

/**
 * `"mount"` - this will attempt to focus the container element if:
 * - there is no `document.activeElement`
 * - the container element does not contain the `document.activeElement`
 *
 * `"unmount"` - attempts to re-focus the element that was focused before the
 * focus container became active. The previous focus element is captured
 * whenever the `activate` option on the `useFocusContainer` hook is set to
 * `true`. This is normally when an element becomes `visible`.
 *
 * `"keyboard"` - refocuses the first focusable element if pressing `Tab` would
 * move the focus outside of the container element. If `Shift + Tab` was used,
 * the last focusable element will be used instead.
 *
 * @since 6.0.0
 */
export type FocusType = "mount" | "unmount" | "keyboard";

/**
 * @since 6.0.0
 * @deprecated Use `TransitionCallbacks` instead.
 */
export type FocusContainerTransitionCallbacks = TransitionCallbacks;

/**
 * @since 6.0.0
 * @since 6.3.2 Fixed by extending `TransitionCallbacks` after the
 * `onEnteredOnce` and `onExitedOnce` support was added to CSS transitions.
 */
export interface FocusContainerTransitionOptions<
  E extends HTMLElement,
> extends TransitionCallbacks {
  /**
   * An optional ref that will be merged with the
   * {@link FocusContainerImplementation.nodeRef}
   */
  nodeRef?: Ref<E>;
}

/** @since 6.0.0 */
export interface FocusContainerEventHandlers<E extends HTMLElement> {
  onKeyDown?: KeyboardEventHandler<E>;
}

/**
 * @since 6.0.0
 */
export type IsFocusTypeDisabled = (type: FocusType) => boolean;

export interface FocusContainerComponentProps {
  /**
   * @defaultValue `() => false`
   */
  isFocusTypeDisabled?: IsFocusTypeDisabled;

  /**
   * @defaultValue `false`
   */
  disableTransition?: boolean;
}

/** @since 6.0.0 */
export interface FocusContainerOptions<E extends HTMLElement>
  extends FocusContainerTransitionOptions<E>, FocusContainerComponentProps {
  onKeyDown?: KeyboardEventHandler<E>;
  /**
   * This to `true` will capture the current focused element as a focus target
   * once the `onExited` hook is fired. This should usually be set to the
   * `transitionIn` prop for `useTransition`.
   */
  activate: boolean;

  /**
   * Set this to true if elements that can be programmatically focused should be
   * included. These would be elements with a `tabIndex={-1}`.
   *
   * @defaultValue `false`
   */
  programmatic?: boolean;
}

/** @since 6.0.0 */
export interface FocusContainerImplementation<E extends HTMLElement> {
  nodeRef: RefObject<E | null>;
  eventHandlers: Required<FocusContainerEventHandlers<E>>;
  transitionOptions: Required<FocusContainerTransitionOptions<E>>;
}

/**
 * This hook is mostly for internal use only for dialog accessibility behavior
 * to prevent the focus from moving outside of the dialog while it is visible.
 * This API was developed to be used with the `useCSSTransition`/`useTransition`
 * hooks as well.
 *
 * @example Main Usage
 * ```tsx
 * import { Button } from "@react-md/core/button/Button"
 * import { useFocusContainer } from "@react-md/core/focus/useFocusContainer"
 * import { useScaleTransition } from "@react-md/core/transition/useScaleTransition"
 * import { useToggle } from "@react-md/core/useToggle"
 * import { type ReactElement } from "react";
 *
 * function Example(): ReactElement {
 *   const { toggled, enable, disable } = useToggle(false);
 *
 *   const { eventHandlers, transitionOptions } = useFocusContainer({
 *     activate: toggled,
 *   });
 *   const { elementProps, rendered } = useScaleTransition({
 *     transitionIn: toggled,
 *     temporary: true,
 *     ...transitionOptions,
 *   });
 *
 *   return (
 *     <>
 *       <Button onClick={enable}>Toggle</Button>
 *       {rendered && (
 *         <div {...eventHandlers} {...elementProps}>
 *           <Button onClick={disable}>Button 1</Button>
 *           <Button onClick={disable}>Button 2</Button>
 *           <Button onClick={disable}>Button 3</Button>
 *           <Button onClick={disable}>Button 4</Button>
 *         </div>
 *       )}
 *     </>
 *   );
 * }
 * ```
 *
 * @since 6.0.0
 */
export function useFocusContainer<E extends HTMLElement>(
  options: FocusContainerOptions<E>
): FocusContainerImplementation<E> {
  const {
    nodeRef,
    activate,
    onEnter,
    onEntering,
    onEntered,
    onExit,
    onExiting,
    onExited,
    onKeyDown = noop,
    programmatic = false,
    disableTransition = false,
    isFocusTypeDisabled = noop,
  } = options;

  const [ref, refCallback] = useEnsuredRef(nodeRef);
  const prevFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!activate || !(document.activeElement instanceof HTMLElement)) {
      return;
    }

    prevFocus.current = document.activeElement;
  }, [activate]);

  return {
    nodeRef: ref,
    transitionOptions: {
      nodeRef: refCallback,
      ...getTransitionCallbacks({
        onEnter,
        onEnterOnce: () => {
          const instance = ref.current;
          if (
            instance &&
            !isFocusTypeDisabled("mount") &&
            (!document.activeElement ||
              !instance.contains(document.activeElement))
          ) {
            instance.focus();
          }
        },
        onEntering,
        onEntered,
        onExitOnce: () => {
          if (isFocusTypeDisabled("unmount")) {
            return;
          }

          // For some reason, the `"Enter"` keydown event fires at a different timing
          // than the Space  keydown event.
          globalThis.requestAnimationFrame(() => {
            prevFocus.current?.focus();
          });
        },
        onExit,
        onExiting,
        onExited,
        disableTransition,
      }),
    },
    eventHandlers: {
      onKeyDown(event) {
        onKeyDown(event);
        if (
          event.isPropagationStopped() ||
          event.key !== "Tab" ||
          isFocusTypeDisabled("keyboard")
        ) {
          return;
        }

        const { target, shiftKey, currentTarget } = event;
        const elements = getFocusableElements(currentTarget, programmatic);
        const count = elements.length;
        if (count === 0) {
          event.preventDefault();
          return;
        }

        // if the container element is the current focus, need to either focus
        // the first or last element so focus doesn't escape
        let type: FocusElementWithinType | undefined;
        if (
          count === 1 ||
          (!shiftKey &&
            (target === currentTarget || target === elements[count - 1]))
        ) {
          type = "first";
        } else if (
          shiftKey &&
          (target === currentTarget || target === elements[0])
        ) {
          type = "last";
        }

        if (type) {
          event.preventDefault();
          focusElementWithin({
            type,
            elements,
            container: currentTarget,
          });
        }
      },
    },
  };
}
