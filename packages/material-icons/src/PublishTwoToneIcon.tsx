import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function PublishTwoToneIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M9.83 12H11v6h2v-6h1.17L12 9.83z" opacity=".3" />
        <path d="M5 4h14v2H5zm7 3-7 7h4v6h6v-6h4l-7-7zm1 5v6h-2v-6H9.83L12 9.83 14.17 12H13z" />
      </SVGIcon>
    );
  }
);
