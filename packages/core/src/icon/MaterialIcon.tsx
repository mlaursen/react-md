"use client";
import type { AriaAttributes, HTMLAttributes } from "react";
import { forwardRef } from "react";
import type { MaterialIconName } from "./material";
import { useMaterialIconsFamily } from "./MaterialIconsProvider";
import type { MaterialIconClassNameOptions } from "./styles";
import { icon } from "./styles";

/** @remarks \@since 6.0.0 */
export interface MaterialIconProps
  extends Omit<HTMLAttributes<HTMLSpanElement>, "color">,
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
      color,
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
          color,
          dense,
          className,
        })}
      >
        {name}
      </span>
    );
  }
);
