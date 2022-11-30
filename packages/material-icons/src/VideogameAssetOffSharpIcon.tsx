import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function VideogameAssetOffSharpIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M20.83 18H22V6H8.83l12 12zM17.5 9c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5.67-1.5 1.5-1.5zm3.69 12.19L2.81 2.81 1.39 4.22 3.17 6H2v12h13.17l4.61 4.61 1.41-1.42zM9 13v2H7v-2H5v-2h2V9.83L10.17 13H9z" />
      </SVGIcon>
    );
  }
);
