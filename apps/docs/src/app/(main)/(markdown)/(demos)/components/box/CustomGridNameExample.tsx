import { Box } from "@react-md/core/box/Box";
import { Card } from "@react-md/core/card/Card";
import { CardContent } from "@react-md/core/card/CardContent";
import { Typography } from "@react-md/core/typography/Typography";
import { type ReactElement } from "react";
import styles from "./CustomGridNameExample.module.scss";

export default function CustomGridNameExample(): ReactElement {
  return (
    <div className={styles.container}>
      <Typography>Variant 1</Typography>
      <BoxExample gridName="variant-1" />
      <Typography>Variant 2</Typography>
      <BoxExample gridName="variant-2" />
      <Typography>Variant 3</Typography>
      <BoxExample gridName="variant-3" />
    </div>
  );
}

function BoxExample({ gridName }: { gridName: string }): ReactElement {
  return (
    <Box grid gridName={gridName}>
      {Array.from({ length: 8 }, (_, i) => (
        <Card key={i}>
          <CardContent>{`Item ${i + 1}`}</CardContent>
        </Card>
      ))}
    </Box>
  );
}
