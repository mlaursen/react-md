import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/core";
import { SVGIcon } from "@react-md/core";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function AssistantPhotoSharpIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M14.4 6 14 4H5v17h2v-7h5.6l.4 2h7V6h-5.6z" />
      </SVGIcon>
    );
  }
);
