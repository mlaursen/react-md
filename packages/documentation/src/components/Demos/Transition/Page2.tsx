import React, { forwardRef, HTMLAttributes } from "react";
import { Text } from "@react-md/typography";

export default forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  (props, ref) => (
    <div {...props} ref={ref}>
      <Text type="headline-4">Page 2</Text>
      <Text>
        Nullam consectetur rhoncus rhoncus. Nullam cursus porttitor lacus non
        facilisis. Donec tincidunt arcu sollicitudin neque iaculis sollicitudin.
        Vivamus in accumsan turpis. Praesent elementum elit vitae risus
        sollicitudin pretium. Aliquam vitae diam non libero efficitur consequat.
        Ut a porttitor nibh. Pellentesque habitant morbi tristique senectus et
        netus et malesuada fames ac turpis egestas.
      </Text>
    </div>
  )
);
