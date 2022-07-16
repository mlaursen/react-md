import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(function TableRowsIcon(
  props,
  ref
) {
  return (
    <SVGIcon {...props} ref={ref}>
      <path fill="none" d="M0 0h24v24H0z" />
      <path d="M22 7H2V2h20v5zm0 2.5H2v5h20v-5zm0 7.5H2v5h20v-5z" />
    </SVGIcon>
  );
});