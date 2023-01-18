import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/core";
import { SVGIcon } from "@react-md/core";

export default forwardRef<SVGSVGElement, SVGIconProps>(function NavigationIcon(
  props,
  ref
) {
  return (
    <SVGIcon {...props} ref={ref}>
      <path d="M12 2 4.5 20.29l.71.71L12 18l6.79 3 .71-.71z" />
    </SVGIcon>
  );
});
