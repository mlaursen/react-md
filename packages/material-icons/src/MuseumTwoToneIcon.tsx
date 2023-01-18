import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/core";
import { SVGIcon } from "@react-md/core";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function MuseumTwoToneIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path
          d="M6 20h12V9H6v11zm2-9h2l2 3 2-3h2v7h-2v-4l-2 3-2-3v4H8v-7z"
          opacity=".3"
        />
        <path d="M22 11V9L12 2 2 9v2h2v9H2v2h20v-2h-2v-9h2zm-4 9H6V9h12v11z" />
        <path d="m10 14 2 3 2-3v4h2v-7h-2l-2 3-2-3H8v7h2z" />
      </SVGIcon>
    );
  }
);
