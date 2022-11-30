import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function EmojiFlagsRoundedIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M19 9h-5l-.72-1.45c-.17-.34-.52-.55-.9-.55H7V5.72c.6-.34 1-.98 1-1.72 0-1.1-.9-2-2-2s-2 .9-2 2c0 .74.4 1.38 1 1.72V20c0 .55.45 1 1 1s1-.45 1-1v-3h5l.72 1.45a1 1 0 0 0 .89.55H19c.55 0 1-.45 1-1v-8c0-.55-.45-1-1-1zm-1 8h-4l-1-2H7V9h5l1 2h5v6z" />
      </SVGIcon>
    );
  }
);
