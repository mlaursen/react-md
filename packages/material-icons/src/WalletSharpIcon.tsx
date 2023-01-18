import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/core";
import { SVGIcon } from "@react-md/core";

export default forwardRef<SVGSVGElement, SVGIconProps>(function WalletSharpIcon(
  props,
  ref
) {
  return (
    <SVGIcon {...props} ref={ref}>
      <path d="M22 4H2v16h20V4zm-6.25 10.09L4 11.22V10h16v.53l-4.25 3.56zM4 6h16v2H4V6z" />
    </SVGIcon>
  );
});
