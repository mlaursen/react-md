import { useReducer, useRef, useState } from "react";
import { useSsr } from "../SsrProvider";
import { useEnsuredRef } from "../useEnsuredRef";
import { useIsomorphicLayoutEffect } from "../useIsomorphicLayoutEffect";

import type {
  TransitionHookOptions,
  TransitionHookReturnValue,
  TransitionStage,
  TransitionState,
} from "./types";
import { getTransitionTimeout } from "./utils";

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
 * @typeParam E - The HTMLElement type used or the ref required for the
 * transition.
 * @remarks \@since 4.0.0
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
    appear,
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
      appear,
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
          return {
            stage: "exited",
            rendered: false,
            appearing: false,
          };
      }
    },
    INITIAL_STATE,
    () =>
      ({
        appearing: appear && transitionIn,
        rendered: !temporary || transitionIn,
        stage: transitionIn && !appear ? "entered" : "exited",
      } as const)
  );
  const { appearing, rendered, stage } = state;

  const isFirstRender = useRef(true);
  useIsomorphicLayoutEffect(() => {
    const {
      appear,
      timeout,
      reflow,
      onEnter,
      onEntering,
      onEntered,
      onExit,
      onExiting,
      onExited,
    } = configurationRef.current;

    if (isFirstRender.current) {
      isFirstRender.current = false;
      if (appear && transitionIn) {
        dispatch("enter");
      }

      return;
    }

    // Cancel any exiting/exited transitions and instead immediately start the
    // enter transition
    if (transitionIn && stage.startsWith("exit")) {
      dispatch("enter");
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
      ref.current.scrollTop;
    }

    let duration = 0;
    let nextStage: TransitionStage = stage;
    switch (stage) {
      case "enter":
        onEnter(appearing);
        nextStage = "entering";
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
        onExit();
        nextStage = "exiting";
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
      if (stage === "exited" && temporary) {
        dispatch("unmount");
      }

      return;
    }

    if (duration <= 0) {
      dispatch(nextStage);
      return;
    }

    const timer = window.setTimeout(() => {
      dispatch(nextStage);
    }, duration);

    return () => {
      window.clearTimeout(timer);
    };
  }, [appearing, ref, stage, temporary, transitionIn]);

  return {
    ref: refCallback,
    stage,
    rendered,
    appearing,
    transitionTo: dispatch,
    disablePortal: propDisablePortal || disablePortal,
  };
}
