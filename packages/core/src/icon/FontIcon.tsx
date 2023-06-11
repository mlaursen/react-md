import type { HTMLAttributes, ReactNode } from "react";
import { forwardRef } from "react";

import type { FontIconClassNameOptions } from "./styles";
import { icon } from "./styles";

export interface FontIconProps
  extends Omit<HTMLAttributes<HTMLElement>, "color">,
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
 *
 * \@remarks \@since 6.0.0 Switched from `<i>` to `<span>` element.
 */
export const FontIcon = forwardRef<HTMLElement, FontIconProps>(
  function FontIcon(props, ref) {
    const {
      className,
      children,
      "aria-hidden": ariaHidden = true,
      dense = false,
      color,
      iconClassName = "material-icons",
      forceSize = false,
      forceFontSize = false,
      ...remaining
    } = props;

    return (
      <span
        {...remaining}
        aria-hidden={ariaHidden}
        ref={ref}
        className={icon({
          type: "font",
          dense,
          color,
          className,
          iconClassName,
          forceSize,
          forceFontSize,
        })}
      >
        {children}
      </span>
    );
  }
);
