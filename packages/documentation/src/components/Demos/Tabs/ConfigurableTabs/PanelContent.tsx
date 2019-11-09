import React, { FC } from "react";
import { Text } from "@react-md/typography";
import { CrossFade } from "@react-md/transition";

export interface PanelContentProps {
  i: number;
  customTransition: boolean;
}

const PanelContent: FC<PanelContentProps> = ({ i, customTransition }) => {
  const title = <Text type="headline-4">{`Panel ${i + 1}`}</Text>;
  if (!customTransition) {
    return title;
  }

  return <CrossFade>{title}</CrossFade>;
};

export default PanelContent;
