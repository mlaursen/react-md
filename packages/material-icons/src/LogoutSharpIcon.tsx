import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(function LogoutSharpIcon(
  props,
  ref
) {
  return (
    <SVGIcon {...props} ref={ref}>
      <path d="M5 5h7V3H3v18h9v-2H5z" />
      <path d="m21 12-4-4v3H9v2h8v3z" />
    </SVGIcon>
  );
});
