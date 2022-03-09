/* eslint-disable jsx-a11y/anchor-is-valid */
import { ReactElement } from "react";
import { Link } from "@react-md/link";
import { Tooltip, useTooltip } from "@react-md/tooltip";

import Container from "./Container";

import styles from "./LargeTooltips.module.scss";

const TOOLTIP_1 =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam at magna ac odio sollicitudin mollis nec id libero. Morbi eu tempor ante. Nulla elementum sit amet urna et tincidunt. In est odio, euismod vel mollis vel, rhoncus nec leo. Nam ornare id nunc sed laoreet. Donec placerat erat at felis scelerisque bibendum. Suspendisse euismod velit dolor, vestibulum finibus eros egestas sed. Sed placerat tortor nisi, in efficitur dolor vulputate non.";

export default function LargeTooltips(): ReactElement {
  const { elementProps, tooltipProps } = useTooltip({
    baseId: "large-tooltip-1",
  });
  return (
    <Container>
      <Link {...elementProps} href="#" className={styles.link}>
        {TOOLTIP_1}
      </Link>
      <Tooltip {...tooltipProps}>{TOOLTIP_1}</Tooltip>
    </Container>
  );
}
