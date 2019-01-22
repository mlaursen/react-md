import React, {
  cloneElement,
  isValidElement,
  Fragment,
  Children,
  FunctionComponent,
  ReactNode,
  ReactElement,
} from "react";
import cn from "classnames";

export interface ITextIconSpacingProps {
  /**
   * An optional className to apply to the surroudning `<span>` when the `forceIconWrap` prop
   * is enabled or the icon is not a valid React Element.
   */
  className?: string;

  /**
   * An optional icon to display with a text button. This is invalid for icon buttons. If this is
   * a single element, a new class name will be cloned into the element to get correct spacing so
   * if you have a custom icon element, you **must** also pass that class name down. If you are
   * using one of the react-md icon component packages, this is handled automatically.
   *
   * If this is not a valid react element, the icon will be wrapped in a `<span>` instead
   * with the class names applied.
   */
  icon?: ReactElement<Element> | ReactNode;

  /**
   * Boolean if the icon should appear after the text instead of before.
   */
  iconAfter?: boolean;

  /**
   * The children to render before or after the provided icon. This is defaulted to `null` so that
   * providing a `null` icon will correctly render without React crashing.
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
   * Boolean if the icon should be forced into a `<span>` with the class names applied instead of
   * attempting to clone into the provided icon.
   */
  forceIconWrap?: boolean;
}

export interface ITextIconSpacingDefaultProps {
  children: ReactNode;
  iconAfter: boolean;
  beforeClassName: string;
  afterClassName: string;
  forceIconWrap: boolean;
}

export type TextIconSpacingWithDefaultProps = ITextIconSpacingProps &
  ITextIconSpacingDefaultProps;

const TextIconSpacing: FunctionComponent<ITextIconSpacingProps> = props => {
  const {
    icon: propIcon,
    iconAfter,
    children,
    className,
    beforeClassName,
    afterClassName,
    forceIconWrap,
  } = props as TextIconSpacingWithDefaultProps;

  if (!propIcon) {
    return children as ReactElement<any>;
  }

  let iconEl = propIcon;
  let content = children;
  if (!forceIconWrap && isValidElement(propIcon)) {
    const icon = Children.only(propIcon);
    iconEl = cloneElement(icon, {
      className: cn(
        {
          [beforeClassName]: !iconAfter,
          [afterClassName]: iconAfter,
        },
        icon.props.className
      ),
    });
  } else if (propIcon) {
    iconEl = (
      <span
        className={cn(
          "rmd-text-icon-spacing",
          {
            [beforeClassName]: !iconAfter,
            [afterClassName]: iconAfter,
          },
          className
        )}
      >
        {propIcon}
      </span>
    );
  }

  if (iconEl) {
    content = (
      <Fragment>
        {!iconAfter && iconEl}
        {children}
        {iconAfter && iconEl}
      </Fragment>
    );
  }

  return content as ReactElement<any>;
};

const defaultProps: ITextIconSpacingDefaultProps = {
  children: null,
  iconAfter: false,
  forceIconWrap: false,
  beforeClassName: "rmd-icon--before",
  afterClassName: "rmd-icon--after",
};

TextIconSpacing.defaultProps = defaultProps;

if (process.env.NODE_ENV !== "production") {
  let PropTypes = null;
  try {
    PropTypes = require("prop-types");
  } catch (e) {}

  if (PropTypes) {
    TextIconSpacing.propTypes = {
      className: PropTypes.string,
      icon: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.node,
        PropTypes.object,
      ]),
      iconAfter: PropTypes.bool,
      children: PropTypes.node,
      beforeClassName: PropTypes.string,
      afterClassName: PropTypes.string,
      forceIconWrap: PropTypes.bool,
    };
  }
}

export default TextIconSpacing;
