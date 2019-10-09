import React, { FC, Fragment } from "react";
import { BadgeContainer, Badge } from "@react-md/badge";
import { Button } from "@react-md/button";
import { NotificationsSVGIcon } from "@react-md/material-icons";
import { Text } from "@react-md/typography";
import { COPYRIGHT } from "constants/unicode";

import "./CustomizingBadges.scss";

const CustomizingBadges: FC = () => (
  <Fragment>
    <BadgeContainer className="copyright-badge-container">
      {/* since the badge is presentational, don't add the `aria-describedby` value */}
      <Text>Some amazing product</Text>
      <Badge id="copyright-badge" theme="clear">
        {COPYRIGHT}
      </Badge>
    </BadgeContainer>
    {/* this is _basically_ the `BadgedButton` component except with an extra `<span>` */}
    <BadgeContainer className="custom-badged-button">
      <Button
        id="custom-badged-button"
        aria-describedby="custom-badged-button-badge"
        buttonType="icon"
      >
        <NotificationsSVGIcon />
      </Button>
      <Badge id="custom-badged-button-badge">8</Badge>
    </BadgeContainer>
  </Fragment>
);

export default CustomizingBadges;
