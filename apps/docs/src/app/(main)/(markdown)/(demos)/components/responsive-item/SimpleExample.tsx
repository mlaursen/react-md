import { Box } from "@react-md/core/box/Box";
import { type BoxOptions } from "@react-md/core/box/styles";
import { Card } from "@react-md/core/card/Card";
import { ResponsiveItemContainer } from "@react-md/core/responsive-item/ResponsiveItemContainer";
import { type ReactElement } from "react";

export default function SimpleExample(): ReactElement {
  return (
    <Box align="stretch" grid fullWidth gridColumns={columns}>
      <Card align="center" justify="center">
        <ResponsiveItemContainer>
          <img src="https://picsum.photos/200/300?image=30" alt="" />
        </ResponsiveItemContainer>
      </Card>
      <Card align="center" justify="center">
        <ResponsiveItemContainer>
          <img src="https://picsum.photos/300/200?image=3" alt="" />
        </ResponsiveItemContainer>
      </Card>
      <Card align="center" justify="center">
        <ResponsiveItemContainer>
          <img src="https://picsum.photos/300?image=1008" alt="" />
        </ResponsiveItemContainer>
      </Card>
      <Card align="center" justify="center">
        <ResponsiveItemContainer>
          <img src="https://picsum.photos/100/110?image=233" alt="" />
        </ResponsiveItemContainer>
      </Card>
    </Box>
  );
}

// eslint-disable-next-line prefer-const
let columns: BoxOptions["gridColumns"] = undefined;
// columns = "fit";
// columns = "fill";
// columns = 2;
