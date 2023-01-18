import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/core";
import { SVGIcon } from "@react-md/core";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function TypeSpecimenSharpIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M4 6H2v16h16v-2H4z" />
        <path d="M22 2H6v16h16V2zm-5.37 12.5-.8-2.3H12.2l-.82 2.3H9.81l3.38-9h1.61l3.38 9h-1.55z" />
        <path d="m13.96 7.17-1.31 3.72h2.69l-1.3-3.72z" />
      </SVGIcon>
    );
  }
);
