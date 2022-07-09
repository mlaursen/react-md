import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(function AddToDriveIcon(
  props,
  ref
) {
  return (
    <SVGIcon {...props} ref={ref}>
      <path d="M7.71 3.52 1.15 15l3.42 5.99 6.56-11.47-3.42-6zM13.35 15H9.73L6.3 21h8.24a5.93 5.93 0 0 1-1.19-6zM20 16v-3h-2v3h-3v2h3v3h2v-3h3v-2h-3zm.71-4.75L15.42 2H8.58v.01l6.15 10.77a5.99 5.99 0 0 1 5.98-1.53z" />
    </SVGIcon>
  );
});
