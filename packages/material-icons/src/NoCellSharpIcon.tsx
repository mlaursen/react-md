import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(function NoCellSharpIcon(
  props,
  ref
) {
  return (
    <SVGIcon {...props} ref={ref}>
      <path fill="none" d="M0 0h24v24H0z" />
      <path d="M21.19 21.19 2.81 2.81 1.39 4.22 5 7.83V23h14v-1.17l.78.78 1.41-1.42zM7 18V9.83L15.17 18H7zM8.83 6 5 2.17V1h14v15.17l-2-2V6H8.83z" />
    </SVGIcon>
  );
});
