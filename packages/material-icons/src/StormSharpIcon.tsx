import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(function StormSharpIcon(
  props,
  ref
) {
  return (
    <SVGIcon {...props} ref={ref}>
      <path d="M18.93 8C16.72 4.18 11.82 2.87 8 5.07c-1.41.82-2.48 2-3.16 3.37-.13-2.2.22-4.4 1.02-6.44H3.74C2.2 6.49 2.52 11.58 5.07 16a7.96 7.96 0 0 0 4.86 3.72c1.98.53 4.16.31 6.07-.79 1.41-.82 2.48-2 3.16-3.37.13 2.2-.21 4.4-1.01 6.44h2.11c1.53-4.49 1.22-9.58-1.33-14zM15 17.2A6.012 6.012 0 0 1 6.8 15c-.11-.2-.21-.4-.3-.6-1.2-2.76-.17-6.06 2.5-7.6 2.86-1.65 6.54-.67 8.2 2.2.11.2.21.4.3.6 1.2 2.76.17 6.06-2.5 7.6zM12 10c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2m0-2c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4z" />
    </SVGIcon>
  );
});