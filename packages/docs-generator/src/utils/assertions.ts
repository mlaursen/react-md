export function assertString(
  value: unknown,
  message = "value is not a string"
): asserts value is string {
  if (typeof value !== "string") {
    throw new Error(message);
  }
}

export function assertStringArray(
  value: unknown,
  message = "value is not a string array"
): asserts value is string[] {
  if (!value || typeof value !== "object" || !("length" in value)) {
    throw new Error(message);
  }
}
