import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function NightShelterTwoToneIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path fill="none" d="M0 0h24v24H0z" />
        <path
          d="m12 5.5 6 4.5v9H6v-9l6-4.5m3 6.5h-3.5v3.5H8V11H7v7h1v-1.5h8V18h1v-4c0-1.1-.9-2-2-2zm-5.25.5a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 0 0 0-2.5z"
          opacity=".3"
        />
        <path d="m12 5.5 6 4.5v9H6v-9l6-4.5M12 3 4 9v12h16V9l-8-6zm3 9h-3.5v3.5H8V11H7v7h1v-1.5h8V18h1v-4c0-1.1-.9-2-2-2zm-5.25.5a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 0 0 0-2.5z" />
      </SVGIcon>
    );
  }
);
