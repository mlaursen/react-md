import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function BakeryDiningIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path
          fillRule="evenodd"
          d="M19.28 16.34 17.46 15s.32-.59.96-1.78a.944.944 0 0 1 1.6 0l.81 1.26c.19.3.21.68.06 1l-.22.47a.94.94 0 0 1-1.39.39zm-14.56 0a.946.946 0 0 1-1.39-.38l-.23-.47c-.15-.32-.13-.7.06-1l.81-1.26a.944.944 0 0 1 1.6 0c.65 1.18.97 1.77.97 1.77l-1.82 1.34zm10.64-6.97c.09-.68.73-1.06 1.27-.75l1.59.9c.46.26.63.91.36 1.41L16.5 15h-1.8l.66-5.63zm-6.73 0L9.3 15H7.5l-2.09-4.08c-.27-.5-.1-1.15.36-1.41l1.59-.9c.53-.3 1.18.08 1.27.76zM13.8 15h-3.6l-.74-6.88c-.07-.59.35-1.12.88-1.12h3.3c.53 0 .94.53.88 1.12L13.8 15z"
        />
      </SVGIcon>
    );
  }
);
