import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function PhotoAlbumSharpIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M20 2H4v20h16V2zM6 4h5v8l-2.5-1.5L6 12V4zm0 15 3-3.86 2.14 2.58 3-3.86L18 19H6z" />
      </SVGIcon>
    );
  }
);
