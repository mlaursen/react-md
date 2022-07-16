import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function TimerTwoToneIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path
          d="M12.07 6.01c-3.87 0-7 3.13-7 7s3.13 7 7 7 7-3.13 7-7-3.13-7-7-7zm1 8h-2v-6h2v6z"
          opacity=".3"
        />
        <path d="M9.07 1.01h6v2h-6zm2 7h2v6h-2zm8.03-.62 1.42-1.42c-.43-.51-.9-.99-1.41-1.41l-1.42 1.42A8.962 8.962 0 0 0 12.07 4c-4.97 0-9 4.03-9 9s4.02 9 9 9A8.994 8.994 0 0 0 19.1 7.39zm-7.03 12.62c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z" />
      </SVGIcon>
    );
  }
);