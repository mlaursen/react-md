import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function EnergySavingsLeafIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M12 3c-4.8 0-9 3.86-9 9 0 2.12.74 4.07 1.97 5.61L3 19.59 4.41 21l1.97-1.97A9.012 9.012 0 0 0 12 21c2.3 0 4.61-.88 6.36-2.64A8.95 8.95 0 0 0 21 12V3h-9zm3.83 9.26-5.16 4.63c-.16.15-.41.14-.56-.01a.397.397 0 0 1-.04-.52l2.44-3.33-4.05-.4a.514.514 0 0 1-.3-.89l5.16-4.63c.16-.15.41-.14.56.01.14.14.16.36.04.52l-2.44 3.33 4.05.4c.45.04.63.59.3.89z" />
      </SVGIcon>
    );
  }
);
