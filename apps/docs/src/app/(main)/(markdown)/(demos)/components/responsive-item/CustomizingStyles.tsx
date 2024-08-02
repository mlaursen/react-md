import { Box } from "@react-md/core/box/Box";
import { Card } from "@react-md/core/card/Card";
import { ResponsiveItemContainer } from "@react-md/core/responsive-item/ResponsiveItemContainer";
import { ResponsiveItemOverlay } from "@react-md/core/responsive-item/ResponsiveItemOverlay";
import { Typography } from "@react-md/core/typography/Typography";
import { type ReactElement } from "react";
import styles from "./CustomizingStyles.module.scss";

export default function CustomizingStyles(): ReactElement {
  return (
    <Box grid fullWidth className={styles.container}>
      <Card>
        <ResponsiveItemContainer>
          <img alt="" src="https://picsum.photos/800/800?image=433" />
          <ResponsiveItemOverlay position="absolute-center">
            <Typography type="headline-5" margin="none">
              Overlay Text
            </Typography>
          </ResponsiveItemOverlay>
        </ResponsiveItemContainer>
      </Card>
    </Box>
  );
}
