import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function SynagogueRoundedIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M6 8.94V21h4v-4.89c0-1 .68-1.92 1.66-2.08A2 2 0 0 1 14 16v5h4V8.94a2 2 0 0 0-.72-1.54l-4-3.33c-.74-.62-1.82-.62-2.56 0l-4 3.33c-.46.38-.72.94-.72 1.54zM13.5 10c0 .83-.67 1.5-1.5 1.5s-1.5-.67-1.5-1.5.67-1.5 1.5-1.5 1.5.67 1.5 1.5zM3 5c-1.1 0-2 .9-2 2v1h4V7c0-1.1-.9-2-2-2zm0 16h2V9H1v10c0 1.1.9 2 2 2zM21 5c-1.1 0-2 .9-2 2v1h4V7c0-1.1-.9-2-2-2zm-2 16h2c1.1 0 2-.9 2-2V9h-4v12z" />
      </SVGIcon>
    );
  }
);
