"use client";
import { useEffect, type RefObject } from "react";
import {
  triggerManualChangeEvent,
  type ChangeableHTMLElement,
} from "./utils.js";

/**
 * @remarks \@since 6.0.0
 * @internal
 */
export interface FormResetOptions {
  form?: string;
  elementRef: RefObject<ChangeableHTMLElement>;
  defaultValue: string;
}

/**
 * @remarks \@since 6.0.0
 * @internal
 */
export function useFormReset(options: FormResetOptions): void {
  const { form, elementRef, defaultValue } = options;

  useEffect(() => {
    const element = elementRef.current;
    if (!element) {
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
      triggerManualChangeEvent(element, defaultValue);
    };

    formElement.addEventListener("reset", handleReset);
    return () => {
      formElement.removeEventListener("reset", handleReset);
    };
  }, [defaultValue, elementRef, form]);
}
