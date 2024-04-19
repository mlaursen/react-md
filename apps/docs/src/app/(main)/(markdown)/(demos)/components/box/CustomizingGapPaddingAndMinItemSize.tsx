import { Box } from "@react-md/core/box/Box";
import { Card } from "@react-md/core/card/Card";
import { CardContent } from "@react-md/core/card/CardContent";
import { type ReactElement } from "react";
import styles from "./CustomizingGapPaddingAndMinItemSize.module.scss";

export default function CustomizingGapPaddingAndMinItemSize(): ReactElement {
  return (
    <div className={styles.container}>
      <Box grid>
        <Cards />
      </Box>
      <Box grid className={styles.override}>
        <Cards />
      </Box>
      <Box grid>
        <Cards />
      </Box>
    </div>
  );
}

function Cards(): ReactElement {
  return (
    <>
      {Array.from({ length: 5 }, (_, i) => (
        <Card key={i}>
          <CardContent>{`Item ${i + 1}`}</CardContent>
        </Card>
      ))}
    </>
  );
}
