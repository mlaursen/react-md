import React, {
  Children,
  cloneElement,
  isValidElement,
  ReactElement,
  ReactNode,
} from "react";
import cn from "classnames";

export interface TextIconSpacingProps {
  /**
   * An optional className to apply to the surroudning `<span>` when the
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
  icon?: ReactElement | ReactNode;

  /**
   * Boolean if the icon should appear after the text instead of before.
   */
  iconAfter?: boolean;

  /**
   * The children to render before or after the provided icon. This is defaulted
   * to `null` so that providing a `null` icon will correctly render without
   * React crashing.
   */
  children?: ReactNode;

  /**
   * The class name to use for an icon that is placed before text.
   */
  beforeClassName?: string;

  /**
   * The class name to use for an icon that is placed after text.
   */
  afterClassName?: string;

  /**
   * The class name to use for an icon that is placed before above the text.
   * This is used when the `stacked` prop is enabled and the `iconAfter` prop is
   * disabled or omitted.
   */
  aboveClassName?: string;

  /**
   * The class name to use for an icon that is placed before above the text.
   * This is used when the `stacked` prop is enabled and the `iconAfter` prop is
   * enabled.
   */
  belowClassName?: string;

  /**
   * Boolean if the icon should be forced into a `<span>` with the class names
   * applied instead of attempting to clone into the provided icon.
   */
  forceIconWrap?: boolean;

  /**
   * Boolean if the icon and text should be stacked instead of inline. Note:
   * You'll normally want to update the container element to have
   * `display: flex` and `flex-direction: column` for this to work.
   */
  stacked?: boolean;

  /**
   * Boolean if the icon and content are in a `column-reverse` or `row-reverse`
   * `flex-direction`. This will swap the different classnames as needed.
   *
   * @remarks \@since 2.5.0
   */
  flexReverse?: boolean;
}

export function TextIconSpacing({
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
}: TextIconSpacingProps): ReactElement {
  if (!propIcon) {
    return <>{children}</>;
  }

  const isAfter = flexReverse ? !iconAfter : iconAfter;
  const baseClassName = cn(
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
  if (!forceIconWrap && isValidElement(propIcon)) {
    const icon = Children.only(propIcon);
    iconEl = cloneElement(icon, {
      className: cn(baseClassName, icon.props.className),
    });
  } else if (propIcon) {
    iconEl = (
      <span className={cn("rmd-text-icon-spacing", baseClassName)}>
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

/* istanbul ignore next */
if (process.env.NODE_ENV !== "production") {
  try {
    const PropTypes = require("prop-types");

    TextIconSpacing.propTypes = {
      className: PropTypes.string,
      icon: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.node,
        PropTypes.object,
      ]),
      iconAfter: PropTypes.bool,
      stacked: PropTypes.bool,
      children: PropTypes.node,
      beforeClassName: PropTypes.string,
      afterClassName: PropTypes.string,
      aboveClassName: PropTypes.string,
      belowClassName: PropTypes.string,
      forceIconWrap: PropTypes.bool,
    };
  } catch (e) {}
}
