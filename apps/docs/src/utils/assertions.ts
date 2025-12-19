export function assertDate(
  value: unknown,
  name: string
): asserts value is Date {
  if (!(value instanceof Date)) {
    throw new TypeError(`${name} must be a Date.`);
  }
}

export function assertBoolean(
  value: unknown,
  name: string
): asserts value is boolean {
  if (typeof value !== "boolean") {
    throw new TypeError(`${name} must be a boolean.`);
  }
}
