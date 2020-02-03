import {
  Children,
  cloneElement,
  CSSProperties,
  Dispatch,
  ReactElement,
  SetStateAction,
  useEffect,
  useRef,
  useState,
  MutableRefObject,
} from "react";
import cn from "classnames";
import { useRefCache } from "@react-md/utils";

export interface CollapseOptions {
  /**
   * Boolean if currently collapsed. When this prop changes, the collapse
   * transition will begin.
   */
  collapsed: boolean;

  /**
   * An optional style to apply. This will be merged with the required animation
   * styles of `min-height`, `padding-top`, and `padding-bottom`. If the `style`
   * prop defines any of these values, they will be used instead of this
   * component's computed values.
   */
  style?: CSSProperties;

  /**
   * An optional class name to also apply to the collapse.
   */
  className?: string;

  /**
   * An optional min height to set for the collapsing element. If this is set to
   * `0`, the `children` will be removed from the DOM once the collapsing
   * animation has finished.
   *
   * Note: the height will include the padding props. So if you want the
   * collapse to be `50px` by default and 20px padding, you would want to set
   * the `minHeight` to `90px`.  So you want to use this formula:
   *
   * ```ts
   * const desiredHeight = minHeight + minPaddingBottom + minPaddingTop;
   * ```
   */
  minHeight?: number | string;

  /**
   * The min padding bottom to apply to the collapse. This will be used with the
   * `minHeight` and `minPaddingTop` props to set the collapsed size.
   */
  minPaddingBottom?: number | string;

  /**
   * The min padding top to apply to the collapse. This will be used with the
   * `minHeight` and `minPaddingBottom` props to set the collapsed size.
   */
  minPaddingTop?: number | string;

  /**
   * The duration for the entire enter animation in milliseconds. This should
   * normally stay as the default value of `250ms`, but can be updated to be any
   * value if you feel there should be a longer animation time based on content
   * size.
   */
  enterDuration?: number;

  /**
   * The duration for the entire leave animation in milliseconds. This should
   * normally stay at the default value of `200ms`, but can be updated to be any
   * value if you feel there should be a longer animation time based on content
   * size.
   */
  leaveDuration?: number;

  /**
   * Boolean if the children should be removed from the DOM when collapsed. When
   * this prop is `undefined`, it will remove the collapsed children only when
   * the `minHeight`, `minPaddingBottom`, and `minPaddingTop` values are set to
   * `0`.
   */
  isEmptyCollapsed?: boolean;

  /**
   * An optional function to call when the "expanding" animation has finished
   * when the `collapsed` prop is changed from `true` to `false`.
   */
  onExpanded?: () => void;

  /**
   * An optional function to call when the "collapsing" animation has finished
   * when the `collapsed` prop is changed from `false` to `true`.
   */
  onCollapsed?: () => void;

  /**
   * Boolean if the transition should be disabled and just immediately switch to
   * the collapsed or full size.
   */
  disabled?: boolean;
}

type CollapseOptionsWithDefaults = CollapseOptions &
  Required<
    Pick<
      CollapseOptions,
      | "minHeight"
      | "minPaddingTop"
      | "minPaddingBottom"
      | "enterDuration"
      | "leaveDuration"
    >
  >;

type CollapsedStateConfig = Required<
  Pick<
    CollapseOptions,
    "collapsed" | "minHeight" | "minPaddingTop" | "minPaddingBottom"
  >
>;

interface CollapseState {
  entering: boolean;
  leaving: boolean;
  maxHeight?: number | string;
  paddingTop?: number | string;
  paddingBottom?: number | string;
}

type SizingDefaults = Pick<
  CollapseState,
  "maxHeight" | "paddingTop" | "paddingBottom"
>;

interface CollapseStateWithSetter extends CollapseState {
  setState: Dispatch<SetStateAction<CollapseState>>;
}

/**
 * This is a small hook that should only be used internally for creating the
 * collapse state.
 *
 * @private
 */
export function useCollapseState({
  collapsed,
  minHeight,
  minPaddingTop,
  minPaddingBottom,
}: CollapsedStateConfig): CollapseStateWithSetter {
  const [state, setState] = useState<CollapseState>({
    entering: false,
    leaving: false,
    maxHeight: collapsed ? minHeight : undefined,
    paddingTop: collapsed ? minPaddingTop : undefined,
    paddingBottom: collapsed ? minPaddingBottom : undefined,
  });

  return {
    ...state,
    setState,
  };
}

type EmptyCollapsedOptions = Pick<
  CollapseOptionsWithDefaults,
  "isEmptyCollapsed" | "minHeight" | "minPaddingTop" | "minPaddingBottom"
>;

/**
 * Checks if the collapse transition should unmount when collapsed or when the
 * collapse transition finishes. If the `isEmptyCollapse` prop was provided,
 * that value will always be used. Otherwise, it will only unmount the element
 * when the `minHeight`, `minPaddingTop`, and `minPaddingBottom` props are set
 * to `0`.
 *
 * @private
 */
export function unmountOnExit({
  isEmptyCollapsed,
  minHeight,
  minPaddingTop,
  minPaddingBottom,
}: EmptyCollapsedOptions): boolean {
  if (typeof isEmptyCollapsed === "boolean") {
    return isEmptyCollapsed;
  }

  return minHeight === 0 && minPaddingTop === 0 && minPaddingBottom === 0;
}

interface RenderedOptions extends EmptyCollapsedOptions {
  entering: boolean;
  leaving: boolean;
  collapsed: boolean;
}

/**
 * Checks if the collapsible element should be rendered.
 *
 * @private
 */
export function isRendered(options: RenderedOptions): boolean {
  const { collapsed, entering, leaving } = options;

  return !collapsed || entering || leaving || !unmountOnExit(options);
}

interface CollapseSizing {
  maxHeight?: number;
  paddingTop?: number;
  paddingBottom?: number;
}

/**
 * A small util that will find the max-height, padding-top, and padding-bottom
 * for the provided element. This is really used to be able to transition the
 * max-height value since `max-height: auto` does not transition. The only way
 * to get transition is to change max-height values manually.
 *
 * @private
 */
export function getElementSizing(element: HTMLElement | null): CollapseSizing {
  let maxHeight;
  let paddingTop;
  let paddingBottom;
  if (element) {
    maxHeight = element.scrollHeight;

    // clone the element (not deep) just to figure out it's padding without the
    // inline styles applied
    const cloned = element.cloneNode(false) as HTMLElement;
    cloned.style.padding = "";
    cloned.style.paddingLeft = element.style.paddingLeft;
    cloned.style.paddingRight = element.style.paddingRight;
    cloned.style.visibility = "hidden";

    const container = element.parentElement || document.body;
    container.appendChild(cloned);
    const style = window.getComputedStyle(cloned);
    if (style.paddingTop) {
      paddingTop = parseFloat(style.paddingTop);
    }

    if (style.paddingBottom) {
      paddingBottom = parseFloat(style.paddingBottom);
    }
    container.removeChild(cloned);
  }

  return { maxHeight, paddingTop, paddingBottom };
}

interface TransitionStyleOptions {
  transitionDuration: string;
  style?: CSSProperties;
  maxHeight?: number | string;
  paddingTop?: number | string;
  paddingBottom?: number | string;
}

/**
 * A small util that will merge and create all the styles required for the
 * current transition.
 *
 * @private
 */
export function createTransitionStyle({
  style,
  transitionDuration,
  maxHeight,
  paddingTop,
  paddingBottom,
}: TransitionStyleOptions): CSSProperties | undefined {
  if (
    typeof maxHeight === "undefined" &&
    typeof paddingTop === "undefined" &&
    typeof paddingBottom === "undefined"
  ) {
    return style;
  }

  return {
    maxHeight,
    paddingTop,
    paddingBottom,
    transitionDuration,
    ...style,
  };
}

interface CollapseTransitionResult<E extends HTMLElement> {
  transitionProps: {
    style?: CSSProperties;
    className: string;
    ref: MutableRefObject<E | null>;
    hidden?: boolean;
  };
  rendered: boolean;
}

/**
 * Creates a collapse transition that will animate between expanded and
 * collapsed states.
 *
 * NOTE: The collapse transition will only work when the element's ref returns a
 * valid HTMLElemement/DOM Node since the transition requires checking the
 * sizing and styles of an element. If you created a custom component, you
 * *must* use a `forwardRef` to pass the ref down to the DOM element used for
 * sizing for the correct transition styles.
 */
export function useCollapseTransition<E extends HTMLElement>(
  options: CollapseOptions
): CollapseTransitionResult<E> {
  const {
    collapsed,
    style,
    className,
    isEmptyCollapsed,
    minHeight = 0,
    minPaddingTop = 0,
    minPaddingBottom = 0,
    enterDuration = 250,
    leaveDuration = 200,
    onExpanded,
    onCollapsed,
    disabled = false,
  } = options;

  const ref = useRef<E | null>(null);
  const collapsedRef = useRef(collapsed);
  const [state, setState] = useState({
    entering: false,
    leaving: false,
    maxHeight: collapsed ? minHeight : undefined,
    paddingTop: collapsed ? minPaddingTop : undefined,
    paddingBottom: collapsed ? minPaddingBottom : undefined,
  });
  const { entering, leaving, maxHeight, paddingTop, paddingBottom } = state;

  const rendered = isRendered({
    entering,
    leaving,
    minHeight,
    minPaddingTop,
    minPaddingBottom,
    isEmptyCollapsed,
    collapsed: collapsedRef.current,
  });

  if (collapsedRef.current !== collapsed) {
    collapsedRef.current = collapsed;
    const defaults: SizingDefaults = {
      maxHeight: disabled ? undefined : minHeight,
      paddingTop: disabled ? undefined : minPaddingTop,
      paddingBottom: disabled ? undefined : minPaddingBottom,
    };

    let { maxHeight, paddingTop, paddingBottom } = defaults;
    if (collapsed) {
      ({ maxHeight, paddingTop, paddingBottom } = getElementSizing(
        ref.current
      ));
    }

    setState({
      maxHeight,
      paddingTop,
      paddingBottom,
      entering: disabled ? false : !collapsed,
      leaving: disabled ? false : collapsed,
    });
  }

  const transition = useRef<number | undefined>(undefined);
  const callbacks = useRefCache({ onExpanded, onCollapsed });
  useEffect(() => {
    if (!entering && !leaving) {
      return;
    }

    if (entering) {
      setState({
        ...state,
        ...getElementSizing(ref.current),
      });

      transition.current = window.setTimeout(() => {
        transition.current = undefined;
        if (callbacks.current.onExpanded) {
          callbacks.current.onExpanded();
        }

        setState(prevState => ({
          ...prevState,
          entering: false,
          maxHeight: undefined,
          paddingTop: undefined,
          paddingBottom: undefined,
        }));
      }, enterDuration);
    } else {
      setState({
        ...state,
        maxHeight: minHeight,
        paddingTop: minPaddingTop,
        paddingBottom: minPaddingBottom,
      });

      transition.current = window.setTimeout(() => {
        transition.current = undefined;
        if (callbacks.current.onCollapsed) {
          callbacks.current.onCollapsed();
        }

        setState({ ...state, leaving: false });
      }, leaveDuration);
    }

    return () => {
      window.clearTimeout(transition.current);
    };
    // disabled only want to be triggered on transition changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entering, leaving]);

  const mergedStyle = createTransitionStyle({
    style,
    transitionDuration: `${collapsed ? leaveDuration : enterDuration}ms`,
    maxHeight,
    paddingTop,
    paddingBottom,
  });

  return {
    transitionProps: {
      style: mergedStyle,
      className: cn(
        {
          "rmd-collapse": !disabled,
          "rmd-collapse--enter": !disabled && entering,
          "rmd-collapse--leave": !disabled && leaving,
          "rmd-collapse--no-overflow": collapsed || entering || leaving,
        },
        className
      ),
      ref,
      hidden: collapsed && !entering && !leaving && rendered,
    },
    rendered,
  };
}

/**
 * This hook is used to inject the required collapse transition props into a
 * single HTMLElement.
 *
 * NOTE: The collapse transition will only work when the element's ref returns a
 * valid HTMLElemement/DOM Node since the transition requires checking the
 * sizing and styles of an element. If you created a custom component, you
 * *must* use a `forwardRef` to pass the ref down to the DOM element used for
 * sizing for the correct transition styles.
 */
export function useCollapsibleElement(
  element: ReactElement,
  options: CollapseOptions
): ReactElement | null {
  const el = Children.only(element);
  const { transitionProps, rendered } = useCollapseTransition({
    ...options,
    style: el.props.style,
    className: cn(options.className, el.props.className),
  });

  if (!rendered) {
    return null;
  }

  return cloneElement(el, transitionProps);
}
