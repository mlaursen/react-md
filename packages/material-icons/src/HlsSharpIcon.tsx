import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(function HlsSharpIcon(
  props,
  ref
) {
  return (
    <SVGIcon {...props} ref={ref}>
      <path d="M6.5 9H8v6H6.5v-2.5h-2V15H3V9h1.5v2h2V9zm9 6h5v-3.5H17v-1h2v.5h1.5V9h-5v3.5H19v1h-2V13h-1.5v2zM14 15v-1.5h-2.5V9H10v6h4z" />
    </SVGIcon>
  );
});