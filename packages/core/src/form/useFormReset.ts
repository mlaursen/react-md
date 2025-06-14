"use client";

import { type RefObject, useEffect } from "react";

import {
  type ChangeableHTMLElement,
  triggerManualChangeEvent,
} from "./utils.js";

/**
 * @since 6.0.0
 * @since 6.3.0 Added the optional `onReset` callback and updated
 * `defaultValue` to be optional.
 * @internal
 */
export interface FormResetOptions {
  form?: string;
  elementRef: RefObject<ChangeableHTMLElement>;
  onReset?: () => void;
  defaultValue?: string;
}

/**
 * @since 6.0.0
 * @internal
 */
export function useFormReset(options: FormResetOptions): void {
  const { form, elementRef, defaultValue, onReset } = options;

  useEffect(() => {
    const element = elementRef.current;
    if (!element || (typeof defaultValue === "undefined" && !onReset)) {
      return;
    }

    const formElement =
      (form && document.getElementById(form)) ||
      element.closest<HTMLFormElement>("form") ||
      null;
    if (!formElement) {
      return;
    }

    const handleReset = (): void => {
      if (onReset) {
        onReset();
      } else if (typeof defaultValue !== "undefined") {
        triggerManualChangeEvent(element, defaultValue);
      }
    };

    formElement.addEventListener("reset", handleReset);
    return () => {
      formElement.removeEventListener("reset", handleReset);
    };
  }, [defaultValue, elementRef, form, onReset]);
}
