import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function HomeWorkTwoToneIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M0 0h24v24H0z" fill="none" />
        <path d="M17 15h2v2h-2zm0-4h2v2h-2zm0-4h2v2h-2zm-3.26 0 1.26.84V7z" />
        <path d="M10 3v1.51l2 1.33V5h9v14h-4v2h6V3z" />
        <path d="M8.17 5.7 15 10.25V21H1V10.48L8.17 5.7zM10 19h3v-7.84L8.17 8.09 3 11.38V19h3v-6h4v6z" />
        <path d="M10 19h3v-7.84L8.17 8.09 3 11.38V19h3v-6h4z" opacity=".3" />
      </SVGIcon>
    );
  }
);
