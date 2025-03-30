"use client";

import { useReducer, useRef, useState } from "react";

import { useSsr } from "../SsrProvider.js";
import { useEnsuredRef } from "../useEnsuredRef.js";
import { useIsomorphicLayoutEffect } from "../useIsomorphicLayoutEffect.js";
import { TRANSITION_CONFIG } from "./config.js";
import type {
  TransitionHookOptions,
  TransitionHookReturnValue,
  TransitionStage,
  TransitionState,
} from "./types.js";
import { getTransitionTimeout } from "./utils.js";

const INITIAL_STATE: TransitionState = {
  appearing: false,
  rendered: true,
  stage: "exited",
};

const noop = (): void => {
  // do nothing
};

/**
 * You'll most likely want to use the {@link useCSSTransition} hook instead
 * since this is just a low-level hook that can be used to transition using
 * timeouts.
 *
 * @see {@link https://next.react-md.dev/hooks/use-transition | useTransition Demos}
 * @typeParam E - The HTMLElement type used or the ref required for the
 * transition.
 * @since 4.0.0
 * @since 6.0.0 Added the `disablePortal` flag to the return value for SSR.
 */
export function useTransition<E extends HTMLElement>(
  options: TransitionHookOptions<E>
): TransitionHookReturnValue<E> {
  const {
    nodeRef,
    timeout,
    transitionIn,
    reflow = false,
    temporary = false,
    appear = false,
    enter = true,
    exit = true,
    onEnter = noop,
    onEntering = noop,
    onEntered = noop,
    onExit = noop,
    onExiting = noop,
    onExited = noop,
    disablePortal: propDisablePortal,
  } = options;

  const configurationRef = useRef({
    timeout: getTransitionTimeout({ timeout, appear, enter, exit }),
    reflow,
    onEnter,
    onEntering,
    onEntered,
    onExit,
    onExiting,
    onExited,
  } as const);
  useIsomorphicLayoutEffect(() => {
    configurationRef.current = {
      timeout: getTransitionTimeout({ timeout, appear, enter, exit }),
      reflow,
      onEnter,
      onEntering,
      onEntered,
      onExit,
      onExiting,
      onExited,
    };
  }, [
    appear,
    enter,
    exit,
    onEnter,
    onEntered,
    onEntering,
    onExit,
    onExited,
    onExiting,
    reflow,
    timeout,
  ]);

  const ssr = useSsr();
  const [ref, refCallback] = useEnsuredRef<E>(nodeRef);
  const [disablePortal, setDisablePortal] = useState(ssr);
  const [state, dispatch] = useReducer(
    function reducer(
      state: TransitionState,
      action: TransitionStage | "unmount"
    ): TransitionState {
      const { appear, enter, exit } = configurationRef.current.timeout;
      const { appearing } = state;
      switch (action) {
        case "enter": {
          const duration = appearing ? appear : enter;
          return {
            stage: duration > 0 ? "enter" : "entered",
            rendered: true,
            appearing,
          };
        }
        case "entering":
        case "entered":
          return {
            stage: action,
            rendered: true,
            appearing,
          };
        case "exit": {
          const stage = exit > 0 ? "exit" : "exited";
          return {
            stage,
            rendered: !temporary || stage !== "exited",
            appearing: false,
          };
        }
        case "exiting":
        case "exited":
          return {
            stage: action,
            rendered: true,
            appearing: false,
          };
        case "unmount":
          if (state.stage === "exited" && !state.appearing && !state.rendered) {
            return state;
          }

          return {
            stage: "exited",
            rendered: false,
            appearing: false,
          };
      }
    },
    INITIAL_STATE,
    () => {
      let stage: TransitionStage = "exited";
      if (transitionIn) {
        stage = appear && !TRANSITION_CONFIG.disabled ? "enter" : "entered";
      }

      return {
        appearing: appear && transitionIn && !TRANSITION_CONFIG.disabled,
        rendered: !temporary || transitionIn,
        stage,
      };
    }
  );
  const { appearing, rendered, stage } = state;

  const isFirstRender = useRef(true);
  const isRehydrateAppear = useRef(ssr && !transitionIn);
  const defaultTransitionIn = useRef(transitionIn);
  useIsomorphicLayoutEffect(() => {
    const {
      timeout,
      reflow,
      onEnter,
      onEntering,
      onEntered,
      onExit,
      onExiting,
    } = configurationRef.current;
    let { onExited } = configurationRef.current;
    if (isFirstRender.current) {
      // The exited hook should **not** fire on first render since the element
      // was never in the DOM.
      isFirstRender.current = false;
      onExited = noop;
    }

    // if the transitionIn did not change between initial render and rehydration,
    // allow the enter transition to behave like normal.
    if (
      isRehydrateAppear.current &&
      !ssr &&
      !transitionIn &&
      !defaultTransitionIn.current
    ) {
      isRehydrateAppear.current = false;
    }

    // Cancel any exiting/exited transitions and instead immediately start the
    // enter transition
    if (transitionIn && stage.startsWith("exit")) {
      const nextStage = isRehydrateAppear.current ? "entered" : "enter";
      dispatch(nextStage);
      return;
    }

    // Cancel any entering/entered transitions and instead immediately start the
    // exit transition
    if (!transitionIn && stage.startsWith("enter")) {
      dispatch("exit");
      return;
    }

    if (reflow && ref.current && stage !== "exited" && stage !== "entered") {
      // force reflow by accessing scrollTop
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      ref.current.scrollTop;
    }

    let duration = 0;
    let nextStage: TransitionStage = stage;
    switch (stage) {
      case "enter":
        if (TRANSITION_CONFIG.disabled) {
          nextStage = "entered";
        } else {
          onEnter(appearing);
          nextStage = "entering";
        }
        break;
      case "entering":
        onEntering(appearing);
        duration = timeout.enter;
        nextStage = "entered";
        break;
      case "entered":
        onEntered(appearing);
        break;
      case "exit":
        if (TRANSITION_CONFIG.disabled) {
          nextStage = "exited";
        } else {
          onExit();
          nextStage = "exiting";
        }
        break;
      case "exiting":
        onExiting();
        duration = timeout.exit;
        nextStage = "exited";
        break;
      case "exited":
        onExited();
        setDisablePortal(false);
        break;
    }

    if (stage === nextStage) {
      // this is used to help catch changing the temporary prop.
      // not sure if I should really support that though...
      if (stage === "exited" && temporary) {
        dispatch("unmount");
      }

      return;
    }

    // I used to rely on the `dispatch("unmount")` above, but it seems like
    // there are some cases where re-rendering takes too long so the temporary
    // element flashes
    const dispatchStage =
      temporary && nextStage === "exited" ? "unmount" : nextStage;
    if (duration <= 0) {
      dispatch(dispatchStage);
      return;
    }

    const timer = window.setTimeout(() => {
      dispatch(dispatchStage);
    }, duration);

    return () => {
      window.clearTimeout(timer);
    };
  }, [appearing, ref, ssr, stage, temporary, transitionIn]);

  return {
    ref: refCallback,
    stage,
    rendered,
    appearing,
    transitionTo: dispatch,
    disablePortal: propDisablePortal || disablePortal,
  };
}
