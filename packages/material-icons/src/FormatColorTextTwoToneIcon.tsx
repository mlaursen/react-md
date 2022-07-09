import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function FormatColorTextTwoToneIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M0 20h24v4H0z" fillOpacity=".36" />
        <path d="M5.5 17h2.25l1.12-3h6.25l1.12 3h2.25L13 3h-2L5.5 17zm8.88-5H9.62L12 5.67 14.38 12z" />
      </SVGIcon>
    );
  }
);
