import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/core";
import { SVGIcon } from "@react-md/core";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function NestCamWiredStandOutlinedIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M16 1c-.15 0 .11-.02-4.28.42C8.47 1.75 6 4.48 6 7.75s2.47 6 5.72 6.33l1.9.19-.56.85c-.35-.08-.7-.12-1.06-.12-2.76 0-5 2.24-5 5v2c0 .55.45 1 1 1h8c.55 0 1-.45 1-1v-2c0-1.67-.83-3.15-2.09-4.06l.97-1.45c.04 0 .09.01.13.01 1.09 0 2-.89 2-2V3C18 1.89 17.09 1 16 1zm-1 20H9v-1c0-1.65 1.35-3 3-3s3 1.35 3 3v1zM8 7.75c0-2.25 1.69-4.11 3.92-4.34L16 3l.03 9.5-4.11-.42A4.336 4.336 0 0 1 8 7.75z" />
      </SVGIcon>
    );
  }
);
