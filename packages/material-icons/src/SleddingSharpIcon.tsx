import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/core";
import { SVGIcon } from "@react-md/core";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function SleddingSharpIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M14 4.5c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2zm3.22 13.4 1.93.63-.46 1.43-3.32-1.08-.47 1.42 3.32 1.08c1.31.43 2.72-.29 3.15-1.61.43-1.31-.29-2.72-1.61-3.15l.46-1.43c2.1.68 3.25 2.94 2.57 5.04a4.003 4.003 0 0 1-5.04 2.57L1 17.36l.46-1.43 3.93 1.28.46-1.43-3.92-1.28.46-1.43L4 13.6V9.5l5.47-2.35c.39-.17.84-.21 1.28-.07.95.31 1.46 1.32 1.16 2.27l-1.05 3.24L14.5 12l2.72 5.9zM6 14.25l.48.16.75-2.31.69-2.1-1.92.82v3.43zm7.94 4.16-6.66-2.16-.46 1.43 6.66 2.16.46-1.43zm.69-1.36-1.18-2.56-3.97.89 5.15 1.67z" />
      </SVGIcon>
    );
  }
);
