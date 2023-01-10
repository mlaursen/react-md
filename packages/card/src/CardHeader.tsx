import type { PropsWithRef } from "@react-md/core";
import type { HTMLAttributes, ReactNode } from "react";
import { forwardRef } from "react";
import { cardHeader, cardHeaderContent } from "./styles";

/**
 * @remarks
 * \@since 6.0.0 Removed the `align` prop.
 * \@since 6.0.0 Renamed the `beforeChildren` and `afterChildren` props to
 * `beforeAddon` and `afterAddon`.
 * \@since 6.0.0 Removed the `contentClassName` prop in favor of the
 * {@link contentProps}.
 */
export interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Any content to display after the children in the header. This could be an
   * expander icon button, visual media like an image or video, etc.
   */
  afterAddon?: ReactNode;

  /**
   * Any content to display before the children in the header. This could be an
   * expander icon button, visual media like an image or video, etc.
   */
  beforeAddon?: ReactNode;

  /**
   * Any props to pass to the `<div>` that surrounds the `children`. This is
   * generally used to apply custom `style` or `className`.
   */
  contentProps?: PropsWithRef<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
}

/**
 * @remarks
 * \@since 6.0.0 Removed the `align` prop.
 * \@since 6.0.0 Renamed the `beforeChildren` and `afterChildren` props to
 * `beforeAddon` and `afterAddon`.
 * \@since 6.0.0 Removed the `contentClassName` prop in favor of the
 * {@link contentProps}.
 * \@since 6.0.0 No longer uses the `TextIconSpacing` component and instead
 * relies on the CSS `gap` for spacing.
 */
export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  function CardHeader(props, ref) {
    const {
      className,
      children,
      beforeAddon,
      afterAddon,
      contentProps,
      ...remaining
    } = props;

    return (
      <header
        {...remaining}
        ref={ref}
        className={cardHeader({
          className,
          addonBefore: !!beforeAddon,
          addonAfter: !!afterAddon,
        })}
      >
        {beforeAddon}
        <div
          {...contentProps}
          className={cardHeaderContent({ className: contentProps?.className })}
        >
          {children}
        </div>
        {afterAddon}
      </header>
    );
  }
);
