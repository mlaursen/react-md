import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function BluetoothRoundedIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="m17 7-4.29-4.29c-.63-.63-1.71-.19-1.71.7v6.18L7.11 5.7A.996.996 0 1 0 5.7 7.11L10.59 12 5.7 16.89a.996.996 0 1 0 1.41 1.41L11 14.41v6.18c0 .89 1.08 1.34 1.71.71L17 17a.996.996 0 0 0 0-1.41L13.41 12 17 8.42c.39-.39.39-1.03 0-1.42zm-4-1.17 1.88 1.88L13 9.59V5.83zm1.88 10.46L13 18.17v-3.76l1.88 1.88z" />
      </SVGIcon>
    );
  }
);