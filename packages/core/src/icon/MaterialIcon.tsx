import { forwardRef, type AriaAttributes, type HTMLAttributes } from "react";
import { type MaterialIconName } from "./material.js";
import { MATERIAL_CONFIG } from "./materialConfig.js";
import { icon, type MaterialIconClassNameOptions } from "./styles.js";

/** @since 6.0.0 */
export interface MaterialIconProps
  extends HTMLAttributes<HTMLSpanElement>,
    Partial<MaterialIconClassNameOptions> {
  /** @defaultValue `true` */
  "aria-hidden"?: AriaAttributes["aria-hidden"];
  name: MaterialIconName;
  children?: never;
}

/**
 * **Server Component**
 *
 * @since 6.0.0
 */
export const MaterialIcon = forwardRef<HTMLSpanElement, MaterialIconProps>(
  function MaterialIcon(props, ref) {
    const {
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
        ref={ref}
        aria-hidden={ariaHidden}
        {...remaining}
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
);
