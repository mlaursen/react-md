import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/core";
import { SVGIcon } from "@react-md/core";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function BlurOffRoundedIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <circle cx="14" cy="6" r="1" />
        <path d="m13.8 11.48.2.02c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5-1.5.67-1.5 1.5l.02.2c.09.67.61 1.19 1.28 1.28zM14 3.5c.28 0 .5-.22.5-.5s-.22-.5-.5-.5-.5.22-.5.5.22.5.5.5zm-4 0c.28 0 .5-.22.5-.5s-.22-.5-.5-.5-.5.22-.5.5.22.5.5.5z" />
        <circle cx="18" cy="10" r="1" />
        <circle cx="18" cy="6" r="1" />
        <path d="M21 10.5c.28 0 .5-.22.5-.5s-.22-.5-.5-.5-.5.22-.5.5.22.5.5.5z" />
        <circle cx="10" cy="6" r="1" />
        <circle cx="18" cy="14" r="1" />
        <circle cx="6" cy="18" r="1" />
        <path d="M14 20.5c-.28 0-.5.22-.5.5s.22.5.5.5.5-.22.5-.5-.22-.5-.5-.5zm7-7c-.28 0-.5.22-.5.5s.22.5.5.5.5-.22.5-.5-.22-.5-.5-.5zm-18 0c-.28 0-.5.22-.5.5s.22.5.5.5.5-.22.5-.5-.22-.5-.5-.5z" />
        <circle cx="10" cy="18" r="1" />
        <path d="M3 9.5c-.28 0-.5.22-.5.5s.22.5.5.5.5-.22.5-.5-.22-.5-.5-.5zm7 11c-.28 0-.5.22-.5.5s.22.5.5.5.5-.22.5-.5-.22-.5-.5-.5z" />
        <circle cx="6" cy="14" r="1" />
        <path d="M3.21 4.56a.996.996 0 0 0 0 1.41l3.07 3.07L6 9c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1c0-.1-.03-.19-.06-.28l2.81 2.81c-.71.11-1.25.73-1.25 1.47 0 .83.67 1.5 1.5 1.5.74 0 1.36-.54 1.47-1.25l2.81 2.81A.875.875 0 0 0 14 17c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1c0-.1-.03-.19-.06-.28l3.08 3.07c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.42L4.62 4.56a.996.996 0 0 0-1.41 0z" />
      </SVGIcon>
    );
  }
);
