import React, { FunctionComponent } from "react";
import {
  MobileOnly,
  PhoneOnly,
  TabletOnly,
  DesktopOnly,
} from "@react-md/sizing";
import { TextContainer, Text } from "@react-md/typography";

const MediaQueryComponents: FunctionComponent = () => (
  <TextContainer>
    <MobileOnly>
      <Text>This will only appear on phone and tablet screen sizes.</Text>
    </MobileOnly>
    <PhoneOnly>
      <Text>This will only appear on phone screen sizes.</Text>
    </PhoneOnly>
    <TabletOnly>
      <Text>This will only appear on tablet screen sizes.</Text>
    </TabletOnly>
    <DesktopOnly>
      <Text>This will only appear on desktop screen sizes.</Text>
    </DesktopOnly>
  </TextContainer>
);

export default MediaQueryComponents;
