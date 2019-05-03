import { useEffect, useRef, useState } from "react";
import { Maybe, positionRelativeTo } from "@react-md/utils";
import { TooltipConfig, TooltipEventType } from "./types.d";
import {
  createPositionOptions,
  determineBestPosition,
  getSpacing,
} from "./utils";

export function useTooltipState(config: TooltipConfig) {
  const {
    id,
    dense,
    spacing,
    denseSpacing,
    onMouseEnter,
    onMouseLeave,
    onClick,
    onBlur,
    defaultVisible,
    defaultPosition,
    hoverDelay,
    focusDelay,
    vwMargin,
    vhMargin,
    portal,
    style: propStyle,
  } = config;
  const [trigger, setTrigger] = useState<Maybe<TooltipEventType>>(null);
  const [visible, setVisible] = useState(defaultVisible);
  const [position, setPosition] = useState(
    defaultPosition === "auto" ? "below" : defaultPosition
  );
  const [style, setStyle] = useState(propStyle);
  const container = useRef<Maybe<HTMLElement>>(null);
  const positionConfig = {
    id,
    dense,
    spacing,
    denseSpacing,
    vwMargin,
    vhMargin,
    position: defaultPosition,
  };

  // useEffect(() => {
  //   if (!isKeyboardFocus || trigger !== null) {
  //     return;
  //   }

  //   setTrigger("keyboard");
  //   container.current = document.getElementById(id) as HTMLElement;
  // }, [isKeyboardFocus]);

  // useEventListener(
  //   "keydown",
  //   (event: KeyboardEvent) => {
  //     if (event.key === "Escape") {
  //       setVisible(false);
  //       setTrigger(null);
  //     }
  //   },
  //   { enabled: visible }
  // );

  useEffect(() => {
    if (trigger === null) {
      return;
    }

    let duration = focusDelay;
    if (trigger === "mouse") {
      duration = hoverDelay;
    }

    const timeout = window.setTimeout(() => {
      setPosition(determineBestPosition(container.current, positionConfig));

      setVisible(true);
    }, duration);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [trigger]);

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

    if (trigger === "mouse") {
      setTrigger(null);
      setVisible(false);
    }
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

  function handleClick(event: React.MouseEvent<HTMLElement>) {
    if (onClick) {
      onClick(event);
    }

    setTrigger(null);
    setVisible(false);
  }

  function handleEnter(node: Maybe<HTMLSpanElement>) {
    const nextPosition = determineBestPosition(
      container.current,
      positionConfig
    );

    if (position !== nextPosition) {
      setPosition(nextPosition);
    }

    if (!node || !portal) {
      return;
    }

    const nextStyle = positionRelativeTo(
      container.current,
      node,
      createPositionOptions(nextPosition, getSpacing(config))
    );

    setStyle(nextStyle);
  }

  return {
    visible,
    position,
    tooltipHandlers: {
      style,
      onEnter: handleEnter,
    },
    containerHandlers: {
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
      onBlur: handleBlur,
      onClick: handleClick,
    },
  };
}
