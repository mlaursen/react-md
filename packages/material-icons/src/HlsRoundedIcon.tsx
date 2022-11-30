import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(function HlsRoundedIcon(
  props,
  ref
) {
  return (
    <SVGIcon {...props} ref={ref}>
      <path d="M10.75 9c-.41 0-.75.34-.75.75V14c0 .55.45 1 1 1h2.25c.41 0 .75-.34.75-.75s-.34-.75-.75-.75H11.5V9.75c0-.41-.34-.75-.75-.75zm8.29 1.5c.1.29.38.5.71.5.41 0 .75-.34.75-.75V10c0-.55-.45-1-1-1h-3c-.55 0-1 .45-1 1v1.5c0 .55.45 1 1 1H19v1h-2.04a.75.75 0 0 0-.71-.5c-.41 0-.75.34-.75.75V14c0 .55.45 1 1 1h3c.55 0 1-.45 1-1v-1.5c0-.55-.45-1-1-1H17v-1h2.04zM8 9.75C8 9.34 7.66 9 7.25 9s-.75.34-.75.75V11h-2V9.75c0-.41-.34-.75-.75-.75S3 9.34 3 9.75v4.5c0 .41.34.75.75.75s.75-.34.75-.75V12.5h2v1.75c0 .41.34.75.75.75s.75-.34.75-.75v-4.5z" />
    </SVGIcon>
  );
});
