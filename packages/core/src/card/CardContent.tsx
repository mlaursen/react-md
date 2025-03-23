import { type HTMLAttributes, forwardRef } from "react";

import { type CardContentClassNameOptions, cardContent } from "./styles.js";

/**
 * @since 6.0.0 Renamed `disableExtraPadding` to `disableLastChildPadding` and
 * removed the `disableParagraphMargin` prop.
 */
export interface CardContentProps
  extends HTMLAttributes<HTMLDivElement>,
    CardContentClassNameOptions {}

/**
 * @see {@link https://next.react-md.dev/components/card|Card Demos}
 * @since 6.0.0 Renamed `disableExtraPadding` to `disableLastChildPadding` and
 * removed the `disableParagraphMargin` prop.
 */
export const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
  function CardContent(props, ref) {
    const {
      children,
      className,
      disablePadding,
      disableSecondaryColor,
      disableLastChildPadding,
      ...remaining
    } = props;

    return (
      <div
        {...remaining}
        ref={ref}
        className={cardContent({
          className,
          disablePadding,
          disableSecondaryColor,
          disableLastChildPadding,
        })}
      >
        {children}
      </div>
    );
  }
);
