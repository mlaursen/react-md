import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function TempleBuddhistIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M21 9.02c0 1.09-.89 1.98-1.98 1.98H4.98C3.89 11 3 10.11 3 9.02H1c0 1.86 1.28 3.4 3 3.84V22h6v-3c0-1.1.9-2 2-2s2 .9 2 2v3h6v-9.14c.55-.14 3-1.04 3-3.86l-2 .02z" />
        <path d="M6 8.86V10h12V8.86c.55-.14 3-1.04 3-3.86l-2 .02C19 6.11 18.11 7 17.02 7H6.98C5.89 7 5 6.11 5 5.02H3c0 1.85 1.28 3.4 3 3.84z" />
        <path d="M12 1 8.25 6h7.5z" />
      </SVGIcon>
    );
  }
);
