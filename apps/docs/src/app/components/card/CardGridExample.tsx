import {
  Box,
  Card,
  CardTitle,
  ResponsiveItemContainer,
  ResponsiveItemOverlay,
} from "@react-md/core";
import { type ReactElement } from "react";
import styles from "./CardGridExample.module.scss";

export default function CardGridExample(): ReactElement {
  return (
    <Box grid className={styles.container}>
      {Array.from({ length: 20 }, (_, i) => (
        <Card key={i}>
          <ResponsiveItemContainer>
            <img src={`https://picsum.photos/600/337?image=${50 + i}`} alt="" />
            <ResponsiveItemOverlay>
              <CardTitle>{`Image ${i + 1}`}</CardTitle>
            </ResponsiveItemOverlay>
          </ResponsiveItemContainer>
        </Card>
      ))}
    </Box>
  );
}
