import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/core";
import { SVGIcon } from "@react-md/core";

export default forwardRef<SVGSVGElement, SVGIconProps>(function MmsSharpIcon(
  props,
  ref
) {
  return (
    <SVGIcon {...props} ref={ref}>
      <path d="M22 2H2v20l4-4h16V2zM5 14l3.5-4.5 2.5 3.01L14.5 8l4.5 6H5z" />
    </SVGIcon>
  );
});
