import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function SupportSharpIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path fill="none" d="M0 0h24v24H0z" />
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm7.46 7.12-2.78 1.15a4.982 4.982 0 0 0-2.95-2.94l1.15-2.78c2.1.8 3.77 2.47 4.58 4.57zM12 15c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zM9.13 4.54l1.17 2.78a5 5 0 0 0-2.98 2.97L4.54 9.13a7.984 7.984 0 0 1 4.59-4.59zM4.54 14.87l2.78-1.15a4.968 4.968 0 0 0 2.97 2.96l-1.17 2.78a7.996 7.996 0 0 1-4.58-4.59zm10.34 4.59-1.15-2.78a4.978 4.978 0 0 0 2.95-2.97l2.78 1.17a8.007 8.007 0 0 1-4.58 4.58z" />
      </SVGIcon>
    );
  }
);
