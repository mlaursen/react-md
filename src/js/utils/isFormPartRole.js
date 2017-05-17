/**
 * A simple utility function to determine if an element has a role that should
 * be used as a form part. This is mostly used for changing the behavior of keyboard
 * events.
 *
 * A form part role is one of the following:
 * - checkbox
 * - radio
 * - listbox
 *
 * @param {HTMLElement} el - the element to check.
 * @return {boolean} true if the element is considered an element part of a form.
 */
export default function isFormPartRole(el) {
  if (!el) {
    return false;
  }

  const role = el.getAttribute('role');
  return role === 'checkbox' || role === 'radio' || role === 'listbox';
}
