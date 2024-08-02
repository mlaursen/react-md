import { Box } from "@react-md/core/box/Box";
import { Card } from "@react-md/core/card/Card";
import { ResponsiveItem } from "@react-md/core/responsive-item/ResponsiveItem";
import { ResponsiveItemOverlay } from "@react-md/core/responsive-item/ResponsiveItemOverlay";
import { Typography } from "@react-md/core/typography/Typography";
import { type ReactElement } from "react";
import styles from "./CustomizingStyles.module.scss";

export default function CustomizingStyles(): ReactElement {
  return (
    <Box grid fullWidth className={styles.container}>
      <Card>
        <ResponsiveItem>
          <img alt="" src="https://picsum.photos/800/800?image=433" />
          <ResponsiveItemOverlay position="absolute-center">
            <Typography type="headline-5" margin="none">
              Overlay Text
            </Typography>
          </ResponsiveItemOverlay>
        </ResponsiveItem>
      </Card>
    </Box>
  );
}
