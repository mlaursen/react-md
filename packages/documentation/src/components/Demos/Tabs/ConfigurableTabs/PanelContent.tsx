import { Fragment, ReactElement } from "react";
import { Button } from "@react-md/button";
import { CrossFade } from "@react-md/transition";
import { Typography } from "@react-md/typography";

import styles from "./PanelContent.module.scss";

export interface PanelContentProps {
  i: number;
  customTransition: boolean;
}

export default function PanelContent({
  i,
  customTransition,
}: PanelContentProps): ReactElement {
  const Container = customTransition ? CrossFade : Fragment;

  return (
    <Container>
      <div className={styles.container}>
        <Typography type="headline-4" className={styles.block}>
          {`Panel ${i + 1}`}
        </Typography>
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
}
