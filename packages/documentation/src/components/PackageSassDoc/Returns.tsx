import type { ReactElement } from "react";
import { Typography } from "@react-md/typography";

import Code from "components/Code";
import { M_DASH } from "constants/unicode";
import type { ItemReturn, SupportedItemDataType } from "utils/sassdoc";

import styles from "./Parameters.module.scss";

interface ReturnsProps {
  returns?: ItemReturn<SupportedItemDataType>;
}

export default function Returns({
  returns,
}: ReturnsProps): ReactElement | null {
  if (!returns) {
    return null;
  }

  const { type, description } = returns;

  return (
    <>
      <Typography type="headline-6" margin="none" className={styles.caption}>
        {`Returns ${M_DASH} `}
        <Code>{type}</Code>
      </Typography>
      <Typography className={styles.returns}>{description}</Typography>
    </>
  );
}
