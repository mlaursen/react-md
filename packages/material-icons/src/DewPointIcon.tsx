import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(function DewPointIcon(
  props,
  ref
) {
  return (
    <SVGIcon {...props} ref={ref}>
      <path d="M12 13V5c0-1.66-1.34-3-3-3S6 3.34 6 5v8c-1.21.91-2 2.37-2 4 0 2.76 2.24 5 5 5s5-2.24 5-5c0-1.63-.79-3.09-2-4zm-4-2V5c0-.55.45-1 1-1s1 .45 1 1v1H9v1h1v2H9v1h1v1H8zm13-4.5c0-.84-1.5-2.5-1.5-2.5S18 5.66 18 6.5c0 .83.67 1.5 1.5 1.5S21 7.33 21 6.5zm-4 3c0-.84-1.5-2.5-1.5-2.5S14 8.66 14 9.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5zm4 3c0-.84-1.5-2.5-1.5-2.5S18 11.66 18 12.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5z" />
    </SVGIcon>
  );
});
