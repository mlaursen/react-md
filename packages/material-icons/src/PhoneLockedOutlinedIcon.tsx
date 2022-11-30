import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function PhoneLockedOutlinedIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M20 5V4c0-1.1-.9-2-2-2s-2 .9-2 2v1h-1v5h6V5h-1zm-1 0h-2V4c0-.55.45-1 1-1s1 .45 1 1v1z" />
        <path d="m20.2 14.87-3.67-.73c-.5-.1-.83.2-.9.27l-2.52 2.5c-2.5-1.43-4.57-3.5-6-6l2.5-2.52c.23-.24.33-.57.27-.9L9.13 3.8c-.09-.46-.5-.8-.98-.8H4c-.56 0-1.03.47-1 1.03.17 2.89 1.05 5.6 2.43 7.97 1.58 2.73 3.85 4.99 6.57 6.57 2.37 1.37 5.08 2.26 7.97 2.43.55.03 1.03-.43 1.03-1v-4.15c0-.48-.34-.89-.8-.98zM5.1 5h2.23l.47 2.35L6.17 9c-.54-1.3-.9-2.63-1.07-4zM19 18.9c-1.37-.18-2.7-.53-4-1.07l1.65-1.63 2.35.47v2.23z" />
      </SVGIcon>
    );
  }
);
