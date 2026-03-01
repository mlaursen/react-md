import { cnb } from "cnbuilder";

/**
 * @since 8.0.0
 */
export type FocusInteractionDirection = "inward" | "outward";

/**
 * @since 8.0.0
 */
export interface InteractionClassNameOptions {
  className?: string;

  focus?: FocusInteractionDirection;
}

/**
 * @since 8.0.0
 */
export function interaction(options: InteractionClassNameOptions = {}): string {
  const { className, focus } = options;

  return cnb(focus && `rmd-interaction-${focus}`, className);
}
