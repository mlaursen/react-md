/**
 * This is a utility function that will create a unique id for
 * a "name" string. The name string should be somewhere betwen
 * 5-20 characters.
 */
export default function toId(name: string) {
  return name
    .replace(/\/|\\|\[|]/g, "")
    .split(/\s|(?=[A-Z])/)
    .join("-")
    .toLowerCase();
}
