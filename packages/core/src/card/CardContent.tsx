import { type HTMLAttributes, type ReactElement, type Ref } from "react";

import { type CardContentClassNameOptions, cardContent } from "./styles.js";

/**
 * @since 6.0.0 Renamed `disableExtraPadding` to `disableLastChildPadding` and
 * removed the `disableParagraphMargin` prop.
 */
export interface CardContentProps
  extends HTMLAttributes<HTMLDivElement>, CardContentClassNameOptions {
  ref?: Ref<HTMLDivElement>;
}

/**
 * @see {@link https://react-md.dev/components/card | Card Demos}
 * @since 6.0.0 Renamed `disableExtraPadding` to `disableLastChildPadding` and
 * removed the `disableParagraphMargin` prop.
 */
export const CardContent = function CardContent(
  props: CardContentProps
): ReactElement {
  const {
    ref,
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
};
