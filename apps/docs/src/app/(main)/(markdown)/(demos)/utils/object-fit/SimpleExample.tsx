import { Box } from "@react-md/core/box/Box";
import { Card } from "@react-md/core/card/Card";
import { objectFit } from "@react-md/core/objectFit";
import { type ReactElement } from "react";

export default function SimpleExample(): ReactElement {
  return (
    <Box align="stretch" grid fullWidth>
      <Card align="center" justify="center">
        <img
          src="https://picsum.photos/200/300?image=30"
          alt=""
          className={objectFit()}
        />
      </Card>
      <Card align="center" justify="center">
        <img
          src="https://picsum.photos/300/200?image=3"
          alt=""
          className={objectFit()}
        />
      </Card>
      <Card align="center" justify="center">
        <img
          src="https://picsum.photos/300?image=1008"
          alt=""
          className={objectFit()}
        />
      </Card>
      <Card align="center" justify="center">
        <img
          src="https://picsum.photos/100/110?image=233"
          alt=""
          className={objectFit()}
        />
      </Card>
    </Box>
  );
}
