import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function SettingsOverscanRoundedIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M12.01 7 10 9h4l-1.99-2zM17 10v4l2-1.99L17 10zM7 10l-2 2.01L7 14v-4zm7 5h-4l2.01 2L14 15zm6-11H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14.01H4V5.99h16v12.02z" />
      </SVGIcon>
    );
  }
);
