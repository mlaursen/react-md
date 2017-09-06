export default function getSelectedText() {
  if (typeof window.getSelection !== 'undefined') {
    return window.getSelection().toString();
  } else if (typeof document.selection !== 'undefined' && document.selection.type === 'Text') {
    return document.selection.createRange().text;
  }

  return '';
}
