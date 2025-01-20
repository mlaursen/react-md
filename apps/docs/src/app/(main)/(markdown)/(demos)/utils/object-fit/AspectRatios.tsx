import { Box } from "@react-md/core/box/Box";
import { Card } from "@react-md/core/card/Card";
import { objectFit } from "@react-md/core/objectFit";
import { type ReactElement } from "react";

import styles from "./AspectRatios.module.scss";

export default function AspectRatios(): ReactElement {
  return (
    <Box className={styles.container} grid fullWidth>
      <Card>
        <img
          src="https://picsum.photos/400/300?image=3"
          alt=""
          className={objectFit({ aspectRatio: "16-9" })}
        />
      </Card>
      <Card>
        <img
          src="https://picsum.photos/400/300?image=3"
          alt=""
          className={objectFit({ aspectRatio: "4-3" })}
        />
      </Card>
      <Card>
        <img
          src="https://picsum.photos/300/400?image=3"
          alt=""
          className={objectFit({ aspectRatio: "1-1" })}
        />
      </Card>
    </Box>
  );
}
