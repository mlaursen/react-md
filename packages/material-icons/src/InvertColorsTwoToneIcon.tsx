import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function InvertColorsTwoToneIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M24 0H0v24h24V0z" fill="none" />
        <path
          d="M6 13.59c0 1.6.62 3.1 1.76 4.24A5.928 5.928 0 0 0 12 19.59V5.1L7.76 9.35A5.928 5.928 0 0 0 6 13.59z"
          opacity=".3"
        />
        <path d="M17.66 7.93 12 2.27 6.34 7.93c-3.12 3.12-3.12 8.19 0 11.31C7.9 20.8 9.95 21.58 12 21.58s4.1-.78 5.66-2.34c3.12-3.12 3.12-8.19 0-11.31zM12 19.59c-1.6 0-3.11-.62-4.24-1.76C6.62 16.69 6 15.19 6 13.59s.62-3.11 1.76-4.24L12 5.1v14.49z" />
      </SVGIcon>
    );
  }
);