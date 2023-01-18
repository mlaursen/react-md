import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/core";
import { SVGIcon } from "@react-md/core";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function LibraryMusicOutlinedIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M20 2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H8V4h12v12zm-7.5-1a2.5 2.5 0 0 0 2.5-2.5V7h3V5h-4v5.51c-.42-.32-.93-.51-1.5-.51a2.5 2.5 0 0 0 0 5zM4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6z" />
      </SVGIcon>
    );
  }
);
