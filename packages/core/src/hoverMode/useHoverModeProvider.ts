import { useCallback, useEffect, useMemo, useRef } from "react";
import type { NonNullMutableRef, NonNullRef } from "../types";

const noop = (): void => {
  // do nothing
};

/** @remarks \@since 6.0.0 */
export interface SimpleHoverModeContext {
  /**
   * @example
   * Main Usage
   * ```ts
   * onMouseEnter(event) {
   *   const hoverTimeout = hoverTimeoutRef.current;
   *   if (typeof hoverTimeout !== "number" || mode === "touch") {
   *     return;
   *   }
   *
   *   const { id } = event.currentTarget;
   *   clearDisableTimer();
   *   window.clearTimeout(visibilityTimeout.current);
   *   visibilityTimeout.current = window.setTimeout(() => {
   *     enableHoverMode(id);
   *     setVisible(true);
   *   }, hoverTimeout);
   * }
   * ```
   */
  hoverTimeoutRef: NonNullRef<number | undefined>;

  /**
   * @example
   * Main Usage
   * ```ts
   * onMouseLeave() {
   *   if (mode === "touch") {
   *     return
   *   }
   *
   *   startDisableTimer();
   *   window.clearTimeout(visibilityTimeout.current);
   *   visibilityTimeout.current = window.setTimeout(() => {
   *     setVisible(false)
   *   }, leaveTimeoutRef.current);
   * }
   * ```
   */
  leaveTimeoutRef: NonNullRef<number>;

  /**
   * When this is called, the {@link hoverTimeoutRef} will be set to `0` and the
   * {@link HoverModeContext.activeId} will be set to this `activeId` value.
   *
   * @see {@link hoverTimeoutRef} for an example.
   */
  enableHoverMode(activeId: string): void;

  /**
   * Disables all hover mode behavior by clearing all timeouts and resetting
   * internal state.
   */
  disableHoverMode(): void;

  /**
   * @see {@link leaveTimeoutRef} for an example.
   */
  startDisableTimer(): void;

  /**
   * @see {@link hoverTimeoutRef} for an example.
   */
  clearDisableTimer(): void;
}

/**
 * @remarks
 * \@since 2.8.0
 * \@since 6.0.0 Uses refs to increase performance by preventing unneeded
 * re-renders of the entire hover mode provider's component tree. The API also
 * changed to support custom hover mode providers.
 */
export interface HoverModeContext extends SimpleHoverModeContext {
  /**
   * This ref contains the current DOM `id` for the element that is being
   * hovered within the `HoverModeProvider`. This will be an empty string
   * when the hover mode is not active.
   */
  activeIdRef: NonNullMutableRef<string>;

  /**
   * This ref can be used to disable transitions for a group of components using
   * the same hover mode provider. The general flow would be:
   *
   * - set `disableTransition: animatedOnceRef.current` on hover mode components
   * - set `animatedOnceRef.current = true` when the `onEntered` transition callback fires
   * - set `animatedOnceRef.current = false` when the hover mode behavior is
   *   disabled. This would normally be after a timeout for the `onExited`
   *   callback
   */
  animatedOnceRef: NonNullMutableRef<boolean>;
}

/**
 * @remarks \@since 6.0.0
 */
export interface CreateHoverModeContextOptions {
  /**
   * TODO: I think this has something to do with how I implemented the MenuBar.
   *
   * @defaultValue `""`
   */
  defaultActiveId?: string;

  /**
   * When this is `undefined`, the hover mode behavior will be disabled.
   * Otherwise, this will be the amount of time to wait on a `mouseenter` event
   * before setting the visibility to `true`.
   *
   * @defaultValue `undefined`
   */
  hoverTimeout?: number;

  /**
   * The amount of time to wait after a `mouseleave` event before setting the
   * visibility to `false`.
   *
   * @defaultValue `0`
   * @remarks \@since 6.0.0 This was renamed from `exitVisibilityDelay` and the
   * default value changed from `300` to `0`.
   */
  leaveTimeout?: number;
}

/**
 * @remarks \@since 6.0.0
 */
export function createHoverModeContext(
  options: CreateHoverModeContextOptions = {}
): Readonly<HoverModeContext> {
  const { defaultActiveId = "", hoverTimeout, leaveTimeout = 0 } = options;

  return {
    activeIdRef: { current: defaultActiveId },
    hoverTimeoutRef: { current: hoverTimeout },
    leaveTimeoutRef: { current: leaveTimeout },
    animatedOnceRef: { current: false },
    enableHoverMode: noop,
    disableHoverMode: noop,
    startDisableTimer: noop,
    clearDisableTimer: noop,
  };
}

/** @remarks \@since 6.0.0 */
export interface HoverModeConfiguration extends CreateHoverModeContextOptions {
  /** @see {@link CreateHoverModeContextOptions.hoverTimeout} */
  hoverTimeout: number;

  /**
   * The amount of time to wait before disabling the hover mode beahvior if none
   * of the components are being hovered.
   *
   * If this is `undefined`, {@link HoverModeContext.startDisableTimer} will do
   * nothing. You must manually call {@link HoverModeContext.disableHoverMode}
   * to disable the hover mode instead.
   */
  disableTimeout?: number;
}

/**
 * @example
 * Creating a Hover Mode Group
 * ```tsx
 * import type {
 *   HoverModeConfiguration,
 *   HoverModeContext,
 * } from "@react-md/core";
 * import {
 *   createHoverModeContext,
 *   useHoverModeProvider,
 * } from "@react-md/core";
 * import type { ReactElement } from "react";
 * import { createContext, useContext } from "react";
 *
 * // extend as needed
 * type CustomHoverMode = HoverModeContext;
 *
 * // you can also add defaults if there is no parent provider.
 * const context = createContext<CustomHoverMode>(createHoverModeContext());
 * const { Provider } = context;
 *
 * interface Props extends HoverModeConfiguration {
 *   children: ReactNode;
 * }
 *
 * export function CustomHoverModeProvider({
 *   children,
 *   // change to whatever defaults you want
 *   hoverTimeout = 3000,
 *   leaveTimeout = 3000,
 *   defaultActiveId = "",
 *   disableTimeout = 5000,
 * }: Props): ReactElement {
 *   const context = useHoverModeProvider({
 *     hoverTimeout,
 *     leaveTimeout,
 *     defaultActiveId,
 *     disableTimeout,
 *   });
 *
 *   return <Provider value={context}>{children}</Provider>;
 * }
 * ```
 *
 * @see {@link CreateHoverModeContextOptions}
 * @see {@link useHoverMode}
 * @remarks \@since 6.0.0 The `HoverModeProvider` component was replaced by this
 * hook implementation. After developing the `MenuBar`, I realized the hover
 * mode should normally be grouped by related components or types instead of a
 * top-level catch all.
 */
export function useHoverModeProvider(
  options: HoverModeConfiguration
): Readonly<HoverModeContext> {
  const {
    hoverTimeout,
    leaveTimeout = 0,
    defaultActiveId = "",
    disableTimeout,
  } = options;

  const activeIdRef = useRef(defaultActiveId);
  const hoverTimeoutRef = useRef(hoverTimeout);
  const leaveTimeoutRef = useRef(leaveTimeout);
  const animatedOnceRef = useRef(false);
  const disableHoverModeTimeout = useRef<number | undefined>();
  const clearDisableTimer = useCallback(() => {
    window.clearTimeout(disableHoverModeTimeout.current);
  }, []);
  const enableHoverMode = useCallback(
    (activeId: string) => {
      clearDisableTimer();
      activeIdRef.current = activeId;
      hoverTimeoutRef.current = 0;
    },
    [clearDisableTimer]
  );
  const disableHoverMode = useCallback(() => {
    clearDisableTimer();
    activeIdRef.current = "";
    hoverTimeoutRef.current = hoverTimeout;
    animatedOnceRef.current = false;
  }, [clearDisableTimer, hoverTimeout]);
  const startDisableTimer = useCallback(() => {
    if (typeof disableTimeout !== "number") {
      return;
    }

    clearDisableTimer();
    disableHoverModeTimeout.current = window.setTimeout(() => {
      disableHoverMode();
    }, disableTimeout);
  }, [clearDisableTimer, disableHoverMode, disableTimeout]);

  useEffect(() => {
    return () => {
      window.clearTimeout(disableHoverModeTimeout.current);
    };
  }, []);

  return useMemo<HoverModeContext>(
    () => ({
      activeIdRef,
      hoverTimeoutRef,
      leaveTimeoutRef,
      animatedOnceRef,
      enableHoverMode,
      disableHoverMode,
      startDisableTimer,
      clearDisableTimer,
    }),
    [enableHoverMode, disableHoverMode, startDisableTimer, clearDisableTimer]
  );
}
