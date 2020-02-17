import React, { FC, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardSubtitle,
  CardTitle,
} from "@react-md/card";
import { Divider } from "@react-md/divider";
import { LazyImage, MediaContainer } from "@react-md/media";

import ActionChipAlarm from "./ActionChipAlarm";
import ActionChipBlinds from "./ActionChipBlinds";
import ActionChipLights from "./ActionChipLights";
import Blinds from "./Blinds";
import styles from "./styles";

const width = 240;
const height = width * 0.75;

const ActionChips: FC = () => {
  const [blinds, setBlinds] = useState(false);
  return (
    <Card id="action-chips-card" className={styles()}>
      <MediaContainer fullWidth>
        <Blinds visible={blinds} />
        <LazyImage src={`https://picsum.photos/id/218/${width}/${height}`} />
      </MediaContainer>
      <CardHeader>
        <CardTitle noWrap>Welcome Home Person Name!</CardTitle>
        <CardSubtitle noWrap>Monday 12:30 PM, Mostly Sunny</CardSubtitle>
      </CardHeader>
      <Divider />
      <CardContent className={styles("chips")} disableExtraPadding>
        <ActionChipLights />
        <ActionChipAlarm />
        <ActionChipBlinds
          visible={blinds}
          onClick={() => setBlinds(prevBlinds => !prevBlinds)}
        />
      </CardContent>
    </Card>
  );
};

export default ActionChips;
