import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function LabelImportantTwoToneIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M15 7H7.89l3.57 5-3.57 5H15l3.55-5z" opacity=".3" />
        <path d="M16.63 5.84C16.27 5.33 15.67 5 15 5H4l5 7-5 6.99h11c.67 0 1.27-.32 1.63-.83L21 12l-4.37-6.16zM15 17H7.89l3.57-5-3.57-5H15l3.55 5L15 17z" />
      </SVGIcon>
    );
  }
);
