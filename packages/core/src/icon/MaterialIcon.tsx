"use client";
import { forwardRef, type AriaAttributes, type HTMLAttributes } from "react";
import { useMaterialIconsFamily } from "./MaterialIconsProvider.js";
import { type MaterialIconName } from "./material.js";
import { icon, type MaterialIconClassNameOptions } from "./styles.js";

/** @remarks \@since 6.0.0 */
export interface MaterialIconProps
  extends HTMLAttributes<HTMLSpanElement>,
    Partial<MaterialIconClassNameOptions> {
  /** @defaultValue `true` */
  "aria-hidden"?: AriaAttributes["aria-hidden"];
  name: MaterialIconName;
}

/**
 * **Client Component**
 * Might be able to become a server component if I remove the useMaterialIconsFamily hook
 *
 * @remarks \@since 6.0.0
 */
export const MaterialIcon = forwardRef<HTMLSpanElement, MaterialIconProps>(
  function MaterialIcon(props, ref) {
    const {
      "aria-hidden": ariaHidden = true,
      name,
      family: propFamily,
      theme,
      dense,
      className,
      ...remaining
    } = props;
    const family = useMaterialIconsFamily(propFamily);

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
