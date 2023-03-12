import type { HTMLAttributes } from "react";
import { forwardRef } from "react";
import type { MaterialIconName } from "./material";
import { useMaterialIconsFamily } from "./MaterialIconsProvider";
import type { MaterialIconClassNameOptions } from "./styles";
import { icon } from "./styles";

/** @remarks \@since 6.0.0 */
export interface MaterialIconProps
  extends Omit<HTMLAttributes<HTMLSpanElement>, "color">,
    Partial<MaterialIconClassNameOptions> {
  name: MaterialIconName;
}

/**
 * @remarks \@since 6.0.0
 */
export const MaterialIcon = forwardRef<HTMLSpanElement, MaterialIconProps>(
  function MaterialIcon(props, ref) {
    const {
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
