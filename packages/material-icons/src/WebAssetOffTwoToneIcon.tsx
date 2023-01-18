import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/core";
import { SVGIcon } from "@react-md/core";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function WebAssetOffTwoToneIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path
          d="M20 17.17V8h-9.17L20 17.17zM5.17 8H4v10h11.17l-10-10z"
          opacity=".3"
        />
        <path d="M6.83 4H20a2 2 0 0 1 2 2v12c0 .34-.09.66-.23.94L20 17.17V8h-9.17l-4-4zm13.66 19.31L17.17 20H4a2 2 0 0 1-2-2V6c0-.34.08-.66.23-.94L.69 3.51 2.1 2.1l19.8 19.8-1.41 1.41zM15.17 18l-10-10H4v10h11.17z" />
      </SVGIcon>
    );
  }
);
