import { useState, useEffect, useRef, useContext } from "react";
import { Maybe, useEventListener } from "@react-md/utils";
import { useIsKeyboardFocused } from "@react-md/wia-aria";

import { ITooltipConfig, TooltipEventType, TooltipableEvent } from "./types.d";
import { determineBestPosition } from "./utils";
import {
  TooltipHoverModeContext,
  ITooltipHoverModeContext,
} from "./TooltipHoverMode";

export function useHoverModeContext() {
  return useContext(TooltipHoverModeContext);
}

export function useHoverModeDelay(
  hoverDelay: number,
  context?: ITooltipHoverModeContext
) {
  if ((context || useHoverModeContext()).isActive) {
    return 0;
  }

  return hoverDelay;
}

export function useTooltipState(config: ITooltipConfig) {
  const {
    id,
    dense,
    spacing,
    denseSpacing,
    onMouseEnter,
    onMouseLeave,
    onBlur,
    defaultVisible,
    defaultPosition,
    hoverDelay: propHoverDelay,
    focusDelay,
    vwMargin,
    vhMargin,
  } = config;
  const hoverModeContext = useHoverModeContext();
  const hoverDelay = useHoverModeDelay(propHoverDelay, hoverModeContext);
  const isKeyboardFocus = useIsKeyboardFocused(id);
  const [trigger, setTrigger] = useState<Maybe<TooltipEventType>>(null);
  const [visible, setVisible] = useState(defaultVisible);
  const [position, setProsition] = useState(
    defaultPosition === "auto" ? "below" : defaultPosition
  );
  const container = useRef<Maybe<HTMLElement>>(null);

  useEffect(() => {
    if (!isKeyboardFocus || trigger !== null) {
      return;
    }

    setTrigger("keyboard");
    container.current = document.getElementById(id) as HTMLElement;
  }, [isKeyboardFocus]);

  useEventListener(
    "keydown",
    (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setVisible(false);
        setTrigger(null);
      }
    },
    { enabled: visible }
  );

  useEffect(() => {
    if (trigger === null) {
      return;
    }

    let duration = focusDelay;
    if (trigger === "mouse") {
      duration = hoverDelay;
    }

    const timeout = window.setTimeout(() => {
      setProsition(
        determineBestPosition(container.current, {
          id,
          dense,
          spacing,
          denseSpacing,
          vwMargin,
          vhMargin,
          position: defaultPosition,
        })
      );

      setVisible(true);
    }, duration);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [trigger]);

  useEffect(() => {
    if (!visible || hoverModeContext.disabled || hoverModeContext.isActive) {
      return;
    }

    hoverModeContext.setActive(true);
  }, [visible]);

  function handleMouseEnter(event: React.MouseEvent<HTMLElement>) {
    if (onMouseEnter) {
      onMouseEnter(event);
    }

    if (trigger === null) {
      setTrigger("mouse");
      container.current = event.currentTarget;
    }
  }

  function handleMouseLeave(event: React.MouseEvent<HTMLElement>) {
    if (onMouseLeave) {
      onMouseLeave(event);
    }

    setTrigger(null);
    setVisible(false);
  }

  function handleBlur(event: React.FocusEvent<HTMLElement>) {
    if (onBlur) {
      onBlur(event);
    }

    if (trigger === "keyboard") {
      setTrigger(null);
      setVisible(false);
    }
  }

  return {
    visible,
    position,
    handlers: {
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
      onBlur: handleBlur,
    },
  };
}
