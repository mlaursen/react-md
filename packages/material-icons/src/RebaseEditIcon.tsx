import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/core";
import { SVGIcon } from "@react-md/core";

export default forwardRef<SVGSVGElement, SVGIconProps>(function RebaseEditIcon(
  props,
  ref
) {
  return (
    <SVGIcon {...props} ref={ref}>
      <circle cx="19" cy="5" r="3" />
      <path d="M10.76 9.24 15 5 10.76.76 9.34 2.17 11.17 4H7.82C7.4 2.84 6.3 2 5 2 3.34 2 2 3.34 2 5c0 1.3.84 2.4 2 2.82v8.37C2.84 16.6 2 17.7 2 19c0 1.66 1.34 3 3 3s3-1.34 3-3c0-1.3-.84-2.4-2-2.82V7.82c.85-.31 1.51-.97 1.82-1.82h3.36L9.34 7.83l1.42 1.41zM10 19v3h3l6.26-6.26-3-3zm10.12-8.71a.996.996 0 0 0-1.41 0l-1.38 1.38 3 3 1.38-1.38a.996.996 0 0 0 0-1.41l-1.59-1.59z" />
    </SVGIcon>
  );
});
