import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/core";
import { SVGIcon } from "@react-md/core";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function FactCheckOutlinedIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <g fillRule="evenodd">
          <path d="M20 3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H4V5h16v14z" />
          <path d="M19.41 10.42 17.99 9l-3.17 3.17-1.41-1.42L12 12.16 14.82 15zM5 7h5v2H5zm0 4h5v2H5zm0 4h5v2H5z" />
        </g>
      </SVGIcon>
    );
  }
);
