import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function CategoryTwoToneIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <circle cx="17.5" cy="17.5" opacity=".3" r="2.5" />
        <path d="M5 15.5h4v4H5zm7-9.66L10.07 9h3.86z" opacity=".3" />
        <path d="m12 2-5.5 9h11L12 2zm0 3.84L13.93 9h-3.87L12 5.84zM17.5 13c-2.49 0-4.5 2.01-4.5 4.5s2.01 4.5 4.5 4.5 4.5-2.01 4.5-4.5-2.01-4.5-4.5-4.5zm0 7a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5zM11 13.5H3v8h8v-8zm-2 6H5v-4h4v4z" />
      </SVGIcon>
    );
  }
);
