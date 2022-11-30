import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(function TrolleyIcon(
  props,
  ref
) {
  return (
    <SVGIcon {...props} ref={ref}>
      <path d="M21 14v2H4V4H2V2h4v12h15zM5.99 17C4.89 17 4 17.9 4 19s.89 2 1.99 2C7.1 21 8 20.1 8 19s-.9-2-2.01-2zm13 0c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2S21 20.1 21 19s-.9-2-2.01-2zM13 13H7V7h6v6zm7 0h-6V7h6v6z" />
    </SVGIcon>
  );
});
