import * as React from "react";
import * as PropTypes from "prop-types";
import cn from "classnames";

const ICON_SIZE = 24;

export interface IFontIconProps extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * The font icon class name to use.
   */
  iconClassName?: string;

  /**
   * Boolean if the font icon should use the dense spec.
   */
  dense?: boolean;

  /**
   * Any children to render to create the font icon. This is required for material-icons.
   */
  children?: string | React.ReactNode;

  /**
   * Either a boolean that will enforce the 24x24 size of the font icon or a number of the size
   * to enforce. This is useful when using other font icon libraries that do not have a consistent
   * size.
   */
  forceSize?: boolean | number;

  /**
   * Boolean if the `forceSize` prop should also force the `font-size` instead of only `width` and `height`.
   */
  forceFontSize?: boolean;
}

export interface IFontIconDefaultProps {
  dense: boolean;
  iconClassName: string;
  forceSize: boolean;
  forceFontSize: boolean;
}
export type FontIconWithDefaultProps = IFontIconProps & IFontIconDefaultProps;

/**
 * The `FontIcon` component is used for rendering a font-icon library's
 * icon. The default is to use the `material-icons` library, but others
 * can be used as well.
 *
 * If you are using another font icon library that does not always create icons with
 * a perfect 1:1 scale (such as font awesome), it is recommended to use the `forceSize`
 * and `forceFontSize` props to fix the sizing issues.
 */
export default class FontIcon extends React.Component<IFontIconProps> {
  public static propTypes = {
    iconClassName: PropTypes.string,
    children: PropTypes.node,
    dense: PropTypes.bool,
    forceSize: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
    forceFontSize: PropTypes.bool,
  };

  public static defaultProps: IFontIconDefaultProps = {
    dense: false,
    iconClassName: "material-icons",
    forceSize: false,
    forceFontSize: false,
  };

  public render() {
    const {
      style,
      className,
      iconClassName,
      dense,
      forceSize,
      forceFontSize,
      children,
      ...props
    } = this.props as FontIconWithDefaultProps;

    return (
      <i
        {...props}
        style={this.getStyle(style, forceSize, forceFontSize)}
        className={cn(
          "rmd-icon rmd-icon--font",
          {
            "rmd-icon--font-dense": dense,
          },
          iconClassName,
          className
        )}
      >
        {children}
      </i>
    );
  }

  private getStyle = (
    style?: React.CSSProperties,
    forceSize?: boolean | number,
    forceFontSize?: boolean
  ) => {
    let nextStyle = style;
    if (typeof forceSize === "boolean" && forceSize) {
      nextStyle = {
        fontSize: forceFontSize ? ICON_SIZE : undefined,
        height: ICON_SIZE,
        width: ICON_SIZE,
        ...style,
      };
    } else if (typeof forceSize === "number") {
      nextStyle = {
        fontSize: forceFontSize ? forceSize : undefined,
        height: forceSize,
        width: forceSize,
        ...style,
      };
    }

    return nextStyle;
  };
}
