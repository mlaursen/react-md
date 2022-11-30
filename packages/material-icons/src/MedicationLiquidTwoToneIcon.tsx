import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function MedicationLiquidTwoToneIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <g opacity=".3">
          <defs>
            <path id="a" d="M4 8h10v11H4z" opacity=".3" />
          </defs>
          <use xlinkHref="#a" overflow="visible" />
          <clipPath id="b">
            <use xlinkHref="#a" overflow="visible" />
          </clipPath>
          <path
            d="M4 19h10V8H4v11zm1-7h2.5V9.5h3V12H13v3h-2.5v2.5h-3V15H5v-3z"
            clipPath="url(#b)"
          />
        </g>
        <path d="M3 3h12v2H3zm11 3H4c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2m0 13H4V8h10v11z" />
        <path d="M7.5 17.5h3V15H13v-3h-2.5V9.5h-3V12H5v3h2.5z" />
        <ellipse cx="20" cy="10" opacity=".3" rx="1" ry="2" />
        <path d="M20 6c-1.68 0-3 1.76-3 4 0 1.77.83 3.22 2 3.76V20c0 .55.45 1 1 1s1-.45 1-1v-6.24c1.17-.54 2-1.99 2-3.76 0-2.24-1.32-4-3-4zm0 6c-.41 0-1-.78-1-2s.59-2 1-2 1 .78 1 2-.59 2-1 2z" />
      </SVGIcon>
    );
  }
);
