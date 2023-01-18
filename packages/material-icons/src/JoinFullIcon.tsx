import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/core";
import { SVGIcon } from "@react-md/core";

export default forwardRef<SVGSVGElement, SVGIconProps>(function JoinFullIcon(
  props,
  ref
) {
  return (
    <SVGIcon {...props} ref={ref}>
      <ellipse cx="12" cy="12" rx="3" ry="5.74" />
      <path d="M7.5 12c0-.97.23-4.16 3.03-6.5C9.75 5.19 8.9 5 8 5c-3.86 0-7 3.14-7 7s3.14 7 7 7c.9 0 1.75-.19 2.53-.5-2.8-2.34-3.03-5.53-3.03-6.5zM16 5c-.9 0-1.75.19-2.53.5 2.8 2.34 3.03 5.53 3.03 6.5 0 .97-.23 4.16-3.03 6.5.78.31 1.63.5 2.53.5 3.86 0 7-3.14 7-7s-3.14-7-7-7z" />
    </SVGIcon>
  );
});
