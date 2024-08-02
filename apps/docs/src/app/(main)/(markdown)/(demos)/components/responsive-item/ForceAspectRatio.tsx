import { Box } from "@react-md/core/box/Box";
import { Card } from "@react-md/core/card/Card";
import { ResponsiveItem } from "@react-md/core/responsive-item/ResponsiveItem";
import { type ReactElement } from "react";

export default function ForceAspectRatio(): ReactElement {
  return (
    <Box grid fullWidth>
      <Card>
        <ResponsiveItem aspectRatio="16-9">
          <img src="https://picsum.photos/400/300?image=3" alt="" />
        </ResponsiveItem>
      </Card>
      <Card>
        <ResponsiveItem aspectRatio="4-3">
          <img src="https://picsum.photos/400/300?image=3" alt="" />
        </ResponsiveItem>
      </Card>
      <Card>
        <ResponsiveItem aspectRatio="1-1">
          <img src="https://picsum.photos/300/400?image=3" alt="" />
        </ResponsiveItem>
      </Card>
    </Box>
  );
}
