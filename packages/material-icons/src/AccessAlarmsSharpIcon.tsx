import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function AccessAlarmsSharpIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="m22 5.7-4.6-3.9-1.3 1.5 4.6 3.9L22 5.7zM7.9 3.4 6.6 1.9 2 5.7l1.3 1.5 4.6-3.8zM12.5 8H11v6l4.7 2.9.8-1.2-4-2.4V8zM12 4c-5 0-9 4-9 9s4 9 9 9 9-4 9-9-4-9-9-9zm0 16c-3.9 0-7-3.1-7-7s3.1-7 7-7 7 3.1 7 7-3.1 7-7 7z" />
      </SVGIcon>
    );
  }
);
