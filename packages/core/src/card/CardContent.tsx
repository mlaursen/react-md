import { forwardRef, type HTMLAttributes } from "react";
import { cardContent, type CardContentClassNameOptions } from "./styles.js";

/**
 * @remarks
 * \@since 6.0.0 Renamed `disableExtraPadding` to `disableLastChildPadding` and
 * removed the `disableParagraphMargin` prop.
 */
export interface CardContentProps
  extends HTMLAttributes<HTMLDivElement>,
    CardContentClassNameOptions {}

/**
 * **Server Component**
 *
 * @remarks
 * \@since 6.0.0 Renamed `disableExtraPadding` to `disableLastChildPadding` and
 * removed the `disableParagraphMargin` prop.
 */
export const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
  function CardContent(props, ref) {
    const {
      children,
      className,
      disablePadding = false,
      disableSecondaryColor = false,
      disableLastChildPadding = false,
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
