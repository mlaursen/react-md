import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function LabelImportantOutlineSharpIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M16.03 19H3l4.5-7L3 5h13.03L21 12l-4.97 7zM6.5 17H15l3.5-5L15 7H6.5l3.5 5-3.5 5z" />
      </SVGIcon>
    );
  }
);
