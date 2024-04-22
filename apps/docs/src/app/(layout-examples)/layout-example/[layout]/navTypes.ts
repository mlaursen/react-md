export const NAVIGATION_TYPES = ["core", "list", "tree"] as const;

export type NavigationType = (typeof NAVIGATION_TYPES)[number];
