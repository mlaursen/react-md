import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function SubdirectoryArrowRightRoundedIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M24 24H0V0h24v24z" fill="none" opacity=".87" />
        <path d="m18.29 15.71-4.58 4.58c-.39.39-1.03.39-1.42 0-.39-.39-.39-1.03 0-1.42L15.17 16H5c-.55 0-1-.45-1-1V5c0-.55.45-1 1-1s1 .45 1 1v9h9.17l-2.88-2.87c-.39-.39-.39-1.03 0-1.42.39-.39 1.03-.39 1.42 0l4.58 4.58c.39.39.39 1.03 0 1.42z" />
      </SVGIcon>
    );
  }
);
