import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function SettingsEthernetRoundedIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M7 6.12a1 1 0 0 0-1.41.13l-4.24 5.11c-.31.37-.31.91 0 1.28l4.24 5.11a1 1 0 0 0 1.41.13 1 1 0 0 0 .13-1.41L3.42 12l3.71-4.47A1 1 0 0 0 7 6.12zM7 13h2v-2H7v2zm10-2h-2v2h2v-2zm-6 2h2v-2h-2v2zm6-6.88a1 1 0 0 0-.13 1.41L20.58 12l-3.71 4.47c-.35.43-.29 1.06.13 1.41a1 1 0 0 0 1.41-.13l4.24-5.11c.31-.37.31-.91 0-1.28l-4.24-5.11A1.01 1.01 0 0 0 17 6.12z" />
      </SVGIcon>
    );
  }
);