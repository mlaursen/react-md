import { ReactElement, useEffect } from "react";
import { LinearProgress } from "@react-md/progress";
import { Text } from "@react-md/typography";

import styles from "./WithSuspenseFallback.module.scss";

interface WithSuspenseFallbackProps {
  complete: () => void;
}

export default function WithSuspenseFallback({
  complete,
}: WithSuspenseFallbackProps): ReactElement {
  // trigger the complete action when this component unmounts
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => () => complete(), []);

  return (
    <div className={styles.container}>
      <Text type="headline-6" className={styles.title}>
        Getting your files
      </Text>
      <LinearProgress id="with-suspense-loading" />
    </div>
  );
}
