import {
  forwardRef,
  type AriaAttributes,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import { icon, type FontIconClassNameOptions } from "./styles.js";

/**
 * @since 6.0.0 Removed the `forceSize`/`forceFontSize` props and added the
 * `inline` and `theme` props.
 */
export interface FontIconProps
  extends HTMLAttributes<HTMLSpanElement>,
    FontIconClassNameOptions {
  /** @defaultValue `true` */
  "aria-hidden"?: AriaAttributes["aria-hidden"];

  /**
   * Any children to render to create the font icon. This is required for
   * material-icons.
   *
   * @example `<FontIcon>clear</FontIcon>`
   */
  children?: ReactNode;
}

/**
 * The `FontIcon` component is used for rendering a font-icon library's icon.
 * The default is to use the `material-icons` library, but others can be used as
 * well.
 *
 * @since 6.0.0 Switched from `<i>` to `<span>` element and removed
 * the `forceSize`/`forceFontSize` props.
 */
export const FontIcon = forwardRef<HTMLElement, FontIconProps>(
  function FontIcon(props, ref) {
    const {
      "aria-hidden": ariaHidden = true,
      iconClassName = "material-icons",
      dense = false,
      theme,
      className,
      children,
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
