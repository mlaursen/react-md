import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function ElectricalServicesSharpIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M18 13h3v2h-3zm-6-1v2h-2v4h2v2h5v-8z" />
        <path d="M5 11h7V4H4v2h6v3H3v8h6v-2H5zm13 6h3v2h-3z" />
      </SVGIcon>
    );
  }
);
