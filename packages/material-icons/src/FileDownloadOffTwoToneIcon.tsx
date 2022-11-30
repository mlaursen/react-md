import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function FileDownloadOffTwoToneIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M13 5h-2v3.17l2 2z" opacity=".3" />
        <path d="m11 8.17-2-2V3h6v6h4l-3.59 3.59L13 10.17V5h-2v3.17zm10.19 13.02L2.81 2.81 1.39 4.22 6.17 9H5l7 7 .59-.59L15.17 18H5v2h12.17l2.61 2.61 1.41-1.42z" />
      </SVGIcon>
    );
  }
);
