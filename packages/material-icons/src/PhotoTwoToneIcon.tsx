import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function PhotoTwoToneIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path
          d="M19 5H5v14h14V5zM6 17l3-3.86 2.14 2.58 3-3.87L18 17H6z"
          opacity=".3"
        />
        <path d="M5 21h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2zM5 5h14v14H5V5zm6.14 10.72L9 13.14 6 17h12l-3.86-5.14z" />
      </SVGIcon>
    );
  }
);
