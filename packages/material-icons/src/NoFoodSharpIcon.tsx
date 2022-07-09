import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(function NoFoodSharpIcon(
  props,
  ref
) {
  return (
    <SVGIcon {...props} ref={ref}>
      <path fill="none" d="M0 0h24v24H0z" />
      <path d="M11.35 8.52 11 5h5V1h2v4h5l-1.38 13.79L18 15.17l-6.65-6.65zM21.9 21.9 2.1 2.1.69 3.51l5.7 5.7C3.46 9.83 1 11.76 1 15h11.17l2 2H1v2h15v-.17l4.49 4.49 1.41-1.42zM1 23h15v-2H1v2z" />
    </SVGIcon>
  );
});
