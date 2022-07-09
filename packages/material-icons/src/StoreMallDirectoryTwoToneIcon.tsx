import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function StoreMallDirectoryTwoToneIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="m5.64 9-.6 3h13.92l-.6-3z" opacity=".3" />
        <path d="m4 7-1 5v2h1v6h10v-6h4v6h2v-6h1v-2l-1-5H4zm8 11H6v-4h6v4zm-6.96-6 .6-3h12.72l.6 3H5.04zM4 4h16v2H4z" />
      </SVGIcon>
    );
  }
);
