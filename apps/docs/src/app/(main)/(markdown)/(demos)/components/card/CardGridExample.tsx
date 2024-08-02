import { Box } from "@react-md/core/box/Box";
import { Card } from "@react-md/core/card/Card";
import { CardTitle } from "@react-md/core/card/CardTitle";
import { ResponsiveItem } from "@react-md/core/responsive-item/ResponsiveItem";
import { ResponsiveItemOverlay } from "@react-md/core/responsive-item/ResponsiveItemOverlay";
import { type ReactElement } from "react";
import styles from "./CardGridExample.module.scss";

export default function CardGridExample(): ReactElement {
  return (
    <Box grid className={styles.container}>
      {Array.from({ length: 20 }, (_, i) => (
        <Card key={i}>
          <ResponsiveItem>
            <img src={`https://picsum.photos/600/337?image=${50 + i}`} alt="" />
            <ResponsiveItemOverlay>
              <CardTitle>{`Image ${i + 1}`}</CardTitle>
            </ResponsiveItemOverlay>
          </ResponsiveItem>
        </Card>
      ))}
    </Box>
  );
}
