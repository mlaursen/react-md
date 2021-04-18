import React, {
  ReactElement,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { useOnUnmount } from "../useOnUnmount";
import {
  DEFAULT_HOVER_MODE_DEACTIVATION_TIME,
  DEFAULT_HOVER_MODE_VISIBLE_IN_TIME,
} from "./constants";
import {
  HoverModeContext,
  HoverModeContextProvider,
} from "./useHoverModeContext";

/** @remarks \@since 2.8.0 */
export interface HoverModeConfiguration {
  /**
   * Boolean if the hover mode functionality should be disabled.
   *
   * @defaultValue `false`
   */
  disabled?: boolean;

  /**
   * The amount of time (in ms) the user must hover an element before the hover
   * mode is enabled and the visibility is set to `true`.
   *
   * @defaultValue {@link DEFAULT_HOVER_MODE_VISIBLE_IN_TIME}
   */
  defaultVisibleInTime?: number;

  /**
   * The amount of time (in ms) the user must not hover any element connected to
   * the hover mode.
   *
   * @defaultValue {@link DEFAULT_HOVER_MODE_DEACTIVATION_TIME}
   */
  deactivateTime?: number;
}

/** @remarks \@since 2.8.0 */
export interface HoverModeProviderProps extends HoverModeConfiguration {
  children: ReactNode;
}

/**
 * This component should normally be mounted near the root of your app to enable
 * hover mode for child components. However, it can also be used at other levels
 * if hover mode functionality should not carry over between two different parts
 * of the screen.
 *
 * @example
 * Separating Hover Mode
 * ```tsx
 * export default function Example(): ReactElement {
 *   return (
 *     <>
 *       <HoverModeProvider>
 *         <HeaderActions />
 *       </HoverModeProvider>
 *       <HoverModeProvider>
 *         <MainContent />
 *       </HoverModeProvider>
 *     </>
 *   );
 * }
 * ```
 *
 * @remarks \@since 2.8.0
 */
export function HoverModeProvider({
  children,
  disabled = false,
  defaultVisibleInTime = DEFAULT_HOVER_MODE_VISIBLE_IN_TIME,
  deactivateTime = DEFAULT_HOVER_MODE_DEACTIVATION_TIME,
}: HoverModeProviderProps): ReactElement {
  const [visibleInTime, setVisibleInTime] = useState(defaultVisibleInTime);
  const timeoutRef = useRef<number>();
  const enableHoverMode = useCallback(() => {
    if (disabled) {
      return;
    }

    window.clearTimeout(timeoutRef.current);
    setVisibleInTime(0);
  }, [disabled]);
  const disableHoverMode = useCallback(() => {
    window.clearTimeout(timeoutRef.current);
    setVisibleInTime(defaultVisibleInTime);
  }, [defaultVisibleInTime]);

  const startDisableTimer = useCallback(() => {
    window.clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(() => {
      setVisibleInTime(defaultVisibleInTime);
    }, deactivateTime);
  }, [defaultVisibleInTime, deactivateTime]);

  useEffect(() => {
    if (disabled) {
      window.clearTimeout(timeoutRef.current);
      setVisibleInTime(defaultVisibleInTime);
    }
  }, [disabled, defaultVisibleInTime]);

  useOnUnmount(() => {
    window.clearTimeout(timeoutRef.current);
  });

  const context = useMemo<HoverModeContext>(
    () => ({
      visibleInTime,
      enableHoverMode,
      disableHoverMode,
      startDisableTimer,
    }),
    [disableHoverMode, enableHoverMode, startDisableTimer, visibleInTime]
  );

  return (
    <HoverModeContextProvider value={context}>
      {children}
    </HoverModeContextProvider>
  );
}

/* istanbul ignore next */
if (process.env.NODE_ENV !== "production") {
  try {
    const PropTypes = require("prop-types");

    HoverModeProvider.propTypes = {
      disabled: PropTypes.bool,
      defaultVisibleInTime: PropTypes.number,
      deactivateTime: PropTypes.number,
      children: PropTypes.node.isRequired,
    };
  } catch (e) {}
}
