import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function FormatListBulletedAddIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M18 13c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm3 5.5h-2.5V21h-1v-2.5H15v-1h2.5V15h1v2.5H21v1zM7 5h13v2H7z" />
        <circle cx="3.5" cy="18" r="1.5" />
        <path d="M18 11H7v2h6.11c1.26-1.24 2.99-2 4.89-2zM7 17v2h4.08c-.05-.33-.08-.66-.08-1s.03-.67.08-1H7z" />
        <circle cx="3.5" cy="6" r="1.5" />
        <circle cx="3.5" cy="12" r="1.5" />
      </SVGIcon>
    );
  }
);