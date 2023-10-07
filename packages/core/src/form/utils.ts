import { type KeyboardEvent } from "react";

/**
 * This util should be used to implement the native "Enter" keypress behavior
 * for "fake" form components to submit the form if exists.
 *
 * The way this will work will be:
 * - attempt to find a form by querying for a parent form element. if no parent
 *   form element can be found, try to use the `formId` in a
 *   `document.getElementById`
 * - if a form element is found, find the submit button within the form. If
 *   there are no submit buttons within the form, try to find a submit button in
 *   the document that is linked to this form by `form={formId}`
 * - if the submit button was found, click it to trigger the form submit
 *   behavior
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/requestSubmit
 * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/submit
 * @internal
 * @remarks
 * \@since 2.7.0
 * \@since 6.0.0 No longer returns a boolean, added the `formId` parameter, and
 * moved into the form package.
 * \@since 6.0.0 Uses `form.requestSubmit` instead of clicking the submit button
 */
export function tryToSubmitRelatedForm<E extends HTMLElement>(
  event: KeyboardEvent<E>,
  formId: string | undefined
): void {
  const { currentTarget } = event;
  let form: HTMLElement | null = null;
  if (formId) {
    form = document.getElementById(formId);
  } else {
    form = currentTarget.closest("form");
  }

  if (!form || !(form instanceof HTMLFormElement)) {
    return;
  }

  formId = formId || form.id;
  let submit = form.querySelector<HTMLButtonElement>('[type="submit"]');
  if (!submit && formId) {
    submit = document.querySelector<HTMLButtonElement>(
      `[type="submit"][form="${formId}"]`
    );
  }

  form.requestSubmit(submit);
}

/**
 * @internal
 * @remarks \@since 6.0.0
 */
export type ChangeableHTMLElement =
  | HTMLInputElement
  | HTMLTextAreaElement
  | HTMLSelectElement;

/**
 * This is used to trigger a change event for a form element.
 *
 * @internal
 * @see https://stackoverflow.com/a/46012210
 * @remarks \@since 6.0.0
 */
export function triggerManualChangeEvent(
  element: ChangeableHTMLElement | null,
  value: string | number
): void {
  if (!element) {
    return;
  }

  const prototype = Object.getPrototypeOf(element);
  const setter = Object.getOwnPropertyDescriptor(prototype, "value")?.set;
  if (!setter) {
    return;
  }

  setter.call(element, value);
  const event = new Event("input", { bubbles: true });
  element.dispatchEvent(event);
}
