import { ReactElement } from "react";
import cn from "classnames";
import { Chip, ChipProps } from "@react-md/chip";

import styles from "./ActionChip.module.scss";

interface ActionChipProps extends ChipProps {
  yellow?: boolean;
}

export default function ActionChip({
  children,
  className,
  theme = "outline",
  yellow = false,
  ...props
}: ActionChipProps): ReactElement {
  return (
    <Chip
      {...props}
      theme={theme}
      className={cn(
        styles.chip,
        {
          [styles.yellow]: yellow,
        },
        className
      )}
    >
      {children}
    </Chip>
  );
}
