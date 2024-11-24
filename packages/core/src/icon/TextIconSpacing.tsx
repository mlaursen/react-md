import { cnb } from "cnbuilder";
import {
  Children,
  cloneElement,
  isValidElement,
  type ReactElement,
  type ReactNode,
} from "react";

export interface TextIconSpacingProps {
  /**
   * An optional className to apply to the surrounding `<span>` when the
   * `forceIconWrap` prop is enabled or the icon is not a valid React Element.
   * If the `forceIconWrap` prop is not enabled, it will be cloned into the icon
   * instead.
   */
  className?: string;

  /**
   * An optional icon to display with a text button. This is invalid for icon
   * buttons. If this is a single element, a new class name will be cloned into
   * the element to get correct spacing so if you have a custom icon element,
   * you **must** also pass that class name down. If you are using one of the
   * react-md icon component packages, this is handled automatically.
   *
   * If this is not a valid react element, the icon will be wrapped in a
   * `<span>` instead with the class names applied.
   */
  icon?: ReactElement<{ className?: string }> | ReactNode;

  /**
   * Boolean if the icon should appear after the text instead of before.
   *
   * @defaultValue `false`
   */
  iconAfter?: boolean;

  /**
   * The children to render before or after the provided icon. This is defaulted
   * to `null` so that providing a `null` icon will correctly render without
   * React crashing.
   *
   * @defaultValue `null`
   */
  children?: ReactNode;

  /**
   * The class name to use for an icon that is placed before text.
   *
   * @defaultValue `"rmd-icon--before"`
   */
  beforeClassName?: string;

  /**
   * The class name to use for an icon that is placed after text.
   *
   * @defaultValue `"rmd-icon--after"`
   */
  afterClassName?: string;

  /**
   * The class name to use for an icon that is placed before above the text.
   * This is used when the `stacked` prop is enabled and the `iconAfter` prop is
   * disabled or omitted.
   *
   * @defaultValue `"rmd-icon--above"`
   */
  aboveClassName?: string;

  /**
   * The class name to use for an icon that is placed before above the text.
   * This is used when the `stacked` prop is enabled and the `iconAfter` prop is
   * enabled.
   *
   * @defaultValue `"rmd-icon--below"`
   */
  belowClassName?: string;

  /**
   * Boolean if the icon should be forced into a `<span>` with the class names
   * applied instead of attempting to clone into the provided icon.
   *
   * @defaultValue `false`
   */
  forceIconWrap?: boolean;

  /**
   * Boolean if the icon and text should be stacked instead of inline. Note:
   * You'll normally want to update the container element to have
   * `display: flex` and `flex-direction: column` for this to work.
   *
   * @defaultValue `false`
   */
  stacked?: boolean;

  /**
   * Boolean if the icon and content are in a `column-reverse` or `row-reverse`
   * `flex-direction`. This will swap the different classnames as needed.
   *
   * @since 2.5.0
   * @defaultValue `false`
   */
  flexReverse?: boolean;
}

/**
 * Note: This component **must** be rendered within a flex container unless the
 * {@link TextIconSpacingProps.forceIconWrap} is set to `true`.
 *
 * @example Simple Example
 * ```tsx
 * import { TextIconSpacing, FontIcon } from "@react-md/core";
 * import type { ReactElement } from "react";
 *
 * function Example(): ReactElement {
 *   return (
 *     <TextIconSpacing icon={<FontIcon>favorite</FontIcon>}>
 *       Favorite
 *     </TextIconSpacing>
 *   );
 * }
 * ```
 *
 * @example Stacked Example
 * ```tsx
 * import { TextIconSpacing, FontIcon } from "@react-md/core";
 * import type { ReactElement } from "react";
 *
 * function Example(): ReactElement {
 *   return (
 *     <TextIconSpacing icon={<FontIcon>favorite</FontIcon>} stacked>
 *       Favorite
 *     </TextIconSpacing>
 *   );
 * }
 * ```
 */
export function TextIconSpacing(props: TextIconSpacingProps): ReactElement {
  const {
    className,
    icon: propIcon,
    children = null,
    stacked = false,
    iconAfter = false,
    flexReverse = false,
    forceIconWrap = false,
    beforeClassName = "rmd-icon--before",
    afterClassName = "rmd-icon--after",
    aboveClassName = "rmd-icon--above",
    belowClassName = "rmd-icon--below",
  } = props;

  if (!propIcon) {
    return <>{children}</>;
  }

  const isAfter = flexReverse ? !iconAfter : iconAfter;
  const baseClassName = cnb(
    {
      [beforeClassName]: !stacked && !isAfter,
      [afterClassName]: !stacked && isAfter,
      [aboveClassName]: stacked && !isAfter,
      [belowClassName]: stacked && isAfter,
    },
    className
  );

  let iconEl = propIcon;
  let content = children;
  if (!forceIconWrap && isValidElement<{ className?: string }>(propIcon)) {
    const icon = Children.only(propIcon);
    iconEl = cloneElement(icon, {
      className: cnb(baseClassName, icon.props.className),
    });
  } else if (propIcon) {
    iconEl = (
      <span className={cnb("rmd-text-icon-spacing", baseClassName)}>
        {propIcon}
      </span>
    );
  }

  if (iconEl) {
    content = (
      <>
        {!iconAfter && iconEl}
        {children}
        {iconAfter && iconEl}
      </>
    );
  }

  return <>{content}</>;
}
