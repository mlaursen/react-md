import React, { ReactElement } from "react";
import { Text } from "@react-md/typography";

import Code from "components/Code";
import { M_DASH } from "constants/unicode";
import { ItemReturn, SupportedItemDataType } from "utils/sassdoc";

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
      <Text type="headline-6" margin="none" className={styles.caption}>
        {`Returns ${M_DASH} `}
        <Code>{type}</Code>
      </Text>
      <Text className={styles.returns}>{description}</Text>
    </>
  );
}
