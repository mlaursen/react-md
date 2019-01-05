/**
 * @see https://stackoverflow.com/a/12467610
 */
export default function isProgrammaticallyFocusable(event: KeyboardEvent) {
  const code = event.which || event.keyCode;
  return (
    (code > 47 && code < 58) ||
    (code > 64 && code < 91) ||
    (code > 95 && code < 112) ||
    (code > 185 && code < 192) ||
    (code > 218 && code < 223)
  );
}
