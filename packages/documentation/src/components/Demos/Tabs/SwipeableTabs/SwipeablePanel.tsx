import React, { FC, CSSProperties } from "react";
import { TabPanel, TabPanelProps } from "@react-md/tabs";
import { Text } from "@react-md/typography";

interface SwipeablePanelProps extends TabPanelProps {
  index: number;
  activeIndex: number;
  distance: string;
  swiping: boolean;
}

function isStyleable(
  index: number,
  activeIndex: number,
  distance: string
): boolean {
  if (!distance) {
    return false;
  }

  const incrementor = distance.startsWith("-") ? -1 : 1;

  return index === activeIndex || index + incrementor === activeIndex;
}

const SwipeablePanel: FC<SwipeablePanelProps> = ({
  index,
  activeIndex,
  distance,
  swiping,
  ...props
}) => {
  let style: CSSProperties | undefined;
  if (swiping && isStyleable(index, activeIndex, distance)) {
    const transform = `translateX(${distance})`;
    style = { transform, WebkitTransform: transform };
  }

  return (
    <TabPanel {...props} style={style} hidden={index !== activeIndex && !style}>
      <Text type="headline-4">{`Content ${index + 1}`}</Text>
    </TabPanel>
  );
};

export default SwipeablePanel;
