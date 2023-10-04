export function assertString(value: unknown): asserts value is string {
  if (typeof value !== "string") {
    throw new TypeError("Must be a string");
  }
}

export function assertBoolean(
  value: unknown,
  required = true
): asserts value is boolean {
  const type = typeof value;
  if (type !== "boolean" && (required || type !== "undefined")) {
    throw new TypeError("Must be a boolean");
  }
}
