import React, { FC, Fragment } from "react";
import {
  MobileOnly,
  PhoneOnly,
  TabletOnly,
  DesktopOnly,
} from "@react-md/sizing";
import { TextContainer, Text } from "@react-md/typography";
import { Divider } from "@react-md/divider";

import "./media-query-components.scss";

const MediaQueryComponents: FC = () => (
  <Fragment>
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
    <Divider />
    <div className="mq-example">
      <Text margin="none">
        This section will gain different styles as the viewport increases. I
        highly recommend opening the dev tools and seeing how the different
        styles get applied and when some are completely removed to get a better
        undertanding of the media queries.
      </Text>
    </div>
  </Fragment>
);

export default MediaQueryComponents;
