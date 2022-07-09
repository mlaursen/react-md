import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function PermDeviceInformationSharpIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M13 7h-2v2h2V7zm0 4h-2v6h2v-6zM5 1v22h14V1H5zm12 18H7V5h10v14z" />
      </SVGIcon>
    );
  }
);
