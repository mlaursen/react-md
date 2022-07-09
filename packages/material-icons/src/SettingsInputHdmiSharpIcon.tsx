import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function SettingsInputHdmiSharpIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M18 7V2H6v5H5v6l3 6v3h8v-3l3-6V7h-1zM8 4h8v3h-2V5h-1v2h-2V5h-1v2H8V4z" />
      </SVGIcon>
    );
  }
);
