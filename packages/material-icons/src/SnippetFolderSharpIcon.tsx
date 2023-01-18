import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/core";
import { SVGIcon } from "@react-md/core";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function SnippetFolderSharpIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="m12 6-2-2H2v16h20V6H12zm7 11h-6V9h3.5l2.5 2.5V17zm-3.12-6.5 1.62 1.62v3.38h-3v-5h1.38z" />
      </SVGIcon>
    );
  }
);
