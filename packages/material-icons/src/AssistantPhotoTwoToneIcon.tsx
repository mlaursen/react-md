import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/core";
import { SVGIcon } from "@react-md/core";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function AssistantPhotoTwoToneIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="m14.24 12 .4 2H18V8h-5.24l-.4-2H7v6z" opacity=".3" />
        <path d="M7 14h5.6l.4 2h7V6h-5.6L14 4H5v17h2v-7zm0-8h5.36l.4 2H18v6h-3.36l-.4-2H7V6z" />
      </SVGIcon>
    );
  }
);
