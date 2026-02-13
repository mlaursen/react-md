import { Box } from "@react-md/core/box/Box";
import { type BoxOptions } from "@react-md/core/box/styles";
import { Card } from "@react-md/core/card/Card";
import { ResponsiveItem } from "@react-md/core/responsive-item/ResponsiveItem";
import { type ReactElement } from "react";

export default function SimpleExample(): ReactElement {
  return (
    <Box align="stretch" grid fullWidth gridColumns={columns}>
      <Card align="center" justify="center">
        <ResponsiveItem>
          <img src="https://picsum.photos/200/300?image=30" alt="" />
        </ResponsiveItem>
      </Card>
      <Card align="center" justify="center">
        <ResponsiveItem>
          <img src="https://picsum.photos/300/200?image=3" alt="" />
        </ResponsiveItem>
      </Card>
      <Card align="center" justify="center">
        <ResponsiveItem>
          <img src="https://picsum.photos/300?image=1008" alt="" />
        </ResponsiveItem>
      </Card>
      <Card align="center" justify="center">
        <ResponsiveItem>
          <img src="https://picsum.photos/100/110?image=233" alt="" />
        </ResponsiveItem>
      </Card>
    </Box>
  );
}

// eslint-disable-next-line no-unassigned-vars
let columns: BoxOptions["gridColumns"];
// columns = "fit";
// columns = "fill";
// columns = 2;
