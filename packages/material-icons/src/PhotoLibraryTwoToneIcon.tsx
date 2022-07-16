import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function PhotoLibraryTwoToneIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path
          d="M8 16h12V4H8v12zm3.5-4.33 1.69 2.26 2.48-3.09L19 15H9l2.5-3.33z"
          opacity=".3"
        />
        <path d="M22 16V4c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2zm-2 0H8V4h12v12zm-4.33-5.17-2.48 3.09-1.69-2.25L9 15h10zM4 22h14v-2H4V6H2v14c0 1.1.9 2 2 2z" />
      </SVGIcon>
    );
  }
);