import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/core";
import { SVGIcon } from "@react-md/core";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function WorkspacePremiumRoundedIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="m10.92 12.75 1.08-.82 1.07.81c.39.29.92-.08.78-.55l-.42-1.36 1.2-.95c.37-.28.16-.88-.32-.88h-1.4l-.43-1.34a.5.5 0 0 0-.95 0L11.09 9H9.68c-.47 0-.68.6-.31.89l1.19.95-.42 1.36c-.14.47.39.84.78.55zM6 21.61c0 .68.67 1.16 1.32.95L12 21l4.68 1.56a.998.998 0 0 0 1.32-.95v-6.33A7.96 7.96 0 0 0 20 10c0-4.42-3.58-8-8-8s-8 3.58-8 8c0 2.03.76 3.87 2 5.28v6.33zM12 4c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6 2.69-6 6-6z" />
      </SVGIcon>
    );
  }
);
