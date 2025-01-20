import { Box } from "@react-md/core/box/Box";
import { Card } from "@react-md/core/card/Card";
import { objectFit } from "@react-md/core/objectFit";
import { type ReactElement } from "react";

export default function ObjectFitExample(): ReactElement {
  return (
    <Box grid align="stretch" fullWidth>
      <Card align="center" justify="center">
        <img
          alt=""
          src="https://picsum.photos/600/800?image=432"
          className={objectFit()}
        />
      </Card>
      <Card align="center" justify="center">
        <img
          alt=""
          src="https://picsum.photos/400/300?image=432"
          className={objectFit()}
        />
      </Card>
      <Card align="center" justify="center">
        <img
          alt=""
          src="https://picsum.photos/800/800?image=432"
          className={objectFit()}
        />
      </Card>
    </Box>
  );
}
