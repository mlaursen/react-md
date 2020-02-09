import React, { FC } from "react";
import cn from "classnames";
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
    className={cn(styles("chip", { yellow }), className)}
  >
    {children}
  </Chip>
);

export default ActionChip;
