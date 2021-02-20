import React, {
  ElementType,
  forwardRef,
  HTMLAttributes,
  ReactElement,
} from "react";

import { useEnsuredRef } from "../useEnsuredRef";
import { useFocusOnMount } from "./useFocusOnMount";
import { FocusFallback, usePreviousFocus } from "./usePreviousFocus";
import { useTabFocusWrap } from "./useTabFocusWrap";

export interface FocusContainerOptionsProps {
  /**
   * By default, the focus container will try to maintain a cache of the
   * focusable elements that is updated only when this component re-renders. If
   * the children are extremely dynamic and focusable elements can be
   * removed/added without this component updating, you should disable the cache
   * so that the focusable elements are updated each time the tab key is
   * pressed. Disabling the cache will be slightly slower for larger focusable
   * areas, but it might not be too bad.
   *
   * NOTE: The only important elements are the *first* and *last* elements in
   * this list.  So if your children aren't changing the first and last
   * elements, there's no need to disable the cache.
   */
  disableFocusCache?: boolean;

  /**
   * The default behavior for the focus container is to focus an element once it
   * is mounted and the `disabled` prop is not enabled. This behavior can be
   * disabled if this is not wanted for some reason.
   */
  disableFocusOnMount?: boolean;

  /**
   * Boolean if the focus behavior should be disabled. This should really be
   * used if you are using nested focus containers for temporary material (such
   * as dialogs or menus).
   */
  disableTabFocusWrap?: boolean;

  /**
   * Boolean if the element that gets focused on mount should try to not scroll
   * the focused element into view which is the default behavior. This should
   * normally remain `false`, but it is useful to set to `true` if the
   * `FocusContainer` is within a transition that appears offscreen.
   */
  disableFocusOnMountScroll?: boolean;

  /**
   * The default behavior for the focus container is to attempt to focus the
   * element that was focused before the focus container was mounted since it is
   * generally used for temporary material. If there are cases where this
   * behavior is not wanted, you can enable this prop.
   */
  disableFocusOnUnmount?: boolean;

  /**
   * This is the element that should be focused by default when the component is
   * mounted.  This can either be the first or last focusable item or a query
   * selector string that is run against this component to focus.
   */
  defaultFocus?: "first" | "last" | string;

  /**
   * When the focus container unmounts, it will attempt to re-focus the element
   * that was focused before the focus container was mounted unless the
   * `disableFocusOnUnmount` prop is enabled. There might be cases where
   * unmounting the focus container causes the page to re-render and the
   * previous element no longer exists. When this happens keyboard users _might_
   * have a problem navigating through the page again depending on how the
   * browser implemented the native tab behavior so this prop allows you to
   * ensure that a specific element is focused in these cases.
   *
   * This can either be a query selector string, a specific HTMLElement, or a
   * function that finds a specific HTMLElement to focus.
   */
  unmountFocusFallback?: FocusFallback;
}

export interface FocusContainerProps
  extends FocusContainerOptionsProps,
    HTMLAttributes<HTMLElement> {
  /**
   * The component to render the focus container as. This should really not be
   * used as it is more for internal usage. The only base requirements for this
   * prop is that it must either be a element string (`"div"`, `"span"`, etc) or
   * a custom component that has forwarded the ref to the DOM node.
   */
  component?: ElementType;
}

/**
 * The `FocusContainer` is a wrapper for a few of the accessibility hooks to
 * maintain focus within an element.
 */
export const FocusContainer = forwardRef<HTMLDivElement, FocusContainerProps>(
  function FocusContainer(
    {
      children,
      onKeyDown,
      component: Component = "div",
      defaultFocus = "first",
      disableFocusCache = false,
      disableFocusOnMount = false,
      disableFocusOnMountScroll = false,
      disableFocusOnUnmount = false,
      disableTabFocusWrap = false,
      unmountFocusFallback = "",
      ...props
    },
    forwardedRef
  ): ReactElement {
    const [ref, refHandler] = useEnsuredRef(forwardedRef);

    usePreviousFocus(disableFocusOnUnmount, unmountFocusFallback);
    useFocusOnMount(
      ref,
      defaultFocus,
      disableFocusOnMountScroll,
      false,
      disableFocusOnMount
    );
    const handleKeyDown = useTabFocusWrap({
      disabled: disableTabFocusWrap,
      disableFocusCache,
      onKeyDown,
    });

    return (
      <Component {...props} onKeyDown={handleKeyDown} ref={refHandler}>
        {children}
      </Component>
    );
  }
);

/* istanbul ignore next */
if (process.env.NODE_ENV !== "production") {
  try {
    const PropTypes = require("prop-types");

    FocusContainer.propTypes = {
      disableFocusCache: PropTypes.bool,
      disableFocusOnMount: PropTypes.bool,
      disableFocusOnUnmount: PropTypes.bool,
      disableTabFocusWrap: PropTypes.bool,
      defaultFocus: PropTypes.oneOfType([
        PropTypes.oneOf(["first", "last"]),
        PropTypes.string,
      ]),
      component: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.func,
        PropTypes.object,
      ]),
      unmountFocusFallback: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.func,
        PropTypes.object,
      ]),
      children: PropTypes.node,
      onKeyDown: PropTypes.func,
      disableFocusOnMountScroll: PropTypes.bool,
    };
  } catch (e) {}
}
