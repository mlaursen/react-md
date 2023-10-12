import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { icon, type FontIconClassNameOptions } from "./styles.js";

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
 * **Server Component**
 *
 * The `FontIcon` component is used for rendering a font-icon library's icon.
 * The default is to use the `material-icons` library, but others can be used as
 * well.
 *
 * If you are using another font icon library that does not always create icons
 * with a perfect 1:1 scale (such as font awesome), it is recommended to use the
 * `forceSize` and `forceFontSize` props to fix the sizing issues.
 *
 * \@remarks \@since 6.0.0 Switched from `<i>` to `<span>` element and removed
 * the `forceSize`/`forceFontSize` props.
 */
export const FontIcon = forwardRef<HTMLElement, FontIconProps>(
  function FontIcon(props, ref) {
    const {
      className,
      children,
      "aria-hidden": ariaHidden = true,
      dense = false,
      theme,
      iconClassName = "material-icons",
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
          theme,
          className,
          iconClassName,
        })}
      >
        {children}
      </span>
    );
  }
);
