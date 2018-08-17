import * as React from "react";
import { Text } from "@react-md/typography";
import * as Loadable from "react-loadable";

const Loading: React.SFC<Loadable.LoadingComponentProps> = ({ pastDelay }) => {
  if (pastDelay) {
    return <Text type="headline-1">Loading...</Text>;
  }

  return null;
};

export default Loading;
