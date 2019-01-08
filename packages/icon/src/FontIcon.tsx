import * as React from "react";
import cn from "classnames";
import { IWithForwardedRef } from "@react-md/utils";

const ICON_SIZE = 24;

export interface IFontIconProps extends React.HTMLAttributes<HTMLElement> {
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
  children?: React.ReactNode;

  /**
   * Either a boolean that will enforce the 24x24 size of the font icon or a number of the size
   * to enforce. This is useful when using other font icon libraries that do not have a consistent
   * size.
   */
  forceSize?: boolean | number;

  /**
   * Boolean if the `forceSize` prop should also force the `font-size` instead of only `width` and
   * `height`.
   */
  forceFontSize?: boolean;
}

export interface IFontIconDefaultProps {
  dense: boolean;
  iconClassName: string;
  forceSize: boolean;
  forceFontSize: boolean;
}

export type FontIconWithDefaultProps = IFontIconProps &
  IFontIconDefaultProps &
  IWithForwardedRef;

/**
 * A utility function that will merge the different inline styles together for the `FontIcon` if
 * any of the resizing props are enabled.
 */
function createStyles(
  style?: React.CSSProperties,
  forceSize?: boolean | number,
  forceFontSize?: boolean
) {
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
}

/**
 * The `FontIcon` component is used for rendering a font-icon library's
 * icon. The default is to use the `material-icons` library, but others
 * can be used as well.
 *
 * If you are using another font icon library that does not always create icons with
 * a perfect 1:1 scale (such as font awesome), it is recommended to use the `forceSize`
 * and `forceFontSize` props to fix the sizing issues.
 */
const FontIcon: React.FunctionComponent<
  IFontIconProps & IWithForwardedRef
> = providedProps => {
  const {
    style,
    className,
    iconClassName,
    dense,
    forceSize,
    forceFontSize,
    children,
    forwardedRef,
    ...props
  } = providedProps as FontIconWithDefaultProps;

  return (
    <i
      {...props}
      ref={forwardedRef}
      style={createStyles(style, forceSize, forceFontSize)}
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
};

const defaultProps: IFontIconDefaultProps = {
  dense: false,
  iconClassName: "material-icons",
  forceSize: false,
  forceFontSize: false,
};

FontIcon.defaultProps = defaultProps;

export default React.forwardRef<HTMLElement, IFontIconProps>((props, ref) => (
  <FontIcon {...props} forwardedRef={ref} />
));
