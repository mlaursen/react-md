import type { HTMLAttributes } from "react";
import { forwardRef } from "react";
import { Typography } from "@react-md/typography";

export default forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  function Page2(props, ref) {
    return (
      <div {...props} ref={ref}>
        <Typography type="headline-4">Page 2</Typography>
        <Typography>
          Nullam consectetur rhoncus rhoncus. Nullam cursus porttitor lacus non
          facilisis. Donec tincidunt arcu sollicitudin neque iaculis
          sollicitudin. Vivamus in accumsan turpis. Praesent elementum elit
          vitae risus sollicitudin pretium. Aliquam vitae diam non libero
          efficitur consequat. Ut a porttitor nibh. Pellentesque habitant morbi
          tristique senectus et netus et malesuada fames ac turpis egestas.
        </Typography>
      </div>
    );
  }
);
