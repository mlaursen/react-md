export const TEST_FRAMEWORKS = ["jest", "vitest"] as const;

export type TestFramework = (typeof TEST_FRAMEWORKS)[number];
