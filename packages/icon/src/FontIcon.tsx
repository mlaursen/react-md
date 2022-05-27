import type { HTMLAttributes, ReactNode } from "react";
import { forwardRef } from "react";
import type { FontIconClassNameOptions } from "./getIconClassName";
import { getIconClassName } from "./getIconClassName";

export interface FontIconProps
  extends HTMLAttributes<HTMLElement>,
    FontIconClassNameOptions {
  /**
   * Any children to render to create the font icon. This is required for
   * material-icons.
   */
  children?: ReactNode;
}

/**
 * The `FontIcon` component is used for rendering a font-icon library's icon.
 * The default is to use the `material-icons` library, but others can be used as
 * well.
 *
 * If you are using another font icon library that does not always create icons
 * with a perfect 1:1 scale (such as font awesome), it is recommended to use the
 * `forceSize` and `forceFontSize` props to fix the sizing issues.
 */
export const FontIcon = forwardRef<HTMLElement, FontIconProps>(
  function FontIcon(
    {
      className,
      children,
      "aria-hidden": ariaHidden = true,
      dense = false,
      iconClassName = "material-icons",
      forceSize = false,
      forceFontSize = false,
      ...props
    },
    ref
  ) {
    return (
      <i
        {...props}
        aria-hidden={ariaHidden}
        ref={ref}
        className={getIconClassName({
          type: "font",
          dense,
          className,
          iconClassName,
          forceSize,
          forceFontSize,
        })}
      >
        {children}
      </i>
    );
  }
);
