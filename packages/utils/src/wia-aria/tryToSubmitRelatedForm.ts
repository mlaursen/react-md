/**
 * Don't really need the full `event` for this, and picking these parts makes it
 * so that both the React keydown listener and native keydown listener can use
 * this function if needed.
 */
type KeyboardSubmitEventPartial = Pick<
  KeyboardEvent,
  "key" | "preventDefault" | "stopPropagation" | "currentTarget"
>;

/**
 * The default  behavior when pressing the `"Enter"` key on a form control
 * (`input`, `textarea`, `select`) is to submit the form that the form control
 * is in. This util will try to polyfill this behavior for custom widgets that
 * use are using a role to act as a form control.
 *
 * The way this works is:
 * - Check if the `event.key` is the `"Enter"` key. Do nothing if it is not.
 * - Call `event.preventDefault()` and `event.stopPropagation()` to prevent
 *   other unwanted keyboard behavior
 * - Check the event target to see if it is contained in a `<form>`
 * - Try to find a submit button and click it by:
 *   - First check with `form.querySelector('[type="submit"]')`
 *   - Fallback to `document.querySelector('[type="submit"][form="{{FORM_ID}}"]')`
 *     - submit buttons can be placed outside of the form and link it back using
 *       the `form` attribute pointing to the id of the form
 *
 *
 * The reason the submit button has to be found and clicked is because calling
 * `form.submit()` won't actually fire any attached `form.onsubmit` event
 * handlers. If you click the submit button though, the `form.onsubmit` handlers
 * will be called correctly.
 *
 * @param event - The keyboard event that should attempt to submit the form when
 * the enter key is presssed.
 * @returns `true` if the `event.key` was the `"Enter"` key so that other
 * keydown logic can be ignored.
 * @remarks \@since 2.7.0
 */
export function tryToSubmitRelatedForm(
  event: KeyboardSubmitEventPartial
): boolean {
  if (event.key !== "Enter") {
    return false;
  }

  event.preventDefault();
  event.stopPropagation();

  /* istanbul ignore next */
  const form = (event.currentTarget as Element)?.closest?.("form");
  let submit = form?.querySelector<HTMLButtonElement>('[type="submit"]');
  if (!submit && form?.id) {
    submit = document.querySelector<HTMLButtonElement>(
      `[type="submit"][form="${form.id}"]`
    );
  }

  submit?.click();
  return true;
}
