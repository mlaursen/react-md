import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(function DryIcon(
  props,
  ref
) {
  return (
    <SVGIcon {...props} ref={ref}>
      <path fill="none" d="M0 0h24v24H0z" />
      <path d="m15.65 4.86-.07-.07c-.57-.62-.82-1.41-.67-2.2L15 2h-1.89l-.06.43c-.2 1.36.27 2.71 1.3 3.72l.07.06c.57.62.82 1.41.67 2.2l-.11.59h1.91l.06-.43c.21-1.36-.27-2.71-1.3-3.71zm4 0-.07-.07c-.57-.62-.82-1.41-.67-2.2L19 2h-1.89l-.06.43c-.2 1.36.27 2.71 1.3 3.72l.07.06c.57.62.82 1.41.67 2.2l-.11.59h1.91l.06-.43c.21-1.36-.27-2.71-1.3-3.71zM9.12 5l-7.18 6.79c-.6.56-.94 1.35-.94 2.18V20c0 1.66 1.34 3 3 3h13.75a1.25 1.25 0 0 0 0-2.5H12v-1h7.75a1.25 1.25 0 0 0 0-2.5H12v-1h8.75a1.25 1.25 0 0 0 0-2.5H12v-1h6.75a1.25 1.25 0 0 0 0-2.5H8.86c.64-1.11 1.48-2.58 1.49-2.61a1.065 1.065 0 0 0-.12-1.23C10.22 6.12 9.12 5 9.12 5z" />
    </SVGIcon>
  );
});
