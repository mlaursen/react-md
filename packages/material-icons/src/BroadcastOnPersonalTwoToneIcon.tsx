import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function BroadcastOnPersonalTwoToneIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path
          d="M4 10v9h5.59c-.38-.93-.59-1.94-.59-3 0-3.39 2.11-6.27 5.08-7.44L10 5.5 4 10z"
          opacity=".3"
        />
        <path d="M4 19v-9l6-4.5 4.08 3.06c.81-.32 1.69-.51 2.61-.54L10 3 2 9v12h8.76c-.48-.6-.88-1.27-1.17-2H4zm13-4.25c-.69 0-1.25.56-1.25 1.25 0 .4.2.75.5.97V22h1.5v-5.03c.3-.23.5-.57.5-.97 0-.69-.56-1.25-1.25-1.25z" />
        <path d="M17 12c-2.21 0-4 1.79-4 4 0 1.1.45 2.1 1.17 2.83l1.06-1.06A2.5 2.5 0 1 1 19.5 16c0 .69-.28 1.31-.73 1.76l1.06 1.06C20.55 18.1 21 17.1 21 16c0-2.21-1.79-4-4-4z" />
        <path d="M17 9.5a6.5 6.5 0 0 0-6.5 6.5c0 1.79.73 3.42 1.9 4.6l1.06-1.06C12.56 18.63 12 17.38 12 16c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.37-.56 2.62-1.46 3.52l1.07 1.06A6.5 6.5 0 0 0 17 9.5z" />
      </SVGIcon>
    );
  }
);