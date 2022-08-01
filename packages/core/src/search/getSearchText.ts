/**
 * @remarks \@since 5.0.0
 * @internal
 */
export function getSearchText(
  element: HTMLElement,
  searchable: boolean
): string {
  if (!searchable) {
    return "";
  }

  const cloned = element.cloneNode(true) as HTMLElement;
  cloned
    .querySelectorAll(".rmd-icon--font,[aria-hidden=true],[hidden]")
    .forEach((element) => {
      element.parentNode?.removeChild(element);
    });

  // Note: It would be good to use `cloned.innerText` (maybe?) at some point,
  // but it returns `undefined` in jsdom. It also does cause a reflow, so maybe
  // this is fine?
  // https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent#differences_from_innertext
  return (cloned.textContent || "").substring(0, 1).toUpperCase();
}
