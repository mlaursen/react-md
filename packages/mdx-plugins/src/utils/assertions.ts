export function assertStringArray(value: unknown): asserts value is string[] {
  if (!value || typeof value !== "object" || !("length" in value)) {
    throw new Error("value is not a string array");
  }
}
