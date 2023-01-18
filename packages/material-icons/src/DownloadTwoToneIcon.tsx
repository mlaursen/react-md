import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/core";
import { SVGIcon } from "@react-md/core";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function DownloadTwoToneIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M13 9V5h-2v6H9.83L12 13.17 14.17 11H13z" opacity=".3" />
        <path d="M15 9V3H9v6H5l7 7 7-7h-4zm-3 4.17L9.83 11H11V5h2v6h1.17L12 13.17zM5 18h14v2H5z" />
      </SVGIcon>
    );
  }
);
