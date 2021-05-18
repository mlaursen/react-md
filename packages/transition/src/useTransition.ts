import { Dispatch, RefCallback, useEffect, useReducer, useRef } from "react";
import { useEnsuredRef } from "@react-md/utils";

import {
  ENTER,
  ENTERED,
  ENTERING,
  EXIT,
  EXITED,
  EXITING,
  TransitionAction,
  TransitionStage,
  UNMOUNT,
} from "./constants";
import { getNextStage } from "./getNextStage";
import { getTimeout } from "./getTimeout";
import { getTimeoutDuration } from "./getTimeoutDuration";
import { TransitionOptions } from "./types";

export interface TransitionState {
  /**
   * The current stage for the transition. This probably won't be used too much
   * unless you want to apply custom classnames based on the stage.
   */
  stage: TransitionStage;

  /**
   * Boolean if the component should be rendered in the DOM. This will always be
   * `true` if the `temporary` option is omitted or `false`. Otherwise, it will
   * be `true` during the transitions and entered.
   */
  rendered: boolean;

  /**
   * Boolean if the transition is in the initial mounting/appearing stage while
   * entering. This will be `false` if the `appear` option is `false` and
   * automatically set to `false` after the first transition if `appear` was
   * `true`.
   */
  appearing: boolean;
}

export interface TransitionReturnValue<E extends HTMLElement>
  extends TransitionState {
  /**
   * A ref that must be passed to a DOM node for the transition to work. This
   * _technically_ should not need to be passed to a DOM node for non-css
   * transitions or transitions that do not require access to a DOM node, but it
   * it seems like too much work to make it conditional for those types for
   * transitions.
   */
  ref: RefCallback<E>;

  /**
   * A dispatch function that cna update the transition state manually. This
   * should really not be used too much unless your transition is for appear
   * only transitions. For those cases, you can watch for a value change and
   * just trigger the ENTER transition again:
   *
   * ```ts
   * const prevThing = useRef(thing);
   * if (thing !== prevThing.current) {
   *   prevThing.current = thing;
   *   dispatch(ENTER);
   * }
   * ```
   *
   * Note: This **should be dispatched during the render** to get the correct
   * timing.
   */
  dispatch: Dispatch<TransitionAction>;
}

/**
 *
 * @internal
 */
const reducer = (
  state: TransitionState,
  action: TransitionAction
): TransitionState => {
  switch (action) {
    case ENTER:
    case ENTERING:
    case EXIT:
    case EXITING:
    case EXITED:
      return { ...state, rendered: true, stage: action };
    case ENTERED:
      return { rendered: true, stage: action, appearing: false };
    case UNMOUNT:
      return { stage: EXITED, rendered: false, appearing: false };
    default:
      return state;
  }
};

/**
 *
 * @internal
 */
const INITIAL_STATE: TransitionState = {
  appearing: false,
  rendered: true,
  stage: ENTERED,
};

/**
 *
 * @internal
 */
const getInitialState =
  (
    transitionIn: boolean,
    temporary: boolean,
    appear: boolean
  ): (() => TransitionState) =>
  () => {
    return {
      rendered: !temporary || transitionIn,
      appearing: appear && transitionIn,
      stage: transitionIn && !appear ? ENTERED : EXITED,
    };
  };

/**
 * This is heavily inspired by the `Transition` component from
 * `react-transition-group` since it's really just a hook version of it.
 *
 * This hook allows you to transition between an enter and exit state with
 * defined timeouts, but you'll most likely be looking for the
 * `useCSSTransition` instead.
 *
 * @param options - All the options used for the transition.
 * @returns An object describing the current transition stage and props that
 * should be passed to a component.
 */
export function useTransition<E extends HTMLElement = HTMLDivElement>({
  appear = false,
  repaint = false,
  temporary = false,
  transitionIn,
  timeout: propTimeout,
  onEnter,
  onEntering,
  onEntered,
  onExit,
  onExiting,
  onExited,
  ref: propRef,
}: TransitionOptions<E>): TransitionReturnValue<E> {
  const [{ stage, rendered, appearing }, dispatch] = useReducer(
    reducer,
    INITIAL_STATE,
    getInitialState(transitionIn, temporary, appear)
  );

  // need to store in mutable ref since these are mostly going to be arrow
  // functions and shouldn't cause the transitions to change
  const handlers = useRef({
    onEnter,
    onEntering,
    onEntered,
    onExit,
    onExiting,
    onExited,
  });
  useEffect(() => {
    handlers.current = {
      onEnter,
      onEntering,
      onEntered,
      onExit,
      onExiting,
      onExited,
    };
  });

  const timeout = getTimeout(propTimeout, appear);
  const [nodeRef, refHandler] = useEnsuredRef(propRef);

  const disableEnterExitTransition = useRef(!appear || !transitionIn);

  // this effect handles the transition from:
  // - EXITED -> ENTER
  // - ENTERED -> EXIT
  // - EXITED -> ENTERED (when enter timeout is 0)
  // - ENTERED -> EXITED (when exit timeout is 0)
  //
  // all the dependencies are ignored except for `transitionIn` since the
  // other values changing would actually cause more bugs and this effect
  // really doesn't care if they changed.
  useEffect(() => {
    // should never trigger a transition on mount unless both the `appear` and
    // `transitionIn` are enabled for the appear transition
    if (disableEnterExitTransition.current) {
      disableEnterExitTransition.current = false;
      return;
    }

    let duration = 0;
    if (transitionIn) {
      duration = appearing ? timeout.appear : timeout.enter;
    } else {
      duration = timeout.exit;
    }

    if (duration > 0) {
      dispatch(transitionIn ? ENTER : EXIT);
    } else {
      dispatch(transitionIn ? ENTERED : EXITED);
    }

    // see comment above about why it's only `transitionIn`
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transitionIn]);

  const isFirstRender = useRef(true);

  // this effect handles the transitions for:
  // - ENTER -> ENTERING
  // - ENTERING -> ENTERED
  // - EXIT -> EXITING
  // - EXITING -> EXIT
  useEffect(() => {
    // need to skip the effects on first render since it should only be called
    // after a transition change
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const node = nodeRef.current;
    if (node) {
      if (repaint && stage !== EXITED && stage !== ENTERED) {
        // force repaint for CSS transitions
        // eslint-disable-next-line no-unused-expressions
        node.scrollTop;
      }

      const { onEnter, onEntering, onEntered, onExit, onExiting, onExited } =
        handlers.current;
      switch (stage) {
        case ENTER:
          if (onEnter) {
            onEnter(node, appearing);
          }
          break;
        case ENTERING:
          if (onEntering) {
            onEntering(node, appearing);
          }
          break;
        case ENTERED:
          if (onEntered) {
            onEntered(node, appearing);
          }
          break;
        case EXIT:
          if (onExit) {
            onExit(node);
          }
          break;
        case EXITING:
          if (onExiting) {
            onExiting(node);
          }
          break;
        case EXITED:
          if (onExited) {
            onExited(node);
          }
          break;
        // no default
      }
    }

    const nextStage = getNextStage(stage);
    if (stage === nextStage) {
      if (stage === EXITED && temporary) {
        dispatch(UNMOUNT);
      }

      return;
    }

    const duration = getTimeoutDuration(
      stage,
      timeout.appear,
      timeout.enter,
      timeout.exit,
      appearing
    );

    if (duration <= 0) {
      dispatch(nextStage);
      return;
    }

    const dispatchTimeout = window.setTimeout(() => {
      dispatch(nextStage);
    }, duration);

    return () => {
      window.clearTimeout(dispatchTimeout);
    };
  }, [
    nodeRef,
    appearing,
    repaint,
    stage,
    temporary,
    timeout.appear,
    timeout.enter,
    timeout.exit,
  ]);

  return {
    ref: refHandler,
    stage,
    rendered,
    appearing,
    dispatch,
  };
}
