import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function SettingsBluetoothRoundedIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M11 22h2v2h-2zm-4 0h2v2H7zm8 0h2v2h-2zm-1.59-12 3.62-3.62c.19-.19.29-.44.29-.71s-.11-.52-.29-.71L12.7.65c-.29-.29-.72-.37-1.09-.22-.37.15-.61.52-.61.92v6.23L7.14 3.73a.996.996 0 1 0-1.41 1.41L10.58 10l-4.85 4.85a.996.996 0 1 0 1.41 1.41L11 12.41v6.23c0 .4.24.77.62.92a.995.995 0 0 0 1.09-.21l4.32-4.32c.19-.19.29-.44.29-.71s-.11-.52-.29-.71L13.41 10zM13 3.77l1.91 1.91L13 7.58V3.77zm0 12.46v-3.82l1.91 1.91L13 16.23z" />
      </SVGIcon>
    );
  }
);
