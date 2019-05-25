import React, { FC, useEffect } from "react";
import { LinearProgress } from "@react-md/progress";
import { Text } from "@react-md/typography";
import { bem } from "@react-md/theme";

interface WithSuspenseFallbackProps {
  complete: () => void;
}

const block = bem("progress-suspense");

const WithSuspenseFallback: FC<WithSuspenseFallbackProps> = ({ complete }) => {
  // trigger the complete action when this component unmounts
  useEffect(() => () => complete(), []);

  return (
    <div className={block("loading")}>
      <Text type="headline-6" className={block("loading-title")}>
        Getting your files
      </Text>
      <LinearProgress id="with-suspense-loading" />
    </div>
  );
};

export default WithSuspenseFallback;
