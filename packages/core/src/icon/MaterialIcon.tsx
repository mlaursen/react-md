import {
  type AriaAttributes,
  type HTMLAttributes,
  type ReactElement,
  type Ref,
} from "react";

import { type MaterialIconFamily, type MaterialIconName } from "./material.js";
import { MATERIAL_CONFIG } from "./materialConfig.js";
import { type MaterialIconClassNameOptions, icon } from "./styles.js";

/** @since 6.0.0 */
export interface MaterialIconProps
  extends
    HTMLAttributes<HTMLSpanElement>,
    Partial<MaterialIconClassNameOptions> {
  ref?: Ref<HTMLSpanElement>;

  /**
   * The icon name to use
   */
  name: MaterialIconName;

  /** @defaultValue `true` */
  "aria-hidden"?: AriaAttributes["aria-hidden"];

  /** @defaultValue `MATERIAL_CONFIG.iconFamily` */
  family?: MaterialIconFamily;
  children?: never;
}

/**
 * The `MaterialIcon` component is used for rendering a material icon using the
 * Google Fonts stylesheet (handled separately). This is mostly a convenience
 * wrapper around the `FontIcon` that will catch typos for the supported icon
 * names.
 *
 * @example Simple Example
 * ```tsx
 * <MaterialIcon name="3k" />
 * <MaterialIcon name="favorite" theme="primary" />
 * <MaterialIcon name="wifi" family="two-tone" dense theme="warning" />
 * ```
 *
 * @see {@link https://react-md.dev/components/icon | Icon Demos}
 * @see {@link https://react-md.dev/components/material-icons|Available Material Icons}
 * @since 6.0.0
 */
export function MaterialIcon(props: MaterialIconProps): ReactElement {
  const {
    ref,
    "aria-hidden": ariaHidden = true,
    name,
    family = MATERIAL_CONFIG.iconFamily,
    theme,
    dense,
    className,
    ...remaining
  } = props;

  return (
    <span
      {...remaining}
      aria-hidden={ariaHidden}
      ref={ref}
      className={icon({
        type: "material",
        family,
        theme,
        dense,
        className,
      })}
    >
      {name}
    </span>
  );
}
