/**
 * @see {@link https://stackoverflow.com/a/9035732}
 */
export function randomDate(start: Date, end: Date = new Date()): Date {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
}
