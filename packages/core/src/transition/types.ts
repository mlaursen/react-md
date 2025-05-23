// This is pretty much `react-transition-group` since I liked the API wanted a
// hook implementation. I also had to redo most of the types for v4.0.0 due to
// the new `nodeRef` stuff, so it made it easier to create the types and hooks
// here.
import type { ReactElement, Ref, RefCallback } from "react";

/**
 * @since 4.0.0
 */
export interface TransitionActions {
  /**
   * Boolean if the transition should occur immediately once the component
   * mounts if the {@link TransitionOptions.transitionIn} is `true`
   *
   * @defaultValue `false`
   */
  appear?: boolean;

  /**
   * Boolean if the transition should occur whenever the
   * {@link TransitionOptions.transitionIn} is switch to `true` after the
   * component has been rendered in the DOM.
   *
   * @defaultValue `true`
   */
  enter?: boolean;

  /**
   * Boolean if the transition should occur whenever the
   * {@link TransitionOptions.transitionIn} is switch to `false` after the
   * component has been rendered in the DOM.
   *
   * @defaultValue `true`
   */
  exit?: boolean;
}

/**
 * An object timeout values that would be used for each
 * {@link TransitionActions}. If a value is set to `0` or `undefined`, the
 * transition will not occur.
 *
 * @since 4.0.0
 */
export type TransitionTimeoutObject = {
  [action in keyof TransitionActions]?: number;
};

/**
 * Either a single timeout duration in milliseconds to use for each of the
 * {@link TransitionActions} stages, or an object of transition durations.
 *
 * @since 4.0.0
 */
export type TransitionTimeout = number | Readonly<TransitionTimeoutObject>;

/**
 * @since 6.0.0
 */
export type TransitionEnterStage = "enter" | "entering" | "entered";

/**
 * @since 6.0.0
 */
export type TransitionExitStage = "exit" | "exiting" | "exited";

/**
 * The way the transition works is by flowing through the different stages and
 * assigning waiting for a timeout to occur. Setting the `stage` to `enter` will
 * begin the enter transition going from `enter -> entering -> entered` while
 * setting the stage to `exit` will transition from `exit -> exiting -> exited`.
 *
 * @since 4.0.0
 * @since 6.0.0 Type union between `TransitionEnterStage` and `TransitionExitStage`
 */
export type TransitionStage = TransitionEnterStage | TransitionExitStage;

/**
 * This function is called at each `"enter"` {@link TransitionStage}. If a
 * {@link TransitionOptions.nodeRef} was provided, the DOM node should be
 * available in `nodeRef.current` by this point if the transition requires DOM
 * calculations.
 *
 * @param appearing - Boolean if this is the initial `appear` flow.
 * @since 4.0.0
 */
export type TransitionEnterHandler = (appearing: boolean) => void;

/**
 * This function is called at each `"exit"` {@link TransitionStage}. If a
 * {@link TransitionOptions.nodeRef} was provided, the DOM node should be
 * available in `nodeRef.current` by this point if the transition requires DOM
 * calculations.
 *
 * @since 4.0.0
 */
export type TransitionExitHandler = () => void;

/**
 * @since 4.0.0
 */
export interface TransitionCallbacks {
  /**
   * This function will be called once the {@link TransitionStage} has been set
   * to `"enter"`.
   *
   * NOTE: This callback will be skipped when transitions are disabled. Use the
   * `getTransitionCallbacks` helper if something should only be called once
   * while entering.
   *
   * @see {@link TransitionEnterHandler}
   */
  onEnter?: TransitionEnterHandler;

  /**
   * This function will be called once the {@link TransitionStage} has been set
   * to `"enter"`.
   *
   * NOTE: This callback will be skipped when transitions are disabled. Use the
   * `getTransitionCallbacks` helper if something should only be called once
   * while entering.
   *
   * @see {@link TransitionEnterHandler}
   */
  onEntering?: TransitionEnterHandler;

  /**
   * This function will be called once the {@link TransitionStage} has been set
   * to `"entering"`.
   *
   * @see {@link TransitionEnterHandler}
   */
  onEntered?: TransitionEnterHandler;

  /**
   * This function will be called once the {@link TransitionStage} has been set
   * to `"entered"`.
   *
   * NOTE: This callback will be skipped when transitions are disabled. Use the
   * `getTransitionCallbacks` helper if something should only be called once
   * while exiting.
   *
   * @see {@link TransitionEnterHandler}
   */
  onExit?: TransitionExitHandler;

  /**
   * This function will be called once the {@link TransitionStage} has been set
   * to `"exiting"`.
   *
   * NOTE: This callback will be skipped when transitions are disabled. Use the
   * `getTransitionCallbacks` helper if something should only be called once
   * while exiting.
   *
   * @see {@link TransitionExitHandler}
   */
  onExiting?: TransitionExitHandler;

  /**
   * This function will be called once the {@link TransitionStage} has been set
   * to `"exited"`.
   *
   * @see {@link TransitionExitHandler}
   */
  onExited?: TransitionExitHandler;
}

/**
 * @typeParam E - An HTMLElement type used for the ref required for the
 * transition.
 * @since 4.0.0
 */
export interface PreconfiguredTransitionInDefaultedOptions<
  E extends HTMLElement,
> extends TransitionActions,
    TransitionCallbacks {
  /**
   * An optional ref that will be merged with the
   * {@link TransitionHookReturnValue.ref}
   */
  nodeRef?: Ref<E>;

  /**
   * Boolean if the element should mount and unmount based on the
   * {@link PreconfiguredTransitionInDefaultedOptions.transitionIn} value.
   *
   * @defaultValue `false`
   */
  temporary?: boolean;

  /**
   * This boolean controls the transition by activating flowing through the
   * {@link TransitionStage}.
   *
   * @see {@link TransitionActions} for a description around the transitions.
   */
  transitionIn?: boolean;

  /** {@inheritDoc TransitionTimeout} */
  timeout?: TransitionTimeout;
}

/**
 * @typeParam E - An HTMLElement type used for the ref required for the
 * transition.
 * @since 4.0.0
 */
export interface PreconfiguredTransitionOptions<E extends HTMLElement>
  extends PreconfiguredTransitionInDefaultedOptions<E> {
  /** {@inheritDoc PreconfiguredTransitionInDefaultedOptions.transitionIn} */
  transitionIn: boolean;
}

/**
 * @typeParam E - An HTMLElement type used for the ref required for the
 * transition.
 * @since 4.0.0
 */
export interface TransitionOptions<E extends HTMLElement>
  extends PreconfiguredTransitionOptions<E> {
  /** {@inheritDoc TransitionTimeout} */
  timeout: TransitionTimeout;
}

/**
 * An object of classnames that will be applied based on the
 * {@link TransitionStage} where all the classes in the previous stages will
 * also be applied.
 *
 * @example Explaining className application
 * ```ts
 * const { ref, className, stage, appearing } = useCSSTransition({
 *   appear: true,
 *   enter: true,
 *   exit: true,
 *   timeout: 300,
 *   classNames: {
 *     appear: "appear",
 *     appearEnter: "appear--enter",
 *     appearDone: "appear--done appear--complete",
 *     enter: "enter",
 *     enterEnter: "",
 *     enterDone: "enter--done enter--complete",
 *     exit: "",
 *     exitEnter: "",
 *     exitDone: "exit--done exit--complete",
 *   }
 * });
 *
 * // stage === "enter" && appearing
 * // className === "appear"
 * //
 * // stage === "entering" && appearing
 * // className === "appear appear--enter"
 * //
 * // stage === "entered" && appearing
 * // className === "appear--done appear--complete"
 * //
 * //
 * // stage === "enter" && !appearing
 * // className === "enter"
 * //
 * // stage === "entering" && !appearing
 * // className === "enter"
 * //
 * // stage === "entered" && !appearing
 * // className === "enter--done enter--complete"
 * //
 * //
 * // stage === "exit"
 * // className === ""
 * //
 * // stage === "exiting"
 * // className === ""
 * //
 * // stage === "exited"
 * // className === "exit--done exit--complete"
 * ```
 *
 * @since 4.0.0
 */
export interface CSSTransitionClassNamesObject {
  /**
   * The class name to apply starting at the `"enter"` {@link TransitionStage}
   * while {@link TransitionState.appearing}.
   *
   * @defaultValue `""`
   */
  appear?: string;

  /**
   * The class name to apply starting at the `"entering"` {@link TransitionStage}
   * while {@link TransitionState.appearing}.
   *
   * @defaultValue `""`
   */
  appearActive?: string;

  /**
   * The class name to apply starting at the `"entered"` {@link TransitionStage}
   * while {@link TransitionState.appearing}.
   *
   * @defaultValue `""`
   */
  appearDone?: string;

  /**
   * The class name to apply starting at the `"enter"` {@link TransitionStage}
   *
   * @defaultValue `""`
   */
  enter?: string;

  /**
   * The class name to apply starting at the `"entering"` {@link TransitionStage}
   *
   * @defaultValue `""`
   */
  enterActive?: string;

  /**
   * The class name to apply starting at the `"entered"` {@link TransitionStage}
   *
   * @defaultValue `""`
   */
  enterDone?: string;

  /**
   * The class name to apply starting at the `"exit"` {@link TransitionStage}
   *
   * @defaultValue `""`
   */
  exit?: string;

  /**
   * The class name to apply starting at the `"exiting"` {@link TransitionStage}
   *
   * @defaultValue `""`
   */
  exitActive?: string;

  /**
   * The class name to apply starting at the `"exited"` {@link TransitionStage}
   *
   * @defaultValue `""`
   */
  exitDone?: string;
}

/**
 * @since 4.0.0
 */
export type CSSTransitionClassNames =
  | string
  | Readonly<CSSTransitionClassNamesObject>;

/**
 * @typeParam E - An HTMLElement type used for the ref required for the
 * transition.
 * @since 4.0.0
 */
export interface PreconfiguredCSSTransitionInDefaultedOptions<
  E extends HTMLElement,
> extends PreconfiguredTransitionInDefaultedOptions<E> {
  /**
   * An optional className to be merged with the transition classes.
   */
  className?: string;

  /**
   * When this is `true` and the {@link temporary} option is `false`, the
   * element will gain a class name to hide it with `display: none` instead of
   * conditionally rendering the element.
   *
   * @defaultValue `false`
   * @since 6.0.0
   */
  exitedHidden?: boolean;
}

/**
 * @typeParam E - An HTMLElement type used for the ref required for the
 * transition.
 * @since 4.0.0
 */
export interface PreconfiguredCSSTransitionOptions<E extends HTMLElement>
  extends PreconfiguredCSSTransitionInDefaultedOptions<E> {
  /** {@inheritDoc PreconfiguredTransitionInDefaultedOptions.transitionIn} */
  transitionIn: boolean;
}

/**
 * @since 6.0.0
 */
export interface SSRTransitionOptions {
  /**
   * This is mostly used internally to make it so that you can render portalled
   * elements inline with content if SSR is enabled in your app. To enable this
   * feature, the {@link CoreProvidersProps.ssr} must be set to `true`.
   *
   * This value will be `true` if a portalled element was rendered by default
   * from the server and remain true until it unmounts from the DOM.
   *
   * @defaultValue `false`
   */
  disablePortal?: boolean;
}

/**
 * @typeParam E - An HTMLElement type used for the ref required for the
 * transition.
 * @since 4.0.0
 */
export interface TransitionHookOptions<E extends HTMLElement>
  extends TransitionOptions<E>,
    SSRTransitionOptions {
  /**
   * Boolean if the DOM should forcefully be reflow each time a transition
   * change occurs. This is generally required for any CSS transition and is
   * set to `true` for the {@link useCSSTransition} hook.
   *
   * @defaultValue `false`
   */
  reflow?: boolean;
}

/**
 * @since 4.0.0
 */
export interface TransitionState {
  /** {@inheritDoc TransitionStage} */
  stage: TransitionStage;

  /**
   * Boolean if the element should be rendered or not. This will always be
   * `true` if the {@link TransitionOptions.temporary} is `false`. Otherwise, it
   * will be `true` when not the `"exited"` {@link TransitionStage}.
   */
  rendered: boolean;

  /**
   * Boolean if this is the first {@link TransitionActions.appear} transition.
   * This will be `true` during the first transition if
   * {@link TransitionActions.appear} was also `true`. Otherwise it will be
   * `false`.
   */
  appearing: boolean;
}

/**
 * @typeParam E - An HTMLElement type used for the ref required for the
 * transition.
 * @since 4.0.0
 */
export interface TransitionHookReturnValue<E extends HTMLElement>
  extends TransitionState,
    Required<SSRTransitionOptions> {
  /**
   * A ref that is required for the transition to occur and should be passed to
   * the element affected by the transition.
   */
  ref: RefCallback<E>;

  /**
   * A function that can be used to specifically set the transition to a
   * specific stage. This shouldn't really be used too much and is really just
   * useful for "appear only transitions" that do not unmount the child
   * elements.
   *
   * @example Simple Example
   * ```tsx
   * import { ReactElement, useEffect, useRef } from "react";
   * import { useCSSTransition } from "@react-md/transition";
   * import { useRouter } from "react-router-dom";
   *
   * function Example(): ReactElement {
   *   const { pathname } = useRouter();
   *   const { elementProps, transitionTo } = useCSSTransition({
   *     transitionIn: true,
   *     timeout: 1000,
   *     classNames: "some-enter-transition",
   *   });
   *
   *   useEffect(() => {
   *     // Do not trigger transition on first load.
   *     if (prevPathname.current === pathname) {
   *       return;
   *     }
   *
   *     prevPathname.current = pathname;
   *     transitionTo("enter");
   *   }, [pathname, transitionTo]);
   *
   *   return <div {...elementProps}>{content}</div>;
   * }
   * ```
   *
   * @param stage - The {@link TransitionStage} to set to
   */
  transitionTo: (stage: TransitionStage) => void;
}

/**
 * @typeParam E - An HTMLElement type used for the ref required for the
 * transition.
 * @since 4.0.0
 */
export interface CSSTransitionHookOptions<E extends HTMLElement>
  extends PreconfiguredCSSTransitionOptions<E>,
    SSRTransitionOptions {
  /** {@inheritDoc TransitionTimeout} */
  timeout: TransitionTimeout;
  /** {@inheritDoc CSSTransitionClassNames} */
  classNames: CSSTransitionClassNames;
}

/**
 * @typeParam E - An HTMLElement type used for the ref required for the
 * transition.
 * @since 4.0.0
 */
export interface CSSTransitionElementProps<E extends HTMLElement> {
  /** @see {@link TransitionHookReturnValue.ref} */
  ref: RefCallback<E>;

  /**
   * The current transition class name or `undefined`.
   */
  className: string | undefined;
}

/**
 * @typeParam E - An HTMLElement type used for the ref required for the
 * transition.
 * @since 4.0.0
 */
export interface CSSTransitionHookReturnValue<E extends HTMLElement>
  extends TransitionHookReturnValue<E>,
    CSSTransitionElementProps<E> {
  /**
   * This can be used so that you don't need to destructure multiple props from
   * the hook return value to pass to the transitioning component.
   *
   * @example Simple Example
   * ```tsx
   * import type { ReactElement } from "react";
   * import { useCSSTransition } from "@react-md/transition";
   *
   * interface ExampleProps {
   *   transitionIn: boolean;
   *   children: ReactNode;
   * }
   *
   * function Example({ transitionIn, children }: ExampleProps): ReactElement | null {
   *   const { elementProps, rendered } = useCSSTransition({
   *     timeout: 150,
   *     classNames: "example",
   *     transitionIn,
   *   });
   *
   *   if (!rendered) {
   *     return null;
   *   }
   *
   *   return <div {...elementProps}>{children}</div>
   * }
   * ```
   *
   * @example Verbose Version
   * ```tsx
   * import type { ReactElement } from "react";
   * import { useCSSTransition } from "@react-md/transition";
   *
   * interface ExampleProps {
   *   transitionIn: boolean;
   *   children: ReactNode;
   * }
   *
   * function Example({ transitionIn, children }: ExampleProps): ReactElement | null {
   *   const { ref, className, rendered } = useCSSTransition({
   *     timeout: 150,
   *     classNames: "example",
   *     transitionIn,
   *   });
   *
   *   if (!rendered) {
   *     return null;
   *   }
   *
   *   return <div ref={ref} className={className}>{children}</div>
   * }
   * ```
   */
  elementProps: CSSTransitionElementProps<E>;
}

/**
 * This is mostly an internal type that can be used to help with transitionable
 * components.
 *
 * @since 4.0.0
 */
export interface CSSTransitionComponentProps extends TransitionCallbacks {
  /** @see {@link CSSTransitionHookOptions.temporary} */
  temporary?: boolean;
  /** @see {@link TransitionTimeout} */
  timeout?: TransitionTimeout;
  /** @see {@link CSSTransitionClassNames} */
  classNames?: CSSTransitionClassNames;
  /** @see {@link CSSTransitionHookOptions.exitedHidden} */
  exitedHidden?: boolean;
}

/**
 * @typeParam E - An HTMLElement type used for the ref required for the
 * transition.
 * @since 4.0.0
 */
export interface CSSTransitionComponentImplementation<E extends HTMLElement> {
  /**
   * The child element that should have a `ref` and `className` cloned into
   * using the `cloneElement` API. If the child is a custom component, you
   * **must** use `React.forwardRef` and pass both of these to a DOM element for
   * the transition to work.
   */
  children: ReactElement<{ ref: Ref<E>; className: string | undefined }>;
}
