import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(function Plus3KSharpIcon(
  props,
  ref
) {
  return (
    <SVGIcon {...props} ref={ref}>
      <path d="M21 3H3v18h18V3zM10 9v6H5.5v-1.5h3v-1h-2v-1h2v-1h-3V9H10zm6 6h-1.75l-1.75-2.25V15H11V9h1.5v2.25L14.25 9H16l-2.25 3L16 15zm3-2.5h-1.5V14h-1v-1.5H15v-1h1.5V10h1v1.5H19v1z" />
    </SVGIcon>
  );
});
