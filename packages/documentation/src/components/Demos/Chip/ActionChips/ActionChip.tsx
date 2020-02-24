import React, { FC } from "react";
import { cnb } from "cnbuilder";
import { Chip, ChipProps } from "@react-md/chip";

import styles from "./styles";

interface ActionChipProps extends ChipProps {
  yellow?: boolean;
}

const ActionChip: FC<ActionChipProps> = ({
  children,
  className,
  theme = "outline",
  yellow = false,
  ...props
}) => (
  <Chip
    {...props}
    theme={theme}
    className={cnb(styles("chip", { yellow }), className)}
  >
    {children}
  </Chip>
);

export default ActionChip;
