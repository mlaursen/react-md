/**
 * @internal
 */
const setter: (value: string) => void = (() => {
  const noop = (): void => {
    // do nothing
  };

  /* istanbul ignore next: can't really fire this in non-browser environments */
  if (typeof HTMLInputElement === "undefined") {
    return noop;
  }

  return (
    Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value")?.set ??
    noop
  );
})();

/**
 * This util is used to dispatch a change event for an `HTMLInputElement` based
 * off of a keyboard event.
 *
 * @see {@link https://github.com/cypress-io/cypress/issues/536#issuecomment-308739206|React Change Event info}
 * @internal
 * @remarks \@since 2.7.0
 */
export function dispatchChangeEvent(
  target: HTMLElement,
  value: string
): boolean {
  if (target.tagName !== "INPUT") {
    return false;
  }

  setter.call(target, value);

  const inputEvent = new Event("input", { bubbles: true });

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  inputEvent.simulated = true;
  target.dispatchEvent(inputEvent);

  return true;
}
