import React from 'react';
import { Badge, Button, SVGIcon } from 'react-md';
import { COPYRIGHT } from 'constants/unicode';

import notifications from 'icons/notifications.svg';
import './_simple.scss';

const Simple = () => (
  <div className="badges__badge-group">
    <Badge badgeContent={12} primary badgeId="notifications-1">
      <Button icon>notifications</Button>
    </Badge>
    <Badge badgeContent={100} secondary badgeId="notifications-2">
      <Button icon>notifications</Button>
    </Badge>
    <Badge badgeContent={0} primary invisibleOnZero badgeId="invisible">
      <Button icon>notifications</Button>
    </Badge>
    {/* Add the button styles for positioning */}
    <Badge
      badgeContent="Hi!"
      circular
      default
      className="md-btn--icon"
      badgeId="notifications-3"
    >
      <SVGIcon use={notifications.url} />
    </Badge>
    <Badge
      badgeContent={COPYRIGHT}
      className="badges__copyright"
      badgeClassName="badges__copyright__badge"
      badgeId="wow"
    >
      Some Amazing Product
    </Badge>
  </div>
);

export default Simple;
