"use client";
import { cnb } from "cnbuilder";
import { forwardRef, type MouseEventHandler } from "react";
import { useElementInteraction } from "../interaction/useElementInteraction.js";
import { useHigherContrastChildren } from "../interaction/useHigherContrastChildren.js";
import { Card, type CardProps } from "./Card.js";

const noop = (): void => {
  // do nothing
};

/**
 * @remarks \@since 6.0.0
 */
export interface ClickableCardProps extends CardProps {
  onClick: MouseEventHandler<HTMLDivElement>;

  /**
   * Set this to `true` to disable all click events.
   *
   * Note: Any disabled styling will need to be manually applied.
   *
   * @defaultValue `false`
   */
  disabled?: boolean;
}

/**
 * A Small wrapper around the `Card` component that is clickable and has the
 * element interaction enabled (ripples).
 *
 * @example
 * SImple Example
 * ```tsx
 * import { CardContent, ClickableCard } from "@react-md/core";
 * import { type ReactElement } from "react";
 *
 * export default function ClickableCardExample(): ReactElement {
 *   return (
 *     <ClickableCard
 *       onClick={() => {
 *         // do something
 *       }}
 *     >
 *       <CardContent>Wow</CardContent>
 *     </ClickableCard>
 *   );
 * }
 * ```
 *
 * @remarks \@since 6.0.0
 */
export const ClickableCard = forwardRef<HTMLDivElement, ClickableCardProps>(
  function ClickableCard(props, ref) {
    const {
      role = "button",
      disabled,
      tabIndex = disabled ? undefined : 0,
      onClick,
      onKeyDown = noop,
      className,
      children: propChildren,
      ...remaining
    } = props;
    const { handlers, ripples } = useElementInteraction(remaining);
    const children = useHigherContrastChildren(propChildren);

    return (
      <Card
        {...remaining}
        {...handlers}
        aria-disabled={disabled || undefined}
        ref={ref}
        role={role}
        tabIndex={tabIndex}
        className={cnb("rmd-card--clickable", className)}
        onClick={(event) => {
          if (disabled) {
            return;
          }

          onClick(event);
        }}
        onKeyDown={(event) => {
          onKeyDown(event);
          if (disabled) {
            return;
          }

          const isSpace = event.key === " ";
          if (isSpace || event.key === "Enter") {
            if (isSpace) {
              event.preventDefault();
            }

            event.currentTarget.click();
          }
        }}
      >
        {children}
        {ripples}
      </Card>
    );
  }
);
