import React, {
  Reducer,
  CSSProperties,
  ReducerAction,
  useState,
  useRef,
  useEffect,
  useCallback,
  MutableRefObject,
} from "react";
import { useStatesConfigContext } from "@react-md/states";
import { useToggle, useTimeout } from "@react-md/utils";
import { UserInteractionMode } from "@react-md/states/types/useModeDetection";
import {
  useTooltipDelayActions,
  useTooltipDelayContext,
} from "./useTooltipDelay";

type Position = "top" | "right" | "bottom" | "left";

export function useTooltipVisibility(showDelay: number) {
  const { enable, disable } = useTooltipDelayActions();
  const container = useRef<HTMLElement | null>(null);
  const [trigger, setTrigger] = useState<UserInteractionMode | null>(null);
  const triggerRef = useRef(trigger);
  const { toggled: visible, enable: show, disable: hide } = useToggle();

  const { start, stop } = useTimeout(() => {
    show();
    enable();
  }, showDelay);

  useEffect(() => {
    if (triggerRef.current === trigger) {
      return;
    }

    triggerRef.current = trigger;
    if (trigger === null) {
      hide();
      stop();
      disable();
    } else {
      start();
    }
  }, [trigger]);

  const startShowTimer = useCallback(
    (nextContainer: HTMLElement, nextTrigger: UserInteractionMode) => {
      if (triggerRef.current !== null) {
        return;
      }

      container.current = nextContainer;
      setTrigger(nextTrigger);
    },
    []
  );

  return {
    hide,
    startShowTimer,
    visible,
  };
}

export function useTooltipPosition(
  visible: boolean,
  defaultPosition: Position | "auto",
  container: MutableRefObject<HTMLElement | null>
) {
  const [position, setPosition] = useState(
    defaultPosition === "auto" ? "bottom" : defaultPosition
  );

  useEffect(() => {
    if (!container.current || !visible || defaultPosition !== "auto") {
      return;
    }

    // calculate best position
    setPosition("bottom");
  }, [visible, defaultPosition]);

  return position;
}

interface TooltipOptions {
  showDelay?: number;
}

/**
 * Expected flow:
 *
 * Mouse Enter ->
 * - start show timeout
 * - set container element
 *   Not in mouse mode ->
 *   - do nothing
 *   Triggered by different event tyoe ->
 *   - do nothing
 *   Timeout Complete ->
 *   - set best guess at position based on container element
 *   - set best guess at positioning style based on container element
 *   - set visible
 *     Visible ->
 *     - recalculate best position
 *     - recalculate styles
 *
 * Mouse Leave ->
 * - stop show timeout
 * - set invisible
 *   Not in keyboard mode ->
 *   - do nothing
 *   Triggered by different event type ->
 *   - do nothing
 *   Timeout Complete ->
 *   - stop consecutive tooltips mode
 *
 * Focus ->
 * - start show timeout
 * - set container element
 *   Not in keyboard mode ->
 *   - do nothing
 *   Triggered by different event tyoe ->
 *   - do nothing
 *   Timeout Complete ->
 *   - set best guess at position based on container element
 *   - set best guess at positioning style based on container element
 *   - set visible
 *     Visible ->
 *     - enable immediate tooltips mode
 *     - recalculate best position
 *     - recalculate styles
 *
 * Blur ->
 * - stop show timeout
 * - set invisible
 *   Not in keyboard mode ->
 *   - do nothing
 *   Triggered by different event type ->
 *   - do nothing
 *
 * Key Down ->
 * - stop show timeout
 * - set invisible
 *   Not Escape Key ->
 *   - do nothing
 *   Triggered by different event type ->
 *   - do nothing
 *
 * Context Menu
 * - cancel default behavior
 * - start show timeout
 * - set container element
 *   Not in touch mode ->
 *   - do nothing
 *   Triggered by a different event type ->
 *   - do nothing
 *   Timeout Complete ->
 *   - set best guess at position based on container element
 *   - set best guess at positioning style based on container element
 *   - set visible
 *     Visible ->
 *     - recalculate best position
 *     - recalculate styles
 *
 * Touch End (hopefully still gets triggered after context menu) ->
 * - start hide timeout for 1.5s default
 * - stop show timeout
 *   Timeout Complete ->
 *   - set invisible
 *
 * Any Action While Tooltip is Visible (scroll, click, blur)
 * - hide tooltip
 *
 * Tooltip positioning
 * - top or bottom only (to start)
 * -
 *
 * Tooltipped:
 * - tooltips always visible by default
 * - rendered in Fragment with tooltip as second child with fixed positioning
 * - when portaled, another new span will be created with no idea that will be used for the styling/updates
 * - children prop - function or single element. Single element will close props in
 */
export function useTooltipState({ showDelay }: TooltipOptions) {
  const contextDelay = useTooltipDelayContext();
  const delay = typeof showDelay === "number" ? showDelay : contextDelay;
  const { startShowTimer, hide, visible } = useTooltipVisibility(delay);
}
