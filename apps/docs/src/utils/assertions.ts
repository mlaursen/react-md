export function assertDate(
  value: unknown,
  name: string
): asserts value is Date {
  if (!(value instanceof Date)) {
    throw new Error(`${name} must be a Date.`);
  }
}

export function assertBoolean(
  value: unknown,
  name: string
): asserts value is boolean {
  if (typeof value !== "boolean") {
    throw new Error(`${name} must be a boolean.`);
  }
}
