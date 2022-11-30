import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function SwipeRoundedIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="m21.15 2.85-1.02 1.02C18.69 2.17 15.6 1 12 1S5.31 2.17 3.87 3.87L2.85 2.85a.5.5 0 0 0-.85.36V6.5c0 .28.22.5.5.5h3.29c.45 0 .67-.54.35-.85L4.93 4.93c1-1.29 3.7-2.43 7.07-2.43s6.07 1.14 7.07 2.43l-1.22 1.22a.5.5 0 0 0 .36.85h3.29c.28 0 .5-.22.5-.5V3.21a.5.5 0 0 0-.85-.36z" />
        <path d="M14.5 12.71c-.28-.14-.58-.21-.89-.21H13v-6c0-.83-.67-1.5-1.5-1.5S10 5.67 10 6.5v10.74l-3.44-.72a1.12 1.12 0 0 0-1.02 1.89l4.01 4.01c.37.37.88.58 1.41.58h6.41c1 0 1.84-.73 1.98-1.72l.63-4.46c.12-.85-.32-1.69-1.09-2.07l-4.39-2.04z" />
      </SVGIcon>
    );
  }
);
