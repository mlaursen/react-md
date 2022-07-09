import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function TapasRoundedIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path fill="none" d="M0 0h24v24H0z" />
        <path d="M22 10V2c0-.55-.45-1-1-1h-6c-.55 0-1 .45-1 1v8c0 1.86 1.28 3.41 3 3.86V21h-1c-.55 0-1 .45-1 1s.45 1 1 1h4c.55 0 1-.45 1-1s-.45-1-1-1h-1v-7.14c1.72-.45 3-2 3-3.86zm-2-7v3h-4V3h4zM9.86 9H8V8h1.86c1.31 0 2.5-.94 2.63-2.24A2.5 2.5 0 0 0 10 3H8V2c0-.55-.45-1-1-1s-1 .45-1 1v1H4.14c-1.31 0-2.5.94-2.63 2.24A2.5 2.5 0 0 0 4 8h2v1H4.14c-1.31 0-2.5.94-2.63 2.24A2.5 2.5 0 0 0 4 14h2v8c0 .55.45 1 1 1s1-.45 1-1v-8h2a2.5 2.5 0 0 0 2.49-2.76C12.36 9.94 11.17 9 9.86 9z" />
      </SVGIcon>
    );
  }
);
