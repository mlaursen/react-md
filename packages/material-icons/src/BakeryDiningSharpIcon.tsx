import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function BakeryDiningSharpIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="m16.36 7.58-.86 9.41H17l3.16-7.89zM3.84 9.1 7 16.99h1.5l-.86-9.41zM10 16.99h4L15 6H9zm10.32-4.24-1.81 4.5 1.95.96 2.06-1.22zM1.48 16.99l2.06 1.22 1.95-.96-1.81-4.5z" />
      </SVGIcon>
    );
  }
);