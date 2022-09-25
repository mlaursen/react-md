import type { KeyboardEventHandler, RefObject } from "react";
import { useEffect, useRef } from "react";

import type { TransitionOptions } from "../transition/types";
import { useEnsuredRef } from "../useEnsuredRef";
import type { FocusElementWithinType } from "./utils";
import { focusElementWithin, getFocusableElements } from "./utils";

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
 * @remarks \@since 6.0.0
 */
export type FocusType = "mount" | "unmount" | "keyboard";

/** @remarks \@since 6.0.0 */
export type FocusContainerTransitionOptions<E extends HTMLElement> = Pick<
  TransitionOptions<E>,
  "onEntered" | "onExited" | "nodeRef"
>;

/** @remarks \@since 6.0.0 */
export interface FocusContainerEventHandlers<E extends HTMLElement> {
  onKeyDown?: KeyboardEventHandler<E>;
}

export interface FocusContainerComponentProps {
  /**
   * @defaultValue `() => false`
   */
  isFocusTypeDisabled?(type: FocusType): boolean;
}

/** @remarks \@since 6.0.0 */
export interface FocusContainerOptions<E extends HTMLElement>
  extends FocusContainerTransitionOptions<E>,
    FocusContainerComponentProps {
  onKeyDown?: KeyboardEventHandler<E>;
  /**
   * This to `true` will capture the current focused element as a focus target
   * once the `onExited` hook is fired. This should usually be set to the
   * `transitionIn` prop for `useTransition`.
   */
  activate: boolean;
}

/** @remarks \@since 6.0.0 */
export interface FocusContainerImplementation<E extends HTMLElement> {
  ref: RefObject<E>;
  eventHandlers: Required<FocusContainerEventHandlers<E>>;
  transitionOptions: Required<FocusContainerTransitionOptions<E>>;
}

/**
 * This hook is mostly for internal use only for dialog accessibility behavior
 * to prevent the focus from moving outside of the dialog while it is visible.
 * This API was developed to be used with the `useCSSTransition`/`useTransition`
 * hooks as well.
 *
 * @example
 * Main Usage
 * ```tsx
 * import { Button } from "@react-md/button";
 * import { useFocusContainer, useScaleTransition, useToggle } from "@react-md/core";
 * import type { ReactElement } from "react";
 *
 * function Example(): ReactElement {
 *   const { toggled, toggle } = useToggle(false);
 *
 *   const { eventHandlers, transitionOptions } = useFocusContainer({
 *     activate: visible,
 *   });
 *   const { elementProps, rendered } = useScaleTransition({
 *     transitionIn: visible,
 *     temporary: true,
 *     ...transitionOptions,
 *   });
 *
 *   return (
 *     <>
 *       <Button onClick={toggle}>Toggle</Button>
 *       {rendered && (
 *         <div {...eventHandlers} {...elementProps}>
 *           <Button>Button 1</Button>
 *           <Button>Button 2</Button>
 *           <Button>Button 3</Button>
 *           <Button>Button 4</Button>
 *         </div>
 *       )}
 *     </>
 *   );
 * }
 * ```
 *
 * @remarks \@since 6.0.0
 */
export function useFocusContainer<E extends HTMLElement>(
  options: FocusContainerOptions<E>
): FocusContainerImplementation<E> {
  const {
    nodeRef,
    activate,
    onEntered = noop,
    onExited = noop,
    onKeyDown = noop,
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
    ref,
    transitionOptions: {
      nodeRef: refCallback,
      onEntered(appearing) {
        onEntered(appearing);
        if (
          !isFocusTypeDisabled("mount") &&
          (!document.activeElement ||
            !ref.current?.contains(document.activeElement))
        ) {
          ref.current?.focus();
        }
      },
      onExited() {
        onExited();
        if (!isFocusTypeDisabled("unmount")) {
          prevFocus.current?.focus();
        }
      },
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

        const container = event.currentTarget;
        const elements = getFocusableElements(container);
        const count = elements.length;
        if (count === 0) {
          event.preventDefault();
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
    },
  };
}
