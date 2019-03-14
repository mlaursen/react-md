import React, {
  forwardRef,
  FunctionComponent,
  HTMLAttributes,
  ReactNode,
} from "react";
import cn from "classnames";
import { WithForwardedRef } from "@react-md/utils";

export interface FontIconProps extends HTMLAttributes<HTMLElement> {
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
  children?: ReactNode;

  /**
   * Either a boolean that will enforce the 24x24 size of the font icon or a number of the size
   * to enforce. This is useful when using other font icon libraries that do not have a consistent
   * size.
   */
  forceSize?: boolean;

  /**
   * Boolean if the `forceSize` prop should also force the `font-size` instead of only `width` and
   * `height`.
   */
  forceFontSize?: boolean;
}

type DefaultProps = Required<
  Pick<FontIconProps, "dense" | "iconClassName" | "forceSize" | "forceFontSize">
>;
type WithDefaultProps = FontIconProps & DefaultProps & WithForwardedRef;

/**
 * The `FontIcon` component is used for rendering a font-icon library's
 * icon. The default is to use the `material-icons` library, but others
 * can be used as well.
 *
 * If you are using another font icon library that does not always create icons with
 * a perfect 1:1 scale (such as font awesome), it is recommended to use the `forceSize`
 * and `forceFontSize` props to fix the sizing issues.
 */
const FontIcon: FunctionComponent<
  FontIconProps & WithForwardedRef
> = providedProps => {
  const {
    className,
    iconClassName,
    dense,
    forceSize,
    forceFontSize,
    children,
    forwardedRef,
    ...props
  } = providedProps as WithDefaultProps;

  return (
    <i
      {...props}
      ref={forwardedRef}
      className={cn(
        "rmd-icon rmd-icon--font",
        {
          "rmd-icon--dense": dense,
          "rmd-icon--forced-font": forceFontSize,
          "rmd-icon--forced-size": forceSize,
        },
        iconClassName,
        className
      )}
    >
      {children}
    </i>
  );
};

const defaultProps: DefaultProps = {
  dense: false,
  iconClassName: "material-icons",
  forceSize: false,
  forceFontSize: false,
};

FontIcon.defaultProps = defaultProps;

if (process.env.NODE_ENV !== "production") {
  FontIcon.displayName = "FontIcon";

  let PropTypes = null;
  try {
    PropTypes = require("prop-types");
  } catch (e) {}

  if (PropTypes) {
    FontIcon.propTypes = {
      className: PropTypes.string,
      iconClassName: PropTypes.string,
      dense: PropTypes.bool,
      forceSize: PropTypes.bool,
      forceFontSize: PropTypes.bool,
      children: PropTypes.node,
    };
  }
}

export default forwardRef<HTMLElement, FontIconProps>((props, ref) => (
  <FontIcon {...props} forwardedRef={ref} />
));
