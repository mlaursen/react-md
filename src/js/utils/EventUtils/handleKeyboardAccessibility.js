import { SPACE, ENTER } from '../../constants/keyCodes';
import closest from '../closest';
import isFormPartRole from '../isFormPartRole';

/**
 * A utility function for adding keyboard accessibility to elements that are not a natively
 * clickable (div, span, etc). When the space or enter key is pressed while focusing the
 * element, different flows will happen.
 *
 * - space - The click event will be triggered and the default page scrolling behavior of the
 *      spacebar will be prevented
 * - enter - If the element has a form role ('checkbox' or 'radio'), the click event will not
 *      be triggered. Instead, it will find out if the element is inside a form. If it is, it
 *      will emulate the default behavior of attempting to submit the form. If the element does
 *      not have a form role, the click event will be triggered.
 *
 * @param {Event} e - the keydown event
 * @param {function} onClick - the on click event to be triggered if space or enter was pressed
 * @param {boolean=true} listenToEnter - boolean if the enter key should be used to trigger the
 *      the click event. Even if this is true, the click event will not be triggered if the role
 *      is for a form role.
 * @param {boolean=true} listenToSpace - boolean if the space key should be used to trigger the
 *      click event.
 */
export default function handleKeyboardAccesibility(e, onClick, listenToEnter = true, listenToSpace = true) {
  const key = e.which || e.keyCode;
  const space = listenToSpace && key === SPACE;
  const enter = key === ENTER;

  if (space) {
    // Stop page scrolling
    e.preventDefault();
  }

  if (enter && isFormPartRole(e.target)) {
    const form = closest(e.target, 'form');
    const submit = form ? form.querySelector('*[type="submit"]') : null;
    if (submit) {
      submit.click();
    }

    return;
  }

  if ((enter && listenToEnter) || space) {
    onClick(e);
  }
}
