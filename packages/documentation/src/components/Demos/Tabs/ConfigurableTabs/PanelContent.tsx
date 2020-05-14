import React, { FC, Fragment } from "react";
import { Button } from "@react-md/button";
import { CrossFade } from "@react-md/transition";
import { Text } from "@react-md/typography";

import styles from "./PanelContent.module.scss";

export interface PanelContentProps {
  i: number;
  customTransition: boolean;
}

const PanelContent: FC<PanelContentProps> = ({ i, customTransition }) => {
  const Container = customTransition ? CrossFade : Fragment;

  return (
    <Container>
      <div className={styles.container}>
        <Text type="headline-4" className={styles.block}>
          {`Panel ${i + 1}`}
        </Text>
        <Button
          id={`panel-content-button-${i + 1}-1`}
          themeType="contained"
          theme="primary"
        >
          {`Button ${i + 1}-1`}
        </Button>
        <Button
          id={`panel-content-button-${i + 1}-2`}
          themeType="contained"
          theme="secondary"
        >
          {`Button ${i + 1}-2`}
        </Button>
      </div>
    </Container>
  );
};

export default PanelContent;
