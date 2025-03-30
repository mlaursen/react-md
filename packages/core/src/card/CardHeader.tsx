import { type HTMLAttributes, type ReactNode, forwardRef } from "react";

import { type PropsWithRef } from "../types.js";
import { cardHeader, cardHeaderContent } from "./styles.js";

/**
 * @since 6.0.0 Removed the `align` prop.
 * @since 6.0.0 Renamed the `beforeChildren` and `afterChildren` props to
 * `beforeAddon` and `afterAddon`.
 * @since 6.0.0 Removed the `contentClassName` prop in favor of the
 * `contentProps`.
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
 * @see {@link https://next.react-md.dev/components/card | Card Demos}
 * @since 6.0.0 Removed the `align` prop.
 * @since 6.0.0 Renamed the `beforeChildren` and `afterChildren` props to
 * `beforeAddon` and `afterAddon`.
 * @since 6.0.0 Removed the `contentClassName` prop in favor of the
 * `contentProps`.
 * @since 6.0.0 No longer uses the `TextIconSpacing` component and instead
 * relies on the CSS `gap` for spacing.
 * @since 6.0.0 Renders as a `<div>` instead of a `<header>`
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
      <div
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
      </div>
    );
  }
);
