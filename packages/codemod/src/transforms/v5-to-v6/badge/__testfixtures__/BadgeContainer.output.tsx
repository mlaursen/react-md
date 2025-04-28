import type { ReactElement } from "react";
import { Badge, Button, NotificationsSVGIcon, Typography } from "react-md";

import { COPYRIGHT } from "constants/unicode";

import styles from "./CustomizingBadges.module.scss";

export default function CustomizingBadges(): ReactElement {
  return (
    <>
      <span
        className={styles.container}
        style={{
          display: "inline-flex",
          position: "relative"
        }}>
        {/* since the badge is presentational, don't add the `aria-describedby` value */}
        <Typography>Some amazing product</Typography>
        <Badge id="copyright-badge" theme="clear">
          {COPYRIGHT}
        </Badge>
      </span>
      {/* this is _basically_ the `BadgedButton` component except with an extra `<span>` */}
      <span
        className={styles.custom}
        style={{
          display: "inline-flex",
          position: "relative"
        }}>
        <Button
          id="custom-badged-button"
          aria-describedby="custom-badged-button-badge"
          buttonType="icon"
        >
          <NotificationsSVGIcon />
        </Button>
        <Badge id="custom-badged-button-badge">8</Badge>
      </span>
    </>
  );
}
