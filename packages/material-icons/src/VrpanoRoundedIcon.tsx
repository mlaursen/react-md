import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/core";
import { SVGIcon } from "@react-md/core";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function VrpanoRoundedIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M20.69 4.05C18.66 4.73 15.86 5.5 12 5.5c-3.89 0-6.95-.84-8.69-1.43A.993.993 0 0 0 2 5.02V19c0 .68.66 1.17 1.31.95C5.36 19.26 8.1 18.5 12 18.5c3.87 0 6.66.76 8.69 1.45A.999.999 0 0 0 22 19V5c0-.68-.66-1.16-1.31-.95zm-3.41 11.21A55.23 55.23 0 0 0 12 15c-1.87 0-3.63.1-5.28.27a.5.5 0 0 1-.43-.82l2.5-3c.2-.24.57-.24.77 0l1.62 1.94 2.44-2.93c.2-.24.57-.24.77 0l3.32 3.99c.28.34.01.86-.43.81z" />
      </SVGIcon>
    );
  }
);
