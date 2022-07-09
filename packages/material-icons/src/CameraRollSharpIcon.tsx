import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function CameraRollSharpIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M14 5V3h-3V1H5v2H2v19h12v-2h8V5h-8zm-2 13h-2v-2h2v2zm0-9h-2V7h2v2zm4 9h-2v-2h2v2zm0-9h-2V7h2v2zm4 9h-2v-2h2v2zm0-9h-2V7h2v2z" />
      </SVGIcon>
    );
  }
);
