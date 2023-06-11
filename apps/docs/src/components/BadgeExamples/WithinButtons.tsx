import { Badge, Box, Button, Tooltip, useTooltip } from "@react-md/core";
import type { CSSProperties, ReactElement } from "react";
import { useId } from "react";
import NotificationsOutlinedIcon from "@react-md/material-icons/NotificationsOutlinedIcon";

const style: CSSProperties = {
  "--rmd-badge-offset": "-0.25rem",
};

export function WithinButtons(): ReactElement {
  const badgeId = useId();
  const { elementProps, tooltipProps } = useTooltip({
    describedBy: badgeId,
  });
  const total = 100;

  return (
    <Box>
      <Button
        {...elementProps}
        aria-label="Notifications"
        style={style}
        buttonType="icon"
      >
        <Badge id={badgeId}>{total > 99 ? `99+` : total}</Badge>
        <NotificationsOutlinedIcon />
      </Button>
      <Tooltip {...tooltipProps}>{total} Notifications</Tooltip>
    </Box>
  );
}
