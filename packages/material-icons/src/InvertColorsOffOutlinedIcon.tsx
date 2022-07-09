import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function InvertColorsOffOutlinedIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M12 5.1v4.05l7.4 7.4c1.15-2.88.59-6.28-1.75-8.61L12 2.27 8.56 5.71l1.41 1.41L12 5.1zm-7.6-.73L2.99 5.78l2.78 2.78a8.003 8.003 0 0 0 .57 10.68A7.98 7.98 0 0 0 12 21.58c1.78 0 3.56-.59 5.02-1.77l2.7 2.7 1.41-1.41L4.4 4.37zM12 19.59c-1.6 0-3.11-.62-4.24-1.76A5.945 5.945 0 0 1 6 13.59c0-1.32.43-2.56 1.21-3.59L12 14.79v4.8z" />
      </SVGIcon>
    );
  }
);
