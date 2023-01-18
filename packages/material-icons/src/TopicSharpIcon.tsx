import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/core";
import { SVGIcon } from "@react-md/core";

export default forwardRef<SVGSVGElement, SVGIconProps>(function TopicSharpIcon(
  props,
  ref
) {
  return (
    <SVGIcon {...props} ref={ref}>
      <path d="m12 6-2-2H2v16h20V6H12zm2 10H6v-2h8v2zm4-4H6v-2h12v2z" />
    </SVGIcon>
  );
});
