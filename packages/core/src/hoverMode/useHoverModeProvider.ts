import type { MutableRefObject, RefObject } from "react";
import { createContext, useCallback, useEffect, useMemo, useRef } from "react";

const noop = (): void => {
  // do nothing
};

export interface HoverModeContext {
  /**
   * This ref contains the current DOM `id` for the element that is being
   * hovered within the `HoverModeProvider`. This will be an empty string
   * when the hover mode is not active.
   */
  activeIdRef: MutableRefObject<string>;
  animatedOnceRef: MutableRefObject<boolean>;
  hoverTimeoutRef: RefObject<number | undefined>;
  disableTimeoutRef: RefObject<number | undefined>;
  enableHoverMode(activeId: string): void;
  disableHoverMode(): void;
  startDisableTimer(): void;
}

export const DEFAULT_HOVER_MODE_CONTEXT: Readonly<HoverModeContext> = {
  activeIdRef: { current: "" },
  hoverTimeoutRef: { current: undefined },
  animatedOnceRef: { current: false },
  disableTimeoutRef: { current: undefined },
  enableHoverMode: noop,
  disableHoverMode: noop,
  startDisableTimer: noop,
};

const context = createContext(DEFAULT_HOVER_MODE_CONTEXT);
export const { Provider: HoverModeProvider } = context;

export interface HoverModeConfiguration {
  hoverTimeout?: number;
  disableTimeout?: number;
  defaultActiveId?: string;
}

export interface HoverModeProviderImplementation {
  context: Readonly<HoverModeContext>;
}

export function useHoverModeProvider(
  options: HoverModeConfiguration
): Readonly<HoverModeContext> {
  const { hoverTimeout, defaultActiveId = "", disableTimeout } = options;

  const disableTimer = useRef<number | undefined>();
  const activeIdRef = useRef(defaultActiveId);
  const hoverTimeoutRef = useRef(hoverTimeout);
  const animatedOnceRef = useRef(false);
  const disableTimeoutRef = useRef(disableTimeout);
  const enableHoverMode = useCallback((activeId: string) => {
    activeIdRef.current = activeId;
    hoverTimeoutRef.current = 0;
  }, []);
  const disableHoverMode = useCallback(() => {
    window.clearTimeout(disableTimer.current);
    hoverTimeoutRef.current = hoverTimeout;
  }, [hoverTimeout]);
  const startDisableTimer = useCallback(() => {
    if (typeof disableTimeout !== "number") {
      return;
    }

    window.clearTimeout(disableTimer.current);
    disableTimer.current = window.setTimeout(() => {
      activeIdRef.current = "";
      hoverTimeoutRef.current = 0;
    }, disableTimeout);
  }, [disableTimeout]);

  useEffect(() => {
    return () => {
      window.clearTimeout(disableTimer.current);
    };
  }, []);

  const context = useMemo<HoverModeContext>(
    () => ({
      activeIdRef,
      hoverTimeoutRef,
      animatedOnceRef,
      disableTimeoutRef,
      enableHoverMode,
      disableHoverMode,
      startDisableTimer,
    }),
    [disableHoverMode, enableHoverMode, startDisableTimer]
  );
  return context;
}
