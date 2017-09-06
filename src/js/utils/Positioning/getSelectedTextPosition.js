/** @module utils/Positoning/getSelectedTextPosition */
import getSelectedText from '../getSelectedText';
import getTextWidth from './getTextWidth';

const ZERO_WIDTH_CHARACTER = '\u200b';

/**
 * A utility function to attempt to get the current highlighted text position.
 *
 * When a context menu is opened, this function attempts to find the bounding client rect
 * for the highlighted text. However, if the text is in the text field, some weird stuff
 * happens and it is unable to get it correctly.
 */
export default function getSelectedTextPosition(e) {
  let height;
  const { target, clientX, clientY } = e;
  const text = getSelectedText();
  const width = Math.round(getTextWidth(text, target) || 0);
  if (!text || target.classList.contains('md-text-field')) {
    height = parseInt(window.getComputedStyle(target).fontSize, 10);
    return {
      width,
      height,
      left: clientX - width,
      top: clientY,
    };
  }

  // All browsers I am supporting have window.getSelection, but better safe than sorry
  if (window.getSelection) {
    const selection = window.getSelection();
    if (selection.rangeCount) {
      const range = selection.getRangeAt(0).cloneRange();
      let rect = null;
      if (range.getClientRects) {
        const rects = range.getClientRects();
        if (rects.length > 0) {
          rect = rects[0];
        }
      }

      if (!rect) {
        const span = document.createElement('span');
        span.appendChild(document.createTextNode(ZERO_WIDTH_CHARACTER));
        range.insertNode(span);
        rect = span.getBoundingClientRect();

        const spanParent = span.parentNode;
        spanParent.removeChild(span);
        spanParent.normalize();
      }

      return rect;
    }
  }

  return null;
}
