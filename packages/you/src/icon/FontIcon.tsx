import {
  type AriaAttributes,
  type HTMLAttributes,
  type ReactElement,
  type ReactNode,
  type Ref,
} from "react";

import { type FontIconClassNameOptions, icon } from "./styles.js";

export interface FontIconProps
  extends
    HTMLAttributes<HTMLSpanElement>,
    Omit<FontIconClassNameOptions, "type"> {
  ref?: Ref<HTMLSpanElement>;

  /** @defaultValue `true` */
  "aria-hidden"?: AriaAttributes["aria-hidden"];

  /**
   * Any children to render to create the font icon. This is required for
   * material-icons. For example:
   *
   * ```tsx
   * <FontIcon>clear</FontIcon>
   * ```
   */
  children?: ReactNode;
}

/**
 * The `FontIcon` component is used for rendering a font-icon library's icon.
 * The default is to use the `material-icons` library, but others can be used as
 * well.
 *
 * @see {@link https://react-md.dev/components/icon | Icon Demos}
 * @since 6.0.0 Switched from `<i>` to `<span>` element and removed
 * the `forceSize`/`forceFontSize` props.
 */
export function FontIcon(props: Readonly<FontIconProps>): ReactElement {
  const {
    ref,
    size,
    textColor,
    iconClassName,
    className,
    children,
    ...remaining
  } = props;

  return (
    <span
      aria-hidden
      {...remaining}
      ref={ref}
      className={icon({
        type: "font",
        size,
        textColor,
        iconClassName,
        className,
      })}
    >
      {children}
    </span>
  );
}
