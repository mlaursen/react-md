import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(function Man3SharpIcon(
  props,
  ref
) {
  return (
    <SVGIcon {...props} ref={ref}>
      <path d="M16 7H8v8h2v7h4v-7h2zm-4-5.249L14.248 4 12 6.248 9.75 4z" />
    </SVGIcon>
  );
});
