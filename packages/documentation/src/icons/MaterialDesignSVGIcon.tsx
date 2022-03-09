import type { ReactElement } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default function MaterialDesignSVGIcon(
  props: SVGIconProps
): ReactElement {
  return (
    <SVGIcon {...props}>
      <circle cx="12" cy="12" fill="#757575" r="12" />
      <path d="m3.6 3.6h16.8v16.8h-16.8z" fill="#bdbdbd" />
      <path d="m20.4 3.6-8.4 16.8-8.4-16.8z" fill="#fff" />
      <path d="m0 0h24v24h-24z" fill="none" />
    </SVGIcon>
  );
}
