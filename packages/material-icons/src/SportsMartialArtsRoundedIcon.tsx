import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function SportsMartialArtsRoundedIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M19.06 2.6 11.6 8.7l-1.21-1.04 2.48-1.43a1 1 0 0 0 .21-1.57l-2.95-2.95a.996.996 0 1 0-1.41 1.41l2.03 2.03-5.4 3.11a.99.99 0 0 0-.46.6l-.96 3.49c-.07.26-.04.53.1.77l1.74 3.02c.28.48.89.64 1.37.37.48-.28.64-.89.37-1.37l-1.53-2.66.36-1.29L9.5 13l.44 8c.03.56.49 1 1.05 1s1.02-.44 1.05-1l.45-9 7.87-7.96a.972.972 0 0 0-1.3-1.44z" />
        <circle cx="5" cy="5" r="2" />
      </SVGIcon>
    );
  }
);