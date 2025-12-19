"use client";

import { type Dispatch, useCallback, useRef, useState } from "react";

import { tryToSubmitRelatedForm } from "../form/utils.js";
import { useEnsuredId } from "../useEnsuredId.js";
import { useEnsuredRef } from "../useEnsuredRef.js";
import { useEnsuredState } from "../useEnsuredState.js";
import { useIsomorphicLayoutEffect } from "../useIsomorphicLayoutEffect.js";
import { withinRange } from "../utils/withinRange.js";
import { useSpinButtonGroup } from "./SpinButtonGroupProvider.js";
import {
  defaultGetSpinButtonTextContent,
  defaultSpinButtonGetValueText,
} from "./defaults.js";
import {
  type SpinButtonChangeEvent,
  type SpinButtonChangeEventOptions,
  type SpinButtonImplementation,
  type SpinButtonOptions,
  type SpinButtonValue,
} from "./types.js";
import { deselectNode } from "./utils/deselectNode.js";
import { resolveInputEvent } from "./utils/resolveInputEvent.js";
import { selectNode } from "./utils/selectNode.js";

/**
 * @since 6.4.0
 */
const noop = (): void => {
  // do nothing
};

/**
 * @since 6.4.0
 */
export function useSpinButton<E extends HTMLElement = HTMLDivElement>(
  options: SpinButtonOptions<E>
): SpinButtonImplementation<E> {
  const {
    id: propId,
    ref: propRef,
    min,
    max,
    step = 1,
    minDigits,
    maxDigits,
    form,
    readOnly,
    disabled,
    required,
    error,
    onBlur = noop,
    onFocus = noop,
    onInput = noop,
    onClick = noop,
    onKeyDown = noop,
    fallback,
    mappings,
    value: propValue,
    onValueChange = noop,
    defaultValue = null,
    getValueText = defaultSpinButtonGetValueText,
    getTextContent = defaultGetSpinButtonTextContent,
    placeholderChar,
    defaultKeyboardValue,
  } = options;
  const id = useEnsuredId(propId, "spinbutton");

  // trigger a noop setValue when `value` and `onValueChange` are provided
  // since `onValueChange is always called with  `setValue
  let propSetValue: Dispatch<SpinButtonValue> | undefined;
  if (propValue !== undefined && options.onValueChange) {
    propSetValue = noop;
  }

  const [value, setValue] = useEnsuredState({
    value: propValue,
    setValue: propSetValue,
    defaultValue,
  });

  const focused = useRef(false);
  const typedCount = useRef(0);
  const prevText = useRef("");
  const [nodeRef, nodeRefCallback] = useEnsuredRef(propRef);
  const { focusNext } = useSpinButtonGroup();
  const [keyboardValue] = useState(defaultKeyboardValue);

  // NOTE: I might be able to get rid of this since I don't remember why it was
  // added maybe for controlled fields? I'll have to see when I get to the
  // date/time components again
  useIsomorphicLayoutEffect(() => {
    const node = nodeRef.current;
    if (!focused.current || !node) {
      return;
    }

    prevText.current = node.textContent || "";
    selectNode(node);
  }, [nodeRef, value]);

  const updateValue = useCallback(
    (options: SpinButtonChangeEventOptions<E>) => {
      setValue(options.value);
      onValueChange(options);
      if (options.reason === "typed-to-completion") {
        focusNext();
      }
    },
    [focusNext, onValueChange, setValue]
  );
  const increment = useCallback(
    (event: SpinButtonChangeEvent<E>) => {
      let nextValue: SpinButtonValue =
        value ?? keyboardValue ?? min ?? max ?? 0;
      nextValue = withinRange({ min, max, value: nextValue + step });

      // this actually means both min and max are a number
      if (nextValue === value && typeof min === "number") {
        nextValue = min;
      }

      updateValue({
        event,
        reason: "change",
        value: nextValue,
      });
    },
    [keyboardValue, max, min, step, updateValue, value]
  );
  const decrement = useCallback(
    (event: SpinButtonChangeEvent<E>) => {
      let nextValue: SpinButtonValue =
        value ?? keyboardValue ?? max ?? min ?? 0;
      nextValue = withinRange({ min, max, value: nextValue - step });

      // this actually means both min and max are a number
      if (nextValue === value && typeof max === "number") {
        nextValue = max;
      }

      updateValue({
        event,
        reason: "change",
        value: nextValue,
      });
    },
    [keyboardValue, max, min, step, updateValue, value]
  );

  return {
    value,
    setValue,
    spinButtonRef: nodeRef,
    spinButtonProps: {
      "aria-readonly": readOnly || undefined,
      "aria-disabled": disabled || undefined,
      "aria-invalid": error || undefined,
      "aria-required": required || undefined,
      "aria-valuemin": min,
      "aria-valuemax": max,
      "aria-valuenow": value === null ? undefined : value,
      "aria-valuetext": getValueText(value),
      id,
      ref: nodeRefCallback,
      role: "spinbutton",
      autoCapitalize: "none",
      autoCorrect: "off",
      spellCheck: false,
      inputMode: "numeric",
      contentEditable: !disabled || undefined,
      suppressContentEditableWarning: true,
      tabIndex: disabled ? undefined : 0,
      onBlur: (event) => {
        onBlur(event);

        focused.current = false;
        deselectNode(event.currentTarget);
      },
      onFocus: (event) => {
        onFocus(event);

        if (disabled) {
          return;
        }

        focused.current = true;
        typedCount.current = 0;
        selectNode(event.currentTarget);
      },
      onKeyDown: (event) => {
        onKeyDown(event);

        if (disabled || (readOnly && event.key !== "Enter")) {
          return;
        }

        const setValue = (nextValue: number): void =>
          updateValue({ value: nextValue, event, reason: "change" });

        let stop = false;
        switch (event.key) {
          case "ArrowRight":
          case "ArrowLeft":
            // `event.stopPropagation()` should not be called here since the
            // parent `useSpinButtonGroup` keyboard event handler should
            // still be called to handle advancing to the next spinbutton in
            // the group. Only the default cursor movement needs to be disabled
            // instead.
            event.preventDefault();
            break;
          case "ArrowUp":
            stop = true;
            increment(event);
            break;
          case "ArrowDown":
            stop = true;
            decrement(event);
            break;
          case "Home":
            stop = true;
            if (typeof min === "number") {
              setValue(min);
            }
            break;
          case "End":
            stop = true;
            if (typeof max === "number") {
              setValue(max);
            }
            break;
          case "Enter":
            stop = true;
            tryToSubmitRelatedForm(event, form);
        }

        if (stop) {
          event.preventDefault();
          event.stopPropagation();
          typedCount.current = 0;
        }
      },
      onClick: (event) => {
        onClick(event);

        event.preventDefault();
        if (disabled) {
          return;
        }

        focused.current = true;
        typedCount.current = 0;
        selectNode(event.currentTarget);
      },
      onInput: (event) => {
        onInput(event);

        const node = event.currentTarget;
        // if the input event is fired while readOnly or disabled, ignore it
        // and set it back to the previous state
        if (readOnly || disabled) {
          node.textContent = prevText.current;
          selectNode(node);
          return;
        }

        const { reason, nextValue } = resolveInputEvent({
          min,
          max,
          text: node.textContent || "",
          mappings,
          maxDigits,
          prevText: prevText.current,
          prevValue: value,
          typedCount: typedCount.current,
        });

        if (
          reason === "change" ||
          reason === "cleared" ||
          reason === "typed-to-completion"
        ) {
          typedCount.current = 0;
        } else if (reason !== "ignored") {
          typedCount.current++;
        }

        node.textContent = getTextContent({
          min,
          max,
          minDigits,
          maxDigits,
          value: nextValue,
          fallback,
          placeholderChar,
        });
        prevText.current = node.textContent;
        selectNode(node);

        if (reason !== "ignored" && reason !== "placeholder-digit") {
          updateValue({
            event,
            value: nextValue,
            reason,
          });
        }
      },
    },
  };
}
